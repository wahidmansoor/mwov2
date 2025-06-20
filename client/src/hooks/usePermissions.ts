import { useAuth } from "./useAuth";

const rolePermissions = {
  medical_oncologist: [
    "view_patient_data",
    "create_evaluations", 
    "modify_protocols",
    "use_ai_recommendations",
    "view_analytics",
    "manage_treatments"
  ],
  radiation_oncologist: [
    "view_patient_data",
    "create_evaluations",
    "use_ai_recommendations",
    "view_analytics"
  ],
  palliative_care_specialist: [
    "view_patient_data",
    "create_evaluations",
    "use_ai_recommendations",
    "manage_palliative_care"
  ],
  oncology_nurse: [
    "view_patient_data",
    "create_evaluations",
    "use_ai_recommendations"
  ],
  clinical_pharmacist: [
    "view_patient_data",
    "view_protocols",
    "use_ai_recommendations"
  ],
  researcher: [
    "view_patient_data",
    "view_analytics",
    "export_data"
  ],
  admin: [
    "view_patient_data",
    "create_evaluations",
    "modify_protocols", 
    "use_ai_recommendations",
    "view_analytics",
    "manage_users",
    "system_settings"
  ]
};

export function usePermissions() {
  const { user } = useAuth();

  const hasPermission = (permission: string): boolean => {
    if (!user || !user.role) return false;
    
    // Check explicit permissions first
    if (user.permissions?.includes(permission)) return true;
    
    // Check role-based permissions
    const rolePerms = rolePermissions[user.role as keyof typeof rolePermissions];
    return rolePerms?.includes(permission) || false;
  };

  const hasAnyPermission = (permissions: string[]): boolean => {
    return permissions.some(permission => hasPermission(permission));
  };

  const hasAllPermissions = (permissions: string[]): boolean => {
    return permissions.every(permission => hasPermission(permission));
  };

  const getUserPermissions = (): string[] => {
    if (!user || !user.role) return [];
    
    const rolePerms = rolePermissions[user.role as keyof typeof rolePermissions] || [];
    const explicitPerms = user.permissions || [];
    
    // Combine and deduplicate
    return [...new Set([...rolePerms, ...explicitPerms])];
  };

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    getUserPermissions,
    userRole: user?.role,
    isAdmin: user?.role === "admin"
  };
}
