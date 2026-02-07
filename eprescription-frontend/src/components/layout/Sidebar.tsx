import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Calendar, 
  Settings,
  Activity,
  Pill,
  ClipboardList,
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
}

const doctorNavItems: NavItem[] = [
  { title: "Dashboard", url: "/doctor", icon: LayoutDashboard },
  { title: "My Patients", url: "/doctor/patients", icon: Users },
  { title: "Prescriptions", url: "/doctor/prescriptions", icon: FileText },
  { title: "Appointments", url: "/doctor/appointments", icon: Calendar },
];

const patientNavItems: NavItem[] = [
  { title: "Dashboard", url: "/patient", icon: LayoutDashboard },
  { title: "My Prescriptions", url: "/patient/prescriptions", icon: FileText },
  { title: "Find Doctors", url: "/patient/doctors", icon: Search },
  { title: "My Appointments", url: "/patient/appointments", icon: Calendar },
];

const pharmacyNavItems: NavItem[] = [
  { title: "Dashboard", url: "/pharmacy", icon: LayoutDashboard },
  { title: "Prescriptions", url: "/pharmacy/prescriptions", icon: ClipboardList },
  { title: "Inventory", url: "/pharmacy/inventory", icon: Pill },
];

export default function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();

  const navItems = user?.role === "DOCTOR" 
    ? doctorNavItems 
    : user?.role === "PATIENT" 
      ? patientNavItems 
      : pharmacyNavItems;

  return (
    <aside className="w-64 min-h-screen gradient-sidebar flex flex-col">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl text-white">MedScript</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <li key={item.title}>
                <Link
                  to={item.url}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200",
                    isActive 
                      ? "bg-white text-primary shadow-lg" 
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4">
        <Link
          to="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200"
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
