import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/ui/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { 
  ClipboardList, 
  CheckCircle2, 
  Clock, 
  Pill,
  Search,
  User,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Prescription {
  id: number;
  medication: string;
  dosage: string;
  instructions: string;
  patientName: string;
  doctorName: string;
  status: "PENDING" | "ACCEPTED" | "DISPENSED";
}

export default function PharmacyDashboard() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/pharmacy/prescriptions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setPrescriptions(data);
        }
      } catch (error) {
        console.error("Failed to fetch prescriptions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  const dispensePrescription = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8080/api/pharmacy/dispense/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ available: true }),
      });

      if (!res.ok) throw new Error("Failed to dispense");

      setPrescriptions((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: "DISPENSED" } : p))
      );

      toast.success("Prescription dispensed successfully!");
    } catch (error) {
      toast.error("Failed to dispense prescription");
    }
  };

  const filteredPrescriptions = prescriptions.filter(
    (p) =>
      p.medication.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.patientName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingCount = prescriptions.filter((p) => p.status === "ACCEPTED").length;
  const dispensedCount = prescriptions.filter((p) => p.status === "DISPENSED").length;

  return (
    <DashboardLayout title="Pharmacy Dashboard">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Prescriptions"
          value={prescriptions.length}
          icon={ClipboardList}
        />
        <StatCard
          title="Ready to Dispense"
          value={pendingCount}
          icon={Clock}
        />
        <StatCard
          title="Dispensed Today"
          value={dispensedCount}
          icon={CheckCircle2}
        />
      </div>

      {/* Search */}
      <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50 mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by medication or patient..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
      </div>

      {/* Prescriptions List */}
      <div className="bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="font-display text-xl font-semibold text-foreground">
            Prescriptions Queue
          </h2>
        </div>

        {isLoading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl animate-pulse">
                <div className="w-12 h-12 bg-muted rounded-xl" />
                <div className="flex-1">
                  <div className="h-5 bg-muted rounded w-1/3 mb-2" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
                <div className="w-24 h-10 bg-muted rounded-xl" />
              </div>
            ))}
          </div>
        ) : filteredPrescriptions.length === 0 ? (
          <div className="text-center py-16">
            <Pill className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              No prescriptions found
            </h3>
            <p className="text-muted-foreground">
              Prescriptions ready for dispensing will appear here
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {filteredPrescriptions.map((prescription) => (
              <div
                key={prescription.id}
                className="p-6 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-button">
                    <Pill className="w-6 h-6 text-primary-foreground" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-display font-semibold text-lg text-foreground">
                          {prescription.medication}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {prescription.dosage}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          prescription.status === "DISPENSED"
                            ? "bg-success/10 text-success border-success/20"
                            : prescription.status === "ACCEPTED"
                            ? "bg-warning/10 text-warning border-warning/20"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {prescription.status}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{prescription.patientName || "Patient"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        <span>Dr. {prescription.doctorName}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                      {prescription.instructions}
                    </p>
                  </div>

                  {prescription.status === "ACCEPTED" && (
                    <Button
                      onClick={() => dispensePrescription(prescription.id)}
                      className="gradient-primary shadow-button"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Dispense
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
