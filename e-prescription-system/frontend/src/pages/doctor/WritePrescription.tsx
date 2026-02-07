import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Pill,
  User,
  FileText,
  Send,
  ArrowLeft,
  Clock,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function WritePrescription() {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [form, setForm] = useState({
    medicationName: "",
    dosage: "",
    instructions: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!patientId) {
      toast.error("Patient ID is missing");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/prescriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          patientId: Number(patientId),
          medicationName: form.medicationName,
          dosage: form.dosage,
          instructions: form.instructions,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Backend error:", text);
        throw new Error("Failed to create prescription");
      }

      setIsSubmitted(true);
      toast.success("Prescription sent successfully!");

      setTimeout(() => {
        navigate("/doctor");
      }, 2000);
    } catch (error) {
      toast.error("Failed to send prescription");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Prescription Sent!</h2>
          <p className="text-muted-foreground mb-6">
            The prescription has been successfully created.
          </p>
          <Button onClick={() => navigate("/doctor")}>
            Back to Dashboard
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/doctor")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Write Prescription</h1>
            <p className="text-muted-foreground">
              Create a new prescription
            </p>
          </div>
        </div>

        {/* Patient Info */}
        <div className="bg-card rounded-xl p-6 mb-8 flex items-center gap-4">
          <User className="w-8 h-8 text-primary" />
          <div>
            <h3 className="font-semibold">
              Patient ID: {patientId}
            </h3>
            <p className="text-sm text-muted-foreground">
              Prescription will be linked to this patient
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-card rounded-xl p-8 space-y-6"
        >
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Prescription Details</h2>
          </div>

          <div className="space-y-2">
            <Label>Medication Name</Label>
            <div className="relative">
              <Pill className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                name="medicationName"
                value={form.medicationName}
                onChange={handleChange}
                placeholder="e.g. Amoxicillin 500mg"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Dosage</Label>
            <Input
              name="dosage"
              value={form.dosage}
              onChange={handleChange}
              placeholder="e.g. 1 tablet twice daily"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Instructions</Label>
            <Textarea
              name="instructions"
              value={form.instructions}
              onChange={handleChange}
              placeholder="Any special instructions"
              required
            />
          </div>

          <div className="flex items-start gap-3 bg-yellow-50 p-4 rounded-lg">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-1" />
            <p className="text-sm text-muted-foreground">
              Please verify all information before sending.
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => navigate("/doctor")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Prescription
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
