import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Validate environment variables
if (!import.meta.env.VITE_AUTH0_DOMAIN) {
  console.warn("VITE_AUTH0_DOMAIN not configured");
}

if (!import.meta.env.VITE_AUTH0_CLIENT_ID) {
  console.warn("VITE_AUTH0_CLIENT_ID not configured");
}

if (!import.meta.env.VITE_SUPABASE_URL) {
  console.warn("VITE_SUPABASE_URL not configured");
}

if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn("VITE_SUPABASE_ANON_KEY not configured");
}

// Environment validation complete
createRoot(document.getElementById("root")!).render(<App />);
