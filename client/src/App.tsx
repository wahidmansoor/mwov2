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
import CDUModule from "@/modules/cdu/CDUModule";
import PalliativeModule from "@/modules/palliative/PalliativeModule";
import HandbookModule from "@/modules/handbook/HandbookModule";
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
          <CDUModule />
        </Layout>
      </Route>
      
      <Route path="/palliative">
        <Layout>
          <PalliativeModule />
        </Layout>
      </Route>
      
      <Route path="/handbook">
        <Layout>
          <HandbookModule />
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
