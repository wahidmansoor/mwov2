import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { useAutoLogout } from "@/hooks/useAutoLogout";
import LandingPage from "@/pages/LandingPage";
import Dashboard from "@/pages/Dashboard";
import Layout from "@/components/layout/Layout";
import OPDModuleEnhanced from "@/modules/opd/OPDModuleEnhanced";
import CDUModule from "@/modules/cdu/CDUModule";

import InpatientModule from "@/modules/inpatient/InpatientModule";
import ChatAssistant from "@/modules/chat/ChatAssistant";
import ComprehensiveClinicalTools from "@/modules/tools/ComprehensiveClinicalTools";

import NotesCompilerModule from "@/modules/notes/NotesCompilerModule";
import SettingsModule from "@/modules/settings/SettingsModule";
import AnalyticsModule from "@/modules/analytics/AnalyticsModule";
import HandbookModule from "@/modules/handbook/HandbookModule";
import MedicalOncologyView from "@/modules/handbook/MedicalOncologyView";
import RadiationOncologyView from "@/modules/handbook/RadiationOncologyView";
import PalliativeCareView from "@/modules/handbook/PalliativeCareView";

import ComprehensivePalliativeCare from "@/modules/palliative/ComprehensivePalliativeCare";
import OncologyEducationModule from "@/modules/education/OncologyEducationModule";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Initialize auto-logout functionality for authenticated users
  useAutoLogout();

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
          <OPDModuleEnhanced />
        </Layout>
      </Route>
      
      <Route path="/cdu">
        <Layout>
          <CDUModule />
        </Layout>
      </Route>
      
      <Route path="/palliative">
        <Layout>
          <ComprehensivePalliativeCare />
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
          <ComprehensiveClinicalTools />
        </Layout>
      </Route>
      


      <Route path="/notes">
        <Layout>
          <NotesCompilerModule />
        </Layout>
      </Route>

      <Route path="/settings">
        <Layout>
          <SettingsModule />
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
      
      <Route path="/handbook/medical/:chapter?/:section?">
        <Layout>
          <MedicalOncologyView />
        </Layout>
      </Route>
      
      <Route path="/handbook/radiation/:chapter?/:section?">
        <Layout>
          <RadiationOncologyView />
        </Layout>
      </Route>
      
      <Route path="/handbook/palliative/:chapter?/:section?">
        <Layout>
          <PalliativeCareView />
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