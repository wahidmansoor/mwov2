import type { Request, Response, NextFunction } from "express";
import { storage } from "../storage";

// Define medical roles and their permissions
const rolePermissions = {
  medical_oncologist: [
    "view_patient_data",
    "create_evaluations", 
    "modify_protocols",
    "use_ai_recommendations",
    "view_analytics",
    "manage_treatments",
    "view_protocols"
  ],
  radiation_oncologist: [
    "view_patient_data",
    "create_evaluations",
    "use_ai_recommendations",
    "view_analytics",
    "view_protocols"
  ],
  palliative_care_specialist: [
    "view_patient_data",
    "create_evaluations",
    "use_ai_recommendations",
    "manage_palliative_care",
    "view_protocols"
  ],
  oncology_nurse: [
    "view_patient_data",
    "create_evaluations",
    "use_ai_recommendations",
    "view_protocols"
  ],
  clinical_pharmacist: [
    "view_patient_data",
    "view_protocols",
    "use_ai_recommendations"
  ],
  researcher: [
    "view_patient_data",
    "view_analytics",
    "export_data",
    "view_protocols"
  ],
  admin: [
    "view_patient_data",
    "create_evaluations",
    "modify_protocols", 
    "use_ai_recommendations",
    "view_analytics",
    "manage_users",
    "system_settings",
    "view_protocols",
    "manage_treatments",
    "manage_palliative_care",
    "export_data"
  ]
};

interface RBACOptions {
  requireAll?: boolean; // If true, user must have ALL permissions; if false, user needs ANY permission
  allowOwnership?: boolean; // If true, allow access if user owns the resource
}

export function rbacMiddleware(
  requiredPermissions: string[], 
  options: RBACOptions = { requireAll: false, allowOwnership: false }
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Ensure user is authenticated
      if (!req.userId || !req.user) {
        return res.status(401).json({ 
          message: "Authentication required",
          error: "User must be authenticated for authorization check"
        });
      }

      const user = req.user;
      
      // Get user's permissions from role and explicit permissions
      const userPermissions = getUserPermissions(user);
      
      // Check if user has required permissions
      const hasPermission = options.requireAll
        ? requiredPermissions.every(permission => userPermissions.includes(permission))
        : requiredPermissions.some(permission => userPermissions.includes(permission));

      if (hasPermission) {
        return next();
      }

      // Check ownership if allowed
      if (options.allowOwnership) {
        const resourceUserId = req.params.userId || req.body.createdBy || req.body.userId;
        if (resourceUserId && resourceUserId === req.userId) {
          return next();
        }
      }

      // Admin bypass
      if (user.role === 'admin') {
        return next();
      }

      // Log authorization failure for audit
      await storage.createAuditLog({
        userId: req.userId,
        userRole: user.role,
        action: 'authorization_denied',
        resource: req.path,
        resourceId: req.params.id || 'unknown',
        oldValues: null,
        newValues: {
          requiredPermissions,
          userPermissions,
          method: req.method,
          ip: req.ip
        },
        ipAddress: req.ip,
        userAgent: req.get('User-Agent') || 'unknown'
      });

      res.status(403).json({ 
        message: "Insufficient permissions",
        error: `This action requires the following permissions: ${requiredPermissions.join(', ')}`,
        userRole: user.role,
        requiredPermissions
      });

    } catch (error) {
      console.error("RBAC middleware error:", error);
      res.status(500).json({ 
        message: "Authorization error",
        error: "Internal server error during authorization check"
      });
    }
  };
}

function getUserPermissions(user: any): string[] {
  const rolePerms = rolePermissions[user.role as keyof typeof rolePermissions] || [];
  const explicitPerms = user.permissions || [];
  
  // Combine and deduplicate permissions
  return [...new Set([...rolePerms, ...explicitPerms])];
}

// Helper function to check specific permissions
export function hasPermission(user: any, permission: string): boolean {
  const userPermissions = getUserPermissions(user);
  return userPermissions.includes(permission) || user.role === 'admin';
}

// Middleware for specific common permissions
export const requireViewPatientData = rbacMiddleware(['view_patient_data']);
export const requireCreateEvaluations = rbacMiddleware(['create_evaluations']);
export const requireModifyProtocols = rbacMiddleware(['modify_protocols']);
export const requireUseAI = rbacMiddleware(['use_ai_recommendations']);
export const requireViewAnalytics = rbacMiddleware(['view_analytics']);
export const requireAdminAccess = rbacMiddleware(['system_settings']);

// Resource ownership middleware
export function requireOwnershipOrPermission(requiredPermissions: string[]) {
  return rbacMiddleware(requiredPermissions, { allowOwnership: true });
}

// Department-based access control
export function requireDepartment(departments: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (req.user.role === 'admin' || departments.includes(req.user.department)) {
      return next();
    }

    res.status(403).json({ 
      message: "Department access required",
      error: `Access restricted to: ${departments.join(', ')}`,
      userDepartment: req.user.department
    });
  };
}

// Time-based access control (e.g., emergency protocols)
export function requireEmergencyAccess() {
  return (req: Request, res: Response, next: NextFunction) => {
    // In a real implementation, this would check for emergency override conditions
    // For now, we'll allow all authenticated medical staff
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const medicalRoles = [
      'medical_oncologist',
      'radiation_oncologist', 
      'palliative_care_specialist',
      'oncology_nurse',
      'admin'
    ];

    if (medicalRoles.includes(req.user.role)) {
      return next();
    }

    res.status(403).json({ 
      message: "Emergency access denied",
      error: "Only clinical staff can access emergency protocols"
    });
  };
}
