import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { User, Mail, FileText, Calendar } from "lucide-react";

interface Patient {
  id: number;
  fullName: string;
  username: string;
  email?: string;
  lastVisit?: string;
}

interface PatientCardProps {
  patient: Patient;
  onWritePrescription: (patientId: number) => void;
  className?: string;
}

export default function PatientCard({ patient, onWritePrescription, className }: PatientCardProps) {
  return (
    <div className={cn(
      "bg-card rounded-2xl p-6 shadow-card border border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-scale-in",
      className
    )}>
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center shadow-button">
          <User className="w-7 h-7 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="font-display font-semibold text-lg text-foreground">
            {patient.fullName}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <Mail className="w-3 h-3" />
            <span>{patient.email || patient.username}</span>
          </div>
        </div>
      </div>

      {patient.lastVisit && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4 bg-muted/50 rounded-lg px-3 py-2">
          <Calendar className="w-3 h-3" />
          <span>Last visit: {new Date(patient.lastVisit).toLocaleDateString()}</span>
        </div>
      )}

      <Button 
        onClick={() => onWritePrescription(patient.id)}
        className="w-full gradient-primary shadow-button font-medium"
      >
        <FileText className="w-4 h-4 mr-2" />
        Write Prescription
      </Button>
    </div>
  );
}
