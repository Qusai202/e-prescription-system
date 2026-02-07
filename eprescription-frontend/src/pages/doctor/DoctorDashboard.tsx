import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PatientCard from "@/components/ui/PatientCard";
import StatCard from "@/components/ui/StatCard";
import { Users, FileText, Calendar, TrendingUp, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Patient {
  id: number;
  fullName: string;
  username: string;
  email?: string;
  lastVisit?: string;
}

export default function DoctorDashboard() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/doctor/patients", {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setPatients(data);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleWritePrescription = (patientId: number) => {
    navigate(`/doctor/prescribe/${patientId}`);
  };

  return (
    <DashboardLayout title="Doctor Dashboard">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Patients"
          value={patients.length}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Prescriptions Today"
          value={8}
          icon={FileText}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Appointments"
          value={12}
          icon={Calendar}
        />
        <StatCard
          title="Success Rate"
          value="98%"
          icon={TrendingUp}
          trend={{ value: 2, isPositive: true }}
        />
      </div>

      {/* Search and Filter */}
      <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search patients by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <Button variant="outline" className="gap-2 h-12">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Patients Grid */}
      <div>
        <h2 className="font-display text-xl font-semibold text-foreground mb-6">
          Registered Patients ({filteredPatients.length})
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-2xl p-6 shadow-card animate-pulse">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-muted rounded-2xl" />
                  <div className="flex-1">
                    <div className="h-5 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                </div>
                <div className="h-10 bg-muted rounded-xl" />
              </div>
            ))}
          </div>
        ) : filteredPatients.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-2xl shadow-card">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              No patients found
            </h3>
            <p className="text-muted-foreground">
              {searchQuery
                ? "Try a different search term"
                : "Patients who register will appear here"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onWritePrescription={handleWritePrescription}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
