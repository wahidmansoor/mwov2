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
import InpatientModule from "@/modules/inpatient/InpatientModule";
import ChatAssistant from "@/modules/chat/ChatAssistant";
import ToolsBar from "@/modules/tools/ToolsBar";
import NotesExport from "@/modules/export/NotesExport";
import AnalyticsModule from "@/modules/analytics/AnalyticsModule";
import HandbookModule from "@/modules/handbook/HandbookModule";
import MedicalOncologyView from "@/modules/handbook/MedicalOncologyView";
import RadiationOncologyView from "@/modules/handbook/RadiationOncologyView";
import PalliativeCareView from "@/modules/handbook/PalliativeCareView";
import PalliativeCareModule from "@/modules/palliative/PalliativeCareModule";
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
      
      <Route path="/inpatient">
        <Layout>
          <InpatientModule />
        </Layout>
      </Route>
      
      <Route path="/chat">
        <Layout>
          <ChatAssistant />
        </Layout>
      </Route>
      
      <Route path="/tools">
        <Layout>
          <ToolsBar />
        </Layout>
      </Route>
      
      <Route path="/export">
        <Layout>
          <NotesExport />
        </Layout>
      </Route>
      
      <Route path="/analytics">
        <Layout>
          <AnalyticsModule />
        </Layout>
      </Route>
      
      <Route path="/palliative">
        <Layout>
          <PalliativeCareModule />
        </Layout>
      </Route>
      
      <Route path="/handbook" component={() => (
        <Layout>
          <HandbookModule />
        </Layout>
      )} />
      
      <Route path="/handbook/medical" component={() => (
        <Layout>
          <MedicalOncologyView />
        </Layout>
      )} />
      
      <Route path="/handbook/radiation" component={() => (
        <Layout>
          <RadiationOncologyView />
        </Layout>
      )} />
      
      <Route path="/handbook/palliative" component={() => (
        <Layout>
          <PalliativeCareView />
        </Layout>
      )} />
      
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
