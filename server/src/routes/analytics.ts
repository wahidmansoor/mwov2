import { Router } from "express";
import { logUsage, getSummary, getUsageTrends, getUserAnalytics } from "../controllers/analytics.js";

const router = Router();

// Analytics endpoints
router.post("/log", logUsage);
router.get("/summary", getSummary);
router.get("/trends", getUsageTrends);
router.get("/user/:userId", getUserAnalytics);

// Analytics dashboard endpoint
router.get("/", (req, res) => {
  res.json({
    message: "OncoVista Analytics Dashboard",
    available_endpoints: [
      {
        name: "Log Usage",
        endpoint: "/api/analytics/log",
        method: "POST",
        description: "Log user interactions and system usage"
      },
      {
        name: "Usage Summary",
        endpoint: "/api/analytics/summary",
        method: "GET",
        description: "Get overall usage statistics"
      },
      {
        name: "Usage Trends",
        endpoint: "/api/analytics/trends",
        method: "GET",
        description: "Get usage trends over time with grouping options"
      },
      {
        name: "User Analytics",
        endpoint: "/api/analytics/user/:userId",
        method: "GET",
        description: "Get analytics for a specific user"
      }
    ],
    privacy_note: "All analytics data is anonymized and used solely for system improvement."
  });
});

export default router;
