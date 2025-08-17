import { supabase, db } from '../lib/supabase.js'

// Generic API service class
class ApiService {
  constructor(tableName) {
    this.tableName = tableName;
  }

  // CRUD operations
  async getAll(options = {}) {
    const { columns = '*', filter, orderBy, limit } = options;
    let query = (await db.query(this.tableName)).select(columns);
    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }
    if (orderBy) {
      query = query.order(orderBy.column, { ascending: orderBy.ascending ?? true });
    }
    if (limit) {
      query = query.limit(limit);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  async getById(id, columns = '*') {
    const { data, error } = await (await db.query(this.tableName))
      .select(columns)
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }

  async create(item) {
    const { data, error } = await (await db.query(this.tableName))
      .insert(item)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async update(id, updates) {
    const { data, error } = await (await db.query(this.tableName))
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async delete(id) {
    const { error } = await (await db.query(this.tableName))
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  }

  async search(column, value, options = {}) {
    const { columns = '*', limit = 50 } = options;
    const { data, error } = await (await db.query(this.tableName))
      .select(columns)
      .ilike(column, `%${value}%`)
      .limit(limit);
    if (error) throw error;
    return data;
  }
}

// Services for tables that actually exist in the schema
export const userService = {
  ...new ApiService('users'),
  
  async getByEmail(email) {
    const { data, error } = await db.query('users')
      .select('*')
      .eq('email', email)
      .single()
    
    if (error) throw error
    return data
  },

  async getActiveUsers() {
    const { data, error } = await db.query('users')
      .select('*')
      .eq('is_active', true)
      .order('last_name')
    
    if (error) throw error
    return data
  }
}

export const admissionService = {
  ...new ApiService('admission_criteria'),
  
  async getByCancerType(cancerType) {
    const { data, error } = await db.query('admission_criteria')
      .select('*')
      .eq('cancer_type', cancerType)
      .eq('is_active', true)
      .order('criteria_name')
    
    if (error) throw error
    return data
  },

  async getByAdmissionType(admissionType) {
    const { data, error } = await db.query('admission_criteria')
      .select('*')
      .eq('admission_type', admissionType)
      .eq('is_active', true)
      .order('criteria_name')
    
    if (error) throw error
    return data
  }
}

export const protocolService = {
  ...new ApiService('cd_protocols'),
  
  async getByTumourGroup(tumourGroup) {
    const { data, error } = await db.query('cd_protocols')
      .select('*')
      .eq('tumour_group', tumourGroup)
      .eq('status', 'active')
      .order('code')
    
    if (error) throw error
    return data
  },

  async searchByCode(code) {
    const { data, error } = await db.query('cd_protocols')
      .select('*')
      .ilike('code', `%${code}%`)
      .order('code')
    
    if (error) throw error
    return data
  },

  // Use GIN index for full-text search
  async searchSummary(searchTerm) {
    const { data, error } = await db.query('cd_protocols')
      .select('*')
      .textSearch('summary', searchTerm, { 
        type: 'websearch',
        config: 'english' 
      })
      .limit(20)
    
    if (error) {
      // Fallback to ilike if textSearch fails
      return this.search('summary', searchTerm, { limit: 20 })
    }
    return data
  }
}

export const medicationService = {
  ...new ApiService('oncology_medications'),
  
  async searchByName(searchTerm) {
    const { data, error } = await db.query('oncology_medications')
      .select('*')
      .or(`name.ilike.%${searchTerm}%,summary.ilike.%${searchTerm}%`)
      .order('name')
    
    if (error) throw error
    return data
  },

  async getByClassification(classification) {
    const { data, error } = await db.query('oncology_medications')
      .select('*')
      .eq('classification', classification)
      .order('name')
    
    if (error) throw error
    return data
  },

  async getChemotherapyDrugs() {
    const { data, error } = await db.query('oncology_medications')
      .select('*')
      .eq('is_chemotherapy', true)
      .order('name')
    
    if (error) throw error
    return data
  },

  async getImmunotherapyDrugs() {
    const { data, error } = await db.query('oncology_medications')
      .select('*')
      .eq('is_immunotherapy', true)
      .order('name')
    
    if (error) throw error
    return data
  },

  async getTargetedTherapyDrugs() {
    const { data, error } = await db.query('oncology_medications')
      .select('*')
      .eq('is_targeted_therapy', true)
      .order('name')
    
    if (error) throw error
    return data
  }
}

export const emergencyService = {
  ...new ApiService('emergency_scenarios'),
  
  async getByCancerType(cancerType) {
    const { data, error } = await db.query('emergency_scenarios')
      .select('*')
      .eq('cancer_type', cancerType)
      .eq('is_active', true)
      .order('severity', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getBySeverity(severity) {
    const { data, error } = await db.query('emergency_scenarios')
      .select('*')
      .eq('severity', severity)
      .eq('is_active', true)
      .order('scenario_name')
    
    if (error) throw error
    return data
  },

  async getProtocolsForScenario(scenarioId) {
    const { data, error } = await db.query('emergency_protocols')
      .select('*')
      .eq('scenario_id', scenarioId)
      .order('step_number')
    
    if (error) throw error
    return data
  }
}

export const nccnService = {
  ...new ApiService('nccn_guidelines'),
  
  async getByCancerType(cancerType) {
    const { data, error } = await db.query('nccn_guidelines')
      .select('*')
      .eq('cancer_type', cancerType)
      .order('version', { ascending: false })
    
    if (error) throw error
    return data
  },

  async searchByTitle(searchTerm) {
    const { data, error } = await db.query('nccn_guidelines')
      .select('*')
      .ilike('title', `%${searchTerm}%`)
      .order('title')
    
    if (error) throw error
    return data
  }
}

export const monitoringService = {
  ...new ApiService('monitoring_parameters'),
  
  async getByCancerType(cancerType) {
    const { data, error } = await db.query('monitoring_parameters')
      .select('*')
      .eq('cancer_type', cancerType)
      .eq('is_active', true)
      .order('parameter_name')
    
    if (error) throw error
    return data
  },

  async getByCategory(category) {
    const { data, error } = await db.query('monitoring_parameters')
      .select('*')
      .eq('category', category)
      .eq('is_active', true)
      .order('parameter_name')
    
    if (error) throw error
    return data
  }
}

export const supportiveCareService = {
  ...new ApiService('supportive_care_protocols'),
  
  async getByCategory(category) {
    const { data, error } = await db.query('supportive_care_protocols')
      .select('*')
      .eq('category', category)
      .eq('is_active', true)
      .order('protocol_name')
    
    if (error) throw error
    return data
  },

  async getByCancerType(cancerType) {
    const { data, error } = await db.query('supportive_care_protocols')
      .select('*')
      .eq('cancer_type', cancerType)
      .eq('is_active', true)
      .order('protocol_name')
    
    if (error) throw error
    return data
  }
}

export const dischargeService = {
  ...new ApiService('discharge_criteria'),
  
  async getByCancerType(cancerType) {
    const { data, error } = await db.query('discharge_criteria')
      .select('*')
      .eq('cancer_type', cancerType)
      .eq('is_active', true)
      .order('criteria_name')
    
    if (error) throw error
    return data
  },

  async getByTreatmentType(treatmentType) {
    const { data, error } = await db.query('discharge_criteria')
      .select('*')
      .eq('treatment_type', treatmentType)
      .eq('is_active', true)
      .order('criteria_name')
    
    if (error) throw error
    return data
  }
}

export const palliativeProtocolService = {
  ...new ApiService('palliative_symptom_protocols'),
  
  async getByCategory(category) {
    const { data, error } = await db.query('palliative_symptom_protocols')
      .select('*')
      .eq('category', category)
      .order('title')
    
    if (error) throw error
    return data
  },

  async getBySlug(slug) {
    const { data, error } = await db.query('palliative_symptom_protocols')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (error) throw error
    return data
  }
}

export const palliativeEmergencyService = {
  ...new ApiService('palliative_emergency_guidelines'),
  
  async getByUrgency(urgency) {
    const { data, error } = await db.query('palliative_emergency_guidelines')
      .select('*')
      .eq('urgency', urgency)
      .order('title')
    
    if (error) throw error
    return data
  },

  async getBySlug(slug) {
    const { data, error } = await db.query('palliative_emergency_guidelines')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (error) throw error
    return data
  }
}

export const aiInteractionService = {
  ...new ApiService('ai_interactions'),
  
  async createInteraction(interaction) {
    // Validate user exists before creating interaction
    if (interaction.user_id) {
      const { data: user } = await db.query('users')
        .select('id')
        .eq('id', interaction.user_id)
        .single()
      
      if (!user) {
        throw new Error('Invalid user_id: User does not exist')
      }
    }
    
    return this.create(interaction)
  },

  async getByUser(userId, options = {}) {
    const { limit = 50, module_type } = options
    
    let query = db.query('ai_interactions')
      .select('*')
      .eq('user_id', userId)
    
    if (module_type) {
      query = query.eq('module_type', module_type)
    }
    
    const { data, error } = await query
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data
  }
}

export const auditService = {
  ...new ApiService('audit_log'),
  
  async createAuditEntry(entry) {
    // Validate user exists before creating audit entry
    if (entry.user_id) {
      const { data: user } = await db.query('users')
        .select('id')
        .eq('id', entry.user_id)
        .single()
      
      if (!user) {
        throw new Error('Invalid user_id: User does not exist')
      }
    }
    
    return this.create({
      ...entry,
      timestamp: new Date().toISOString()
    })
  },

  async getByUser(userId, options = {}) {
    const { limit = 100, action } = options
    
    let query = db.query('audit_log')
      .select('*')
      .eq('user_id', userId)
    
    if (action) {
      query = query.eq('action', action)
    }
    
    const { data, error } = await query
      .order('timestamp', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data
  }
}

// Export all services for easy access
export default {
  user: userService,
  admission: admissionService,
  protocol: protocolService,
  medication: medicationService,
  emergency: emergencyService,
  nccn: nccnService,
  monitoring: monitoringService,
  supportiveCare: supportiveCareService,
  discharge: dischargeService,
  palliativeProtocol: palliativeProtocolService,
  palliativeEmergency: palliativeEmergencyService,
  aiInteraction: aiInteractionService,
  audit: auditService
}
