import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pill, User, Calendar, Clock, CheckCircle2, AlertCircle } from "lucide-react";

interface Prescription {
  id: number;
  medication: string;
  dosage: string;
  instructions: string;
  doctorName: string;
  status: "PENDING" | "ACCEPTED" | "DISPENSED";
  createdAt?: string;
}

interface PrescriptionCardProps {
  prescription: Prescription;
  onAccept?: (id: number) => void;
  showActions?: boolean;
  className?: string;
}

export default function PrescriptionCard({ 
  prescription, 
  onAccept, 
  showActions = true,
  className 
}: PrescriptionCardProps) {
  const statusConfig = {
    PENDING: { 
      color: "bg-warning/10 text-warning border-warning/20",
      icon: AlertCircle,
      label: "Pending"
    },
    ACCEPTED: { 
      color: "bg-success/10 text-success border-success/20",
      icon: CheckCircle2,
      label: "Accepted"
    },
    DISPENSED: { 
      color: "bg-primary/10 text-primary border-primary/20",
      icon: CheckCircle2,
      label: "Dispensed"
    },
  };

  const status = statusConfig[prescription.status];
  const StatusIcon = status.icon;

  return (
    <div className={cn(
      "bg-card rounded-2xl p-6 shadow-card border border-border/50 hover:shadow-lg transition-all duration-300 animate-scale-in",
      className
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-button">
            <Pill className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-foreground">
              {prescription.medication}
            </h3>
            <p className="text-sm text-muted-foreground">{prescription.dosage}</p>
          </div>
        </div>
        <Badge variant="outline" className={cn("gap-1", status.color)}>
          <StatusIcon className="w-3 h-3" />
          {status.label}
        </Badge>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="w-4 h-4 text-primary" />
          <span>Dr. {prescription.doctorName}</span>
        </div>
        
        <div className="bg-muted/50 rounded-xl p-4">
          <p className="text-sm font-medium text-foreground mb-1">Instructions:</p>
          <p className="text-sm text-muted-foreground">{prescription.instructions}</p>
        </div>

        {prescription.createdAt && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span>{new Date(prescription.createdAt).toLocaleDateString()}</span>
            <Clock className="w-3 h-3 ml-2" />
            <span>{new Date(prescription.createdAt).toLocaleTimeString()}</span>
          </div>
        )}
      </div>

      {showActions && prescription.status === "PENDING" && onAccept && (
        <Button 
          onClick={() => onAccept(prescription.id)}
          className="w-full gradient-primary shadow-button font-medium"
        >
          <CheckCircle2 className="w-4 h-4 mr-2" />
          Accept Prescription
        </Button>
      )}
    </div>
  );
}
