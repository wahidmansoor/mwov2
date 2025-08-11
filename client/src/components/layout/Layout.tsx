import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Logo from "@/components/common/Logo";
import { useAuth } from "@/hooks/useAuth";
import { usePermissions } from "@/hooks/usePermissions";
import HelpSystem from "@/components/help/HelpSystem";
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
  GraduationCap,
  NotebookPen,
  Cog,
  Clock,
  Sun,
  Moon
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
    id: "notes",
    name: "Clinical Notes",
    href: "/notes",
    icon: NotebookPen,
    color: "emerald-400"
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

      {/* Navigation */}
      <nav className="flex-1 p-4 pt-6 overflow-y-auto">
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
        <HelpSystem />
        <Button 
          variant="ghost" 
          onClick={() => setLocation("/settings")}
          className="w-full justify-start"
        >
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

function GlobalTopNavigation() {
  const { user, logout } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getUserInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return 'U';
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
      <div className="px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo and Welcome */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <Logo />
              
              {/* Mobile Menu Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="lg:hidden">
                    <Menu className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                  <Sidebar />
                </SheetContent>
              </Sheet>
            </div>

            {/* Welcome Message - Hidden on mobile */}
            {user && (
              <div className="hidden md:block">
                <h1 className="text-lg font-semibold text-slate-900">
                  {getGreeting()}, Dr. {user.firstName || 'User'}
                </h1>
                <p className="text-sm text-slate-600">
                  OncoVista AI Clinical Decision Support Platform
                </p>
              </div>
            )}
          </div>

          {/* Right Section - Time, Notifications, User Menu */}
          <div className="flex items-center space-x-4">
            {/* Date and Time */}
            <div className="hidden sm:flex items-center space-x-3 text-sm text-slate-600">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{formatTime(currentTime)}</span>
              </div>
              <div className="hidden md:block">
                <span>{formatDate(currentTime)}</span>
              </div>
            </div>

            {/* Help System */}
            <HelpSystem />

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              {/* Notification badge */}
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 hover:bg-slate-100">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.profileImageUrl || undefined} />
                      <AvatarFallback className="bg-blue-100 text-blue-700 text-sm">
                        {getUserInitials(user.firstName, user.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block text-left">
                      <div className="text-sm font-medium text-slate-900">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-xs text-slate-500 capitalize">
                        {user.role}
                      </div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                    <p className="text-xs text-slate-500 capitalize mt-1">Role: {user.role}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Preferences
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="default" size="sm">
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Global Top Navigation */}
      <GlobalTopNavigation />
      
      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 fixed inset-y-0 left-0 top-20 z-40">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          {/* Page Content */}
          <main className="min-h-screen">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
