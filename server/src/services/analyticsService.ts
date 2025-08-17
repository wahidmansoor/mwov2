import { logger } from "../utils/logger.js";

interface UsageEntry {
  module: string;
  action: string;
  userId?: string;
  metadata?: Record<string, any>;
  ip?: string;
  userAgent?: string;
  timestamp: string;
  sessionId?: string;
}

interface AnalyticsQuery {
  startDate?: string;
  endDate?: string;
  module?: string;
  groupBy?: 'hour' | 'day' | 'week' | 'month';
  limit?: number;
}

interface UsageSummary {
  total_events: number;
  unique_users: number;
  top_modules: Array<{ module: string; count: number }>;
  top_actions: Array<{ action: string; count: number }>;
  date_range: { start: string; end: string };
}

interface TrendData {
  period: string;
  count: number;
  unique_users: number;
}

interface UserAnalytics {
  total_actions: number;
  modules_used: string[];
  most_common_actions: Array<{ action: string; count: number }>;
  first_activity: string;
  last_activity: string;
  session_count: number;
}

// In-memory storage for analytics (in production, this would be a database)
let usageLog: UsageEntry[] = [];

export const analyticsService = {
  logUsage: async (data: UsageEntry): Promise<void> => {
    logger.info({ 
      module: data.module, 
      action: data.action, 
      userId: data.userId 
    }, 'Logging usage analytics');
    
    // In production, this would insert into a database
    usageLog.push({
      ...data,
      timestamp: data.timestamp || new Date().toISOString()
    });
    
    // Keep log size manageable (last 10000 entries)
    if (usageLog.length > 10000) {
      usageLog = usageLog.slice(-10000);
    }
  },

  getSummary: async (query: AnalyticsQuery): Promise<UsageSummary> => {
    logger.info({ query }, 'Generating analytics summary');
    
    const { startDate, endDate, module } = query;
    
    // Filter data based on query parameters
    let filteredData = usageLog;
    
    if (startDate) {
      filteredData = filteredData.filter(entry => entry.timestamp >= startDate);
    }
    
    if (endDate) {
      filteredData = filteredData.filter(entry => entry.timestamp <= endDate);
    }
    
    if (module) {
      filteredData = filteredData.filter(entry => entry.module === module);
    }
    
    // Calculate summary statistics
    const totalEvents = filteredData.length;
    const uniqueUsers = new Set(filteredData.map(entry => entry.userId).filter(Boolean)).size;
    
    // Top modules
    const moduleCounts: Record<string, number> = {};
    filteredData.forEach(entry => {
      moduleCounts[entry.module] = (moduleCounts[entry.module] || 0) + 1;
    });
    
    const topModules = Object.entries(moduleCounts)
      .map(([module, count]) => ({ module, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    
    // Top actions
    const actionCounts: Record<string, number> = {};
    filteredData.forEach(entry => {
      actionCounts[entry.action] = (actionCounts[entry.action] || 0) + 1;
    });
    
    const topActions = Object.entries(actionCounts)
      .map(([action, count]) => ({ action, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    
    // Date range
    const timestamps = filteredData.map(entry => entry.timestamp).sort();
    const dateRange = {
      start: timestamps[0] || new Date().toISOString(),
      end: timestamps[timestamps.length - 1] || new Date().toISOString()
    };
    
    return {
      total_events: totalEvents,
      unique_users: uniqueUsers,
      top_modules: topModules,
      top_actions: topActions,
      date_range: dateRange
    };
  },

  getUsageTrends: async (query: AnalyticsQuery): Promise<TrendData[]> => {
    logger.info({ query }, 'Generating usage trends');
    
    const { startDate, endDate, module, groupBy = 'day', limit = 30 } = query;
    
    // Filter data
    let filteredData = usageLog;
    
    if (startDate) {
      filteredData = filteredData.filter(entry => entry.timestamp >= startDate);
    }
    
    if (endDate) {
      filteredData = filteredData.filter(entry => entry.timestamp <= endDate);
    }
    
    if (module) {
      filteredData = filteredData.filter(entry => entry.module === module);
    }
    
    // Group data by time period
    const groupedData: Record<string, { count: number; users: Set<string> }> = {};
    
    filteredData.forEach(entry => {
      const date = new Date(entry.timestamp);
      let period: string;
      
      switch (groupBy) {
        case 'hour':
          period = date.toISOString().slice(0, 13) + ':00:00.000Z';
          break;
        case 'day':
          period = date.toISOString().slice(0, 10);
          break;
        case 'week':
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          period = weekStart.toISOString().slice(0, 10);
          break;
        case 'month':
          period = date.toISOString().slice(0, 7);
          break;
        default:
          period = date.toISOString().slice(0, 10);
      }
      
      if (!groupedData[period]) {
        groupedData[period] = { count: 0, users: new Set() };
      }
      
      groupedData[period].count++;
      if (entry.userId) {
        groupedData[period].users.add(entry.userId);
      }
    });
    
    // Convert to array and sort
    const trends = Object.entries(groupedData)
      .map(([period, data]) => ({
        period,
        count: data.count,
        unique_users: data.users.size
      }))
      .sort((a, b) => a.period.localeCompare(b.period))
      .slice(-limit);
    
    return trends;
  },

  getUserAnalytics: async (userId: string, query: AnalyticsQuery): Promise<UserAnalytics> => {
    logger.info({ userId, query }, 'Generating user analytics');
    
    const { startDate, endDate, module } = query;
    
    // Filter data for specific user
    let userData = usageLog.filter(entry => entry.userId === userId);
    
    if (startDate) {
      userData = userData.filter(entry => entry.timestamp >= startDate);
    }
    
    if (endDate) {
      userData = userData.filter(entry => entry.timestamp <= endDate);
    }
    
    if (module) {
      userData = userData.filter(entry => entry.module === module);
    }
    
    if (userData.length === 0) {
      return {
        total_actions: 0,
        modules_used: [],
        most_common_actions: [],
        first_activity: '',
        last_activity: '',
        session_count: 0
      };
    }
    
    // Calculate user statistics
    const totalActions = userData.length;
    const modulesUsed = [...new Set(userData.map(entry => entry.module))];
    
    // Most common actions
    const actionCounts: Record<string, number> = {};
    userData.forEach(entry => {
      actionCounts[entry.action] = (actionCounts[entry.action] || 0) + 1;
    });
    
    const mostCommonActions = Object.entries(actionCounts)
      .map(([action, count]) => ({ action, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    // Activity timeline
    const timestamps = userData.map(entry => entry.timestamp).sort();
    const firstActivity = timestamps[0];
    const lastActivity = timestamps[timestamps.length - 1];
    
    // Session count (approximate based on session IDs)
    const sessionCount = new Set(userData.map(entry => entry.sessionId).filter(Boolean)).size;
    
    return {
      total_actions: totalActions,
      modules_used: modulesUsed,
      most_common_actions: mostCommonActions,
      first_activity: firstActivity,
      last_activity: lastActivity,
      session_count: sessionCount || 1
    };
  },

  getTopUsers: async (query: AnalyticsQuery, limit: number = 10): Promise<Array<{ userId: string; actionCount: number }>> => {
    logger.info({ query, limit }, 'Getting top users');
    
    const { startDate, endDate, module } = query;
    
    // Filter data
    let filteredData = usageLog.filter(entry => entry.userId);
    
    if (startDate) {
      filteredData = filteredData.filter(entry => entry.timestamp >= startDate);
    }
    
    if (endDate) {
      filteredData = filteredData.filter(entry => entry.timestamp <= endDate);
    }
    
    if (module) {
      filteredData = filteredData.filter(entry => entry.module === module);
    }
    
    // Count actions per user
    const userCounts: Record<string, number> = {};
    filteredData.forEach(entry => {
      if (entry.userId) {
        userCounts[entry.userId] = (userCounts[entry.userId] || 0) + 1;
      }
    });
    
    // Sort and return top users
    return Object.entries(userCounts)
      .map(([userId, actionCount]) => ({ userId, actionCount }))
      .sort((a, b) => b.actionCount - a.actionCount)
      .slice(0, limit);
  },

  clearOldData: async (daysToKeep: number = 90): Promise<number> => {
    logger.info({ daysToKeep }, 'Cleaning old analytics data');
    
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    const cutoffTimestamp = cutoffDate.toISOString();
    
    const initialLength = usageLog.length;
    usageLog = usageLog.filter(entry => entry.timestamp >= cutoffTimestamp);
    const removedCount = initialLength - usageLog.length;
    
    logger.info({ removedCount, remainingCount: usageLog.length }, 'Analytics data cleanup completed');
    
    return removedCount;
  }
};
