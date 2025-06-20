import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/components/auth/AuthProvider";
import LandingPage from "@/pages/LandingPage";
import Dashboard from "@/pages/Dashboard";
import Layout from "@/components/layout/Layout";
import OPDModule from "@/modules/opd/OPDModule";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={LandingPage} />
      
      {/* Protected Routes with Layout */}
      <Route path="/dashboard">
        <Layout>
          <Dashboard />
        </Layout>
      </Route>
      
      <Route path="/opd/:section?">
        <Layout>
          <OPDModule />
        </Layout>
      </Route>
      
      <Route path="/cdu">
        <Layout>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-slate-900">CDU Module</h1>
            <p className="text-slate-600">Cancer Day Unit - Coming Soon</p>
          </div>
        </Layout>
      </Route>
      
      <Route path="/palliative">
        <Layout>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-slate-900">Palliative Care</h1>
            <p className="text-slate-600">Palliative Care Module - Coming Soon</p>
          </div>
        </Layout>
      </Route>
      
      <Route path="/inpatient">
        <Layout>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-slate-900">Inpatient Care</h1>
            <p className="text-slate-600">Inpatient Module - Coming Soon</p>
          </div>
        </Layout>
      </Route>
      
      <Route path="/handbook">
        <Layout>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-slate-900">Clinical Handbook</h1>
            <p className="text-slate-600">Clinical Handbook - Coming Soon</p>
          </div>
        </Layout>
      </Route>
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
