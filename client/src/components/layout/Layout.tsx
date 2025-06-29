import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "@/components/common/Logo";
import { useAuth } from "@/hooks/useAuth";
import { usePermissions } from "@/hooks/usePermissions";
import {
  Menu,
  Settings,
  LogOut,
  Stethoscope,
  Syringe,
  Heart,
  Bed,
  Book,
  BarChart3,
  MessageCircle,
  Calculator,
  FileText,
  Bell,
  User,
  GraduationCap
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  id: string;
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  requiredPermission?: string;
}

const coreModules: NavItem[] = [
  {
    id: "opd",
    name: "OPD Module",
    href: "/opd",
    icon: Stethoscope,
    color: "medical-blue"
  },
  {
    id: "cdu",
    name: "CDU Module",
    href: "/cdu",
    icon: Syringe,
    color: "medical-purple"
  },
  {
    id: "inpatient",
    name: "Inpatient",
    href: "/inpatient",
    icon: Bed,
    color: "medical-orange"
  },
  {
    id: "palliative",
    name: "Palliative Care",
    href: "/palliative",
    icon: Heart,
    color: "medical-green"
  }
];

const clinicalTools: NavItem[] = [
  {
    id: "chat",
    name: "AI Assistant",
    href: "/chat",
    icon: MessageCircle,
    color: "blue-400"
  },
  {
    id: "tools",
    name: "Clinical Tools",
    href: "/tools",
    icon: Calculator,
    color: "purple-400"
  },
  {
    id: "export",
    name: "Notes Export",
    href: "/export",
    icon: FileText,
    color: "green-400"
  }
];

const resources: NavItem[] = [
  {
    id: "handbook",
    name: "Handbook",
    href: "/handbook",
    icon: Book,
    color: "slate-400"
  },
  {
    id: "education",
    name: "Education Module",
    href: "/education",
    icon: GraduationCap,
    color: "blue-500"
  },
  {
    id: "analytics",
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    color: "slate-400",
    requiredPermission: "view_analytics"
  }
];

function Sidebar({ className = "" }: { className?: string }) {
  const [location, setLocation] = useLocation();
  const { user, logout } = useAuth();
  const { hasPermission } = usePermissions();

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return location === "/dashboard";
    }
    return location.startsWith(href);
  };

  const filteredResources = resources.filter(item => 
    !item.requiredPermission || hasPermission(item.requiredPermission)
  );

  return (
    <div className={`flex flex-col h-full bg-white border-r border-slate-200 ${className}`}>
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-200">
        <Logo showSubtitle />
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 gradient-medical-primary rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-slate-900 truncate">
              {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {user?.role?.replace(/_/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase()) || "Loading..."}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-6">
          {/* Dashboard */}
          <div>
            <Button
              variant={isActive("/dashboard") ? "default" : "ghost"}
              onClick={() => setLocation("/dashboard")}
              className="w-full justify-start"
            >
              <BarChart3 className="w-4 h-4 mr-3" />
              Dashboard
            </Button>
          </div>

          {/* Core Modules */}
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Core Modules
            </div>
            <div className="space-y-2">
              {coreModules.map((item) => (
                <Button
                  key={item.id}
                  variant={isActive(item.href) ? "default" : "ghost"}
                  onClick={() => setLocation(item.href)}
                  className="w-full justify-start"
                >
                  <item.icon className={`w-4 h-4 mr-3 ${isActive(item.href) ? 'text-white' : `text-${item.color}`}`} />
                  {item.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Clinical Tools */}
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Clinical Tools
            </div>
            <div className="space-y-2">
              {clinicalTools.map((item) => (
                <Button
                  key={item.id}
                  variant={isActive(item.href) ? "default" : "ghost"}
                  onClick={() => setLocation(item.href)}
                  className="w-full justify-start"
                >
                  <item.icon className={`w-4 h-4 mr-3 ${isActive(item.href) ? 'text-white' : `text-${item.color}`}`} />
                  {item.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Resources */}
          {filteredResources.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Resources
              </div>
              <div className="space-y-2">
                {filteredResources.map((item) => (
                  <Button
                    key={item.id}
                    variant={isActive(item.href) ? "default" : "ghost"}
                    onClick={() => setLocation(item.href)}
                    className="w-full justify-start"
                  >
                    <item.icon className={`w-4 h-4 mr-3 ${isActive(item.href) ? 'text-white' : `text-${item.color}`}`} />
                    {item.name}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-slate-200 space-y-2">
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="w-4 h-4 mr-3" />
          Settings
        </Button>
        <Button variant="ghost" onClick={handleLogout} className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
          <LogOut className="w-4 h-4 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
}

function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 lg:hidden">
      <div className="flex justify-between items-center">
        <Logo />
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Bell className="w-4 h-4" />
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 fixed inset-y-0 left-0 z-50">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile Header */}
        <Header />
        
        {/* Page Content */}
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
