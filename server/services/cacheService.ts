/**
 * Redis Caching Service for OPD Module
 * Implements intelligent caching for AI responses and clinical data
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
  version: string;
}

interface CacheOptions {
  ttl?: number; // Time to live in seconds
  version?: string;
  tags?: string[];
}

export class CacheService {
  private memoryCache = new Map<string, CacheEntry<any>>();
  private defaultTTL = 3600; // 1 hour default

  constructor() {
    // Clean up expired entries every 5 minutes
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  async set<T>(key: string, data: T, options: CacheOptions = {}): Promise<void> {
    const ttl = options.ttl || this.defaultTTL;
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + (ttl * 1000),
      version: options.version || '1.0'
    };

    this.memoryCache.set(key, entry);
  }

  async get<T>(key: string): Promise<T | null> {
    const entry = this.memoryCache.get(key);
    
    if (!entry) return null;
    
    if (Date.now() > entry.expiresAt) {
      this.memoryCache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  async has(key: string): Promise<boolean> {
    const entry = this.memoryCache.get(key);
    return entry !== undefined && Date.now() <= entry.expiresAt;
  }

  async delete(key: string): Promise<void> {
    this.memoryCache.delete(key);
  }

  async invalidateByPattern(pattern: string): Promise<void> {
    const regex = new RegExp(pattern.replace(/\*/g, '.*'));
    const keysToDelete: string[] = [];

    for (const key of Array.from(this.memoryCache.keys())) {
      if (regex.test(key)) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach(key => this.memoryCache.delete(key));
  }

  async clear(): Promise<void> {
    this.memoryCache.clear();
  }

  private cleanup(): void {
    const now = Date.now();
    const expiredKeys: string[] = [];

    for (const [key, entry] of Array.from(this.memoryCache.entries())) {
      if (now > entry.expiresAt) {
        expiredKeys.push(key);
      }
    }

    expiredKeys.forEach(key => this.memoryCache.delete(key));
  }

  // AI-specific caching methods
  async cacheAIResponse(prompt: string, context: any, response: any, confidence: number): Promise<string> {
    const cacheKey = this.generateAICacheKey(prompt, context);
    const ttl = this.getAICacheTTL(confidence);
    
    await this.set(cacheKey, {
      response,
      confidence,
      context,
      cachedAt: new Date().toISOString()
    }, { ttl });

    return cacheKey;
  }

  async getCachedAIResponse(prompt: string, context: any): Promise<any | null> {
    const cacheKey = this.generateAICacheKey(prompt, context);
    return await this.get(cacheKey);
  }

  // Risk assessment caching
  async cacheRiskAssessment(patientProfile: any, cancerType: string, result: any): Promise<void> {
    const cacheKey = this.generateRiskCacheKey(patientProfile, cancerType);
    await this.set(cacheKey, result, { ttl: 1800 }); // 30 minutes
  }

  async getCachedRiskAssessment(patientProfile: any, cancerType: string): Promise<any | null> {
    const cacheKey = this.generateRiskCacheKey(patientProfile, cancerType);
    return await this.get(cacheKey);
  }

  // NCCN guidelines caching
  async cacheNCCNGuidelines(cancerType: string, version: string, guidelines: any): Promise<void> {
    const cacheKey = `nccn:${cancerType}:${version}`;
    await this.set(cacheKey, guidelines, { ttl: 7 * 24 * 3600, version }); // 7 days
  }

  async getCachedNCCNGuidelines(cancerType: string, version: string): Promise<any | null> {
    const cacheKey = `nccn:${cancerType}:${version}`;
    return await this.get(cacheKey);
  }

  private generateAICacheKey(prompt: string, context: any): string {
    const contextHash = this.hashObject(context);
    const promptHash = this.hashString(prompt);
    return `ai:${promptHash}:${contextHash}`;
  }

  private generateRiskCacheKey(patientProfile: any, cancerType: string): string {
    const profileHash = this.hashObject({
      age: patientProfile.demographics?.age,
      gender: patientProfile.demographics?.gender,
      familyHistory: patientProfile.familyHistory,
      lifestyle: patientProfile.lifestyle,
      genetic: patientProfile.genetic
    });
    return `risk:${cancerType}:${profileHash}`;
  }

  private getAICacheTTL(confidence: number): number {
    // Higher confidence = longer cache time
    if (confidence >= 90) return 4 * 3600; // 4 hours
    if (confidence >= 80) return 2 * 3600; // 2 hours
    if (confidence >= 70) return 1 * 3600; // 1 hour
    return 30 * 60; // 30 minutes for low confidence
  }

  private hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  private hashObject(obj: any): string {
    return this.hashString(JSON.stringify(obj, Object.keys(obj).sort()));
  }

  // Cache statistics
  getStats() {
    const now = Date.now();
    let activeEntries = 0;
    let expiredEntries = 0;
    let totalSize = 0;

    for (const [key, entry] of Array.from(this.memoryCache.entries())) {
      if (now <= entry.expiresAt) {
        activeEntries++;
      } else {
        expiredEntries++;
      }
      totalSize += JSON.stringify(entry).length;
    }

    return {
      activeEntries,
      expiredEntries,
      totalEntries: this.memoryCache.size,
      approximateSize: totalSize,
      hitRate: this.calculateHitRate()
    };
  }

  private hits = 0;
  private misses = 0;

  private calculateHitRate(): number {
    const total = this.hits + this.misses;
    return total === 0 ? 0 : (this.hits / total) * 100;
  }

  // Override get method to track hit/miss stats
  async getWithStats<T>(key: string): Promise<T | null> {
    const result = await this.get<T>(key);
    if (result !== null) {
      this.hits++;
    } else {
      this.misses++;
    }
    return result;
  }
}

export const cacheService = new CacheService();