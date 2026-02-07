import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { 
  Shield, 
  FileText, 
  Users, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Activity,
  Pill,
  Stethoscope,
  Lock,
  Clock,
  Globe
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Digital Prescriptions",
    description: "Create and manage electronic prescriptions securely with complete medical history tracking."
  },
  {
    icon: Shield,
    title: "Secure & Compliant",
    description: "End-to-end encryption ensures patient data privacy and regulatory compliance."
  },
  {
    icon: Users,
    title: "Multi-Role Access",
    description: "Dedicated portals for doctors, patients, and pharmacies with role-based permissions."
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Instant notifications and status updates for prescriptions and appointments."
  },
  {
    icon: Clock,
    title: "24/7 Accessibility",
    description: "Access your prescriptions and medical records anytime, anywhere."
  },
  {
    icon: Globe,
    title: "Nationwide Network",
    description: "Connected pharmacy network for easy prescription fulfillment."
  }
];

const benefits = [
  "Eliminate paper prescriptions and reduce errors",
  "Track prescription history and medication interactions",
  "Instant verification for pharmacies",
  "Secure patient-doctor communication",
  "Automated refill reminders",
  "Complete audit trail and compliance"
];

const stats = [
  { value: "10K+", label: "Active Doctors" },
  { value: "50K+", label: "Patients Served" },
  { value: "100K+", label: "Prescriptions" },
  { value: "99.9%", label: "Uptime" }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 gradient-hero opacity-5" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              <Activity className="w-4 h-4" />
              Modern Healthcare Solution
            </div>
            
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-slide-up">
              Smart Electronic
              <span className="text-gradient block mt-2">Prescription Platform</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up">
              Revolutionize healthcare delivery with our secure, efficient, and user-friendly 
              e-prescription system connecting doctors, patients, and pharmacies seamlessly.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
              <Link to="/register">
                <Button size="lg" className="gradient-primary shadow-button font-semibold gap-2 px-8 py-6 text-lg">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="font-semibold px-8 py-6 text-lg">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="font-display text-4xl md:text-5xl font-bold text-gradient mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need for
              <span className="text-gradient block">Modern Healthcare</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Our comprehensive platform streamlines the entire prescription workflow 
              with powerful features designed for healthcare professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-card rounded-2xl p-8 shadow-card border border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center shadow-button mb-6">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose
                <span className="text-gradient block">MedScript?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of healthcare providers who have transformed their 
                prescription management with our innovative platform.
              </p>

              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="absolute inset-0 gradient-primary rounded-3xl blur-3xl opacity-20" />
              <div className="relative bg-card rounded-3xl p-8 shadow-xl border border-border/50">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-muted/50 rounded-2xl p-6 text-center">
                    <Stethoscope className="w-10 h-10 text-primary mx-auto mb-3" />
                    <p className="font-display font-semibold text-foreground">For Doctors</p>
                    <p className="text-sm text-muted-foreground mt-1">Write & manage prescriptions</p>
                  </div>
                  <div className="bg-muted/50 rounded-2xl p-6 text-center">
                    <Users className="w-10 h-10 text-secondary mx-auto mb-3" />
                    <p className="font-display font-semibold text-foreground">For Patients</p>
                    <p className="text-sm text-muted-foreground mt-1">Access & track medications</p>
                  </div>
                  <div className="bg-muted/50 rounded-2xl p-6 text-center">
                    <Pill className="w-10 h-10 text-accent mx-auto mb-3" />
                    <p className="font-display font-semibold text-foreground">For Pharmacies</p>
                    <p className="text-sm text-muted-foreground mt-1">Verify & dispense safely</p>
                  </div>
                  <div className="bg-muted/50 rounded-2xl p-6 text-center">
                    <Lock className="w-10 h-10 text-success mx-auto mb-3" />
                    <p className="font-display font-semibold text-foreground">Secure</p>
                    <p className="text-sm text-muted-foreground mt-1">HIPAA compliant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="relative gradient-primary rounded-3xl p-12 lg:p-20 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2220%22 height=%2220%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M0 0h20v20H0z%22 fill=%22none%22/%3E%3Ccircle cx=%221%22 cy=%221%22 r=%221%22 fill=%22rgba(255,255,255,0.1)%22/%3E%3C/svg%3E')] opacity-50" />
            
            <div className="relative">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
                Ready to Transform Your Practice?
              </h2>
              <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-10">
                Join MedScript today and experience the future of electronic prescriptions. 
                Start your free trial and see the difference.
              </p>
              <Link to="/register">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold gap-2 px-8 py-6 text-lg shadow-xl">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Activity className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg">MedScript</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 MedScript. All rights reserved. Making healthcare better.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
