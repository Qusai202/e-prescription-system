import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PrescriptionCard from "@/components/ui/PrescriptionCard";
import StatCard from "@/components/ui/StatCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
  FileText,
  CheckCircle2,
  Clock,
  Search,
  Stethoscope,
  Pill,
} from "lucide-react";
import { cn } from "@/lib/utils";


interface Prescription {
  id: number;
  medicationName: string;
  dosage: string;
  instructions: string;
  doctorName: string;
  status: "PENDING" | "ACCEPTED" | "DISPENSED";
  createdAt?: string;
}

interface Doctor {
  id: number;
  fullName: string;
  specialization?: string;
}

export default function PatientDashboard() {
  const { user } = useAuth();

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedPrescription, setSelectedPrescription] =
    useState<Prescription | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] =
    useState<"all" | "pending" | "accepted">("all");
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        
        const prescRes = await fetch(
          "http://localhost:8080/api/prescriptions/patient",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (prescRes.ok) {
          const prescData = await prescRes.json();
          setPrescriptions(prescData);
        }

        const docRes = await fetch("http://localhost:8080/api/doctors", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (docRes.ok) {
          const docData = await docRes.json();
          setDoctors(docData);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);


  const acceptPrescription = async (id: number) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/prescriptions/${id}/accept`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) throw new Error();

      setPrescriptions((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, status: "ACCEPTED" } : p
        )
      );

      if (selectedPrescription?.id === id) {
        setSelectedPrescription({
          ...selectedPrescription,
          status: "ACCEPTED",
        });
      }

      toast.success("Prescription accepted successfully!");
    } catch {
      toast.error("Failed to accept prescription");
    }
  };


  const filteredPrescriptions = prescriptions.filter((p) => {
    const matchesSearch =
      p.medicationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.doctorName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && p.status === "PENDING") ||
      (activeTab === "accepted" && p.status === "ACCEPTED");

    return matchesSearch && matchesTab;
  });

  const pendingCount = prescriptions.filter(
    (p) => p.status === "PENDING"
  ).length;
  const acceptedCount = prescriptions.filter(
    (p) => p.status === "ACCEPTED"
  ).length;


  return (
    <DashboardLayout title="My Dashboard">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Prescriptions" value={prescriptions.length} icon={FileText} />
        <StatCard title="Pending Review" value={pendingCount} icon={Clock} />
        <StatCard title="Accepted" value={acceptedCount} icon={CheckCircle2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Prescriptions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <div className="flex gap-4 mb-6">
              {[
                { key: "all", label: "All", count: prescriptions.length },
                { key: "pending", label: "Pending", count: pendingCount },
                { key: "accepted", label: "Accepted", count: acceptedCount },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm",
                    activeTab === tab.key
                      ? "gradient-primary text-white"
                      : "bg-muted"
                  )}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search prescriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {isLoading ? (
            <p>Loading...</p>
          ) : filteredPrescriptions.length === 0 ? (
            <div className="text-center py-16">
              <Pill className="mx-auto mb-4" />
              No prescriptions found
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredPrescriptions.map((p) => (
                <div key={p.id} onClick={() => setSelectedPrescription(p)}>
                  <PrescriptionCard
                    prescription={p}
                    onAccept={acceptPrescription}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Prescription */}
        {selectedPrescription && (
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <h3 className="font-semibold mb-4">Prescription Details</h3>
            <p><b>Doctor:</b> Dr. {selectedPrescription.doctorName}</p>
            <p><b>Medication:</b> {selectedPrescription.medicationName}</p>
            <p><b>Dosage:</b> {selectedPrescription.dosage}</p>
            <p><b>Instructions:</b> {selectedPrescription.instructions}</p>

            {selectedPrescription.status === "PENDING" && (
              <Button
                className="mt-4 w-full"
                onClick={() => acceptPrescription(selectedPrescription.id)}
              >
                Accept Prescription
              </Button>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
