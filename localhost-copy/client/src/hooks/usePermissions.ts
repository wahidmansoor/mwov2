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
  // Since auth is removed, grant all permissions for now
  const hasPermission = (_permission: string): boolean => {
    return true; // Allow all permissions
  };

  const hasAnyPermission = (_permissions: string[]): boolean => {
    return true; // Allow all permissions
  };

  const hasAllPermissions = (_permissions: string[]): boolean => {
    return true; // Allow all permissions
  };

  const getUserPermissions = (): string[] => {
    // Return all possible permissions
    return Object.values(rolePermissions).flat();
  };

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    getUserPermissions,
    userRole: "medical_oncologist", // Default role
    isAdmin: false
  };
}
