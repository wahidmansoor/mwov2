import { supabase, db } from '../lib/supabase.js'

// Generic API service class
class ApiService {
  constructor(tableName) {
    this.tableName = tableName
    this.table = db.query(tableName)
  }

  // CRUD operations
  async getAll(options = {}) {
    const { columns = '*', filter, orderBy, limit } = options
    
    let query = this.table.select(columns)
    
    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        query = query.eq(key, value)
      })
    }
    
    if (orderBy) {
      query = query.order(orderBy.column, { ascending: orderBy.ascending ?? true })
    }
    
    if (limit) {
      query = query.limit(limit)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data
  }

  async getById(id, columns = '*') {
    const { data, error } = await this.table
      .select(columns)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  }

  async create(item) {
    const { data, error } = await this.table
      .insert(item)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  async update(id, updates) {
    const { data, error } = await this.table
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  async delete(id) {
    const { error } = await this.table
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  }

  async search(column, value, options = {}) {
    const { columns = '*', limit = 50 } = options
    
    const { data, error } = await this.table
      .select(columns)
      .ilike(column, `%${value}%`)
      .limit(limit)
    
    if (error) throw error
    return data
  }
}

// Specific services for existing tables in the schema
export const admissionService = {
  ...new ApiService('admission_criteria'),
  
  async getByCancerType(cancerType) {
    const { data, error } = await db.query('admission_criteria')
      .select('*')
      .eq('cancer_type', cancerType)
      .eq('is_active', true)
    
    if (error) throw error
    return data
  },

  async getByAdmissionType(admissionType) {
    const { data, error } = await db.query('admission_criteria')
      .select('*')
      .eq('admission_type', admissionType)
      .eq('is_active', true)
    
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
  }
}

export const diagnosisService = {
  ...new ApiService('diagnoses'),
  
  async getByPatient(patientId) {
    const { data, error } = await db.query('diagnoses')
      .select('*')
      .eq('patient_id', patientId)
      .order('diagnosis_date', { ascending: false })
    
    if (error) throw error
    return data
  }
}

export const treatmentPlanService = {
  ...new ApiService('treatment_plans'),
  
  async getByPatient(patientId) {
    const { data, error } = await db.query('treatment_plans')
      .select(`
        *,
        diagnoses (*)
      `)
      .eq('patient_id', patientId)
      .order('start_date', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getActivePlans() {
    const { data, error } = await db.query('treatment_plans')
      .select(`
        *,
        patients (*),
        diagnoses (*)
      `)
      .eq('status', 'active')
      .order('start_date')
    
    if (error) throw error
    return data
  }
}

export const treatmentSessionService = {
  ...new ApiService('treatment_sessions'),
  
  async getByTreatmentPlan(treatmentPlanId) {
    const { data, error } = await db.query('treatment_sessions')
      .select('*')
      .eq('treatment_plan_id', treatmentPlanId)
      .order('scheduled_date')
    
    if (error) throw error
    return data
  },

  async getUpcoming(limit = 10) {
    const today = new Date().toISOString()
    const { data, error } = await db.query('treatment_sessions')
      .select(`
        *,
        treatment_plans (
          *,
          patients (*)
        )
      `)
      .gte('scheduled_date', today)
      .order('scheduled_date')
      .limit(limit)
    
    if (error) throw error
    return data
  }
}

export const medicationService = {
  ...new ApiService('medications'),
  
  async searchByName(searchTerm) {
    const { data, error } = await db.query('medications')
      .select('*')
      .or(`name.ilike.%${searchTerm}%,generic_name.ilike.%${searchTerm}%`)
      .eq('is_active', true)
      .order('name')
    
    if (error) throw error
    return data
  },

  async getByCategory(category) {
    const { data, error } = await db.query('medications')
      .select('*')
      .eq('category', category)
      .eq('is_active', true)
      .order('name')
    
    if (error) throw error
    return data
  }
}

export const labResultService = {
  ...new ApiService('lab_results'),
  
  async getByPatient(patientId, options = {}) {
    const { limit = 50, testName } = options
    
    let query = db.query('lab_results')
      .select('*')
      .eq('patient_id', patientId)
    
    if (testName) {
      query = query.eq('test_name', testName)
    }
    
    const { data, error } = await query
      .order('test_date', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data
  },

  async getAbnormalResults(patientId) {
    const { data, error } = await db.query('lab_results')
      .select('*')
      .eq('patient_id', patientId)
      .eq('is_abnormal', true)
      .order('test_date', { ascending: false })
    
    if (error) throw error
    return data
  }
}

export const appointmentService = {
  ...new ApiService('appointments'),
  
  async getByPatient(patientId) {
    const { data, error } = await db.query('appointments')
      .select('*')
      .eq('patient_id', patientId)
      .order('scheduled_date')
    
    if (error) throw error
    return data
  },

  async getTodaysAppointments() {
    const today = new Date()
    const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString()
    const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString()
    
    const { data, error } = await db.query('appointments')
      .select(`
        *,
        patients (*)
      `)
      .gte('scheduled_date', startOfDay)
      .lte('scheduled_date', endOfDay)
      .order('scheduled_date')
    
    if (error) throw error
    return data
  }
}

export const clinicalNotesService = {
  ...new ApiService('clinical_notes'),
  
  async getByPatient(patientId) {
    const { data, error } = await db.query('clinical_notes')
      .select('*')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }
}

export const educationalContentService = {
  ...new ApiService('educational_content'),
  
  async getPublished(options = {}) {
    const { category, limit = 20 } = options
    
    let query = db.query('educational_content')
      .select('*')
      .eq('is_published', true)
    
    if (category) {
      query = query.eq('category', category)
    }
    
    const { data, error } = await query
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data
  },

  async searchContent(searchTerm) {
    const { data, error } = await db.query('educational_content')
      .select('*')
      .eq('is_published', true)
      .or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%,tags.cs.["${searchTerm}"]`)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }
}

export default {
  patient: patientService,
  diagnosis: diagnosisService,
  treatmentPlan: treatmentPlanService,
  treatmentSession: treatmentSessionService,
  medication: medicationService,
  labResult: labResultService,
  appointment: appointmentService,
  clinicalNotes: clinicalNotesService,
  educationalContent: educationalContentService
}
