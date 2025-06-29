import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
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
import SCLCModule from "@/modules/sclc/SCLCModule";
import OncologyEducationModule from "@/modules/education/OncologyEducationModule";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading || !isAuthenticated) {
    return (
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route component={NotFound} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" component={() => (
        <Layout>
          <Dashboard />
        </Layout>
      )} />
      
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
      
      <Route path="/sclc">
        <Layout>
          <SCLCModule />
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
      
      <Route path="/education">
        <Layout>
          <OncologyEducationModule />
        </Layout>
      </Route>
      
      <Route path="/handbook">
        <Layout>
          <HandbookModule />
        </Layout>
      </Route>
      
      <Route path="/handbook/medical-oncology/:chapter?/:section?">
        <Layout>
          <MedicalOncologyView />
        </Layout>
      </Route>
      
      <Route path="/handbook/radiation-oncology/:chapter?/:section?">
        <Layout>
          <RadiationOncologyView />
        </Layout>
      </Route>
      
      <Route path="/handbook/palliative-care/:chapter?/:section?">
        <Layout>
          <PalliativeCareView />
        </Layout>
      </Route>
      
      <Route path="/palliative-care">
        <Layout>
          <PalliativeCareModule />
        </Layout>
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;