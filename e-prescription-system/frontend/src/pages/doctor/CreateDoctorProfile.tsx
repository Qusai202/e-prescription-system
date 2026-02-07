import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function CreateDoctorProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    specialization: "",
    phone: "",
    clinicAddress: "",
    yearsOfExperience: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/doctor/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          specialization: form.specialization,
          phone: form.phone,
          clinicAddress: form.clinicAddress,
          yearsOfExperience: Number(form.yearsOfExperience),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create doctor profile");
      }

      toast.success("Doctor profile created successfully");
      navigate("/doctor");

    } catch (error) {
      toast.error("Failed to create doctor profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-xl mx-auto bg-card p-8 rounded-2xl shadow-card border">
        <h1 className="text-2xl font-bold mb-6">Complete Your Doctor Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label>Specialization</Label>
            <Input
              name="specialization"
              placeholder="e.g. Internal Medicine"
              value={form.specialization}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Phone</Label>
            <Input
              name="phone"
              placeholder="079xxxxxxx"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Clinic Address</Label>
            <Textarea
              name="clinicAddress"
              placeholder="Clinic location"
              value={form.clinicAddress}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Years of Experience</Label>
            <Input
              name="yearsOfExperience"
              type="number"
              min={0}
              value={form.yearsOfExperience}
              onChange={handleChange}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full gradient-primary"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Profile"}
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
}
