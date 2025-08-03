import { db } from '../db';
import { audit_logs } from '../shared/schema';

interface AuditLogEntry {
  userId: string;
  action: string;
  resource: string;
  details?: string;
  ip?: string;
  userAgent?: string;
}

class AuditLogService {
  async record(entry: AuditLogEntry) {
    try {
      await db.insert(audit_logs).values({
        userId: entry.userId,
        action: entry.action,
        resource: entry.resource,
        details: entry.details,
        timestamp: new Date(),
        ip: entry.ip,
        userAgent: entry.userAgent
      });
    } catch (error) {
      console.error('Audit log error:', error);
      // Don't throw - audit logging should not break the main flow
    }
  }

  async getRecentLogs(userId: string, limit = 100) {
    return db.select()
      .from(audit_logs)
      .where({ userId })
      .orderBy('timestamp', 'desc')
      .limit(limit);
  }
}

export const auditLog = new AuditLogService();
