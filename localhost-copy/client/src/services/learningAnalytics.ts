import { LearningSession, LearningMetrics, KnowledgeGap, LearningData, UserProgress, ONCOLOGY_TOPICS } from '../types/learning';

export class LearningAnalytics {
  private readonly STORAGE_KEY = 'oncology_learning_data';

  constructor() {
    this.initializeStorage();
  }

  private initializeStorage(): void {
    const existing = this.loadFromStorage();
    if (!existing) {
      const initialData: LearningData = {
        sessions: [],
        userProgress: {
          userId: 'user_' + Date.now(),
          totalSessions: 0,
          topicsCompleted: [],
          averageConfidence: {},
          learningStreak: 0,
          lastActiveDate: new Date(),
          preferredLearningStyle: 'visual',
          experienceLevel: 'resident'
        },
        questionEffectiveness: {},
        knowledgeGaps: [],
        lastUpdated: new Date()
      };
      this.saveToStorage(initialData);
    }
  }

  private saveToStorage(data: LearningData): void {
    data.lastUpdated = new Date();
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  private loadFromStorage(): LearningData | null {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return null;
    
    const data = JSON.parse(stored);
    // Convert date strings back to Date objects
    data.sessions = data.sessions.map((session: any) => ({
      ...session,
      timestamp: new Date(session.timestamp)
    }));
    data.userProgress.lastActiveDate = new Date(data.userProgress.lastActiveDate);
    data.lastUpdated = new Date(data.lastUpdated);
    
    return data;
  }

  trackSession(session: LearningSession): void {
    const data = this.loadFromStorage()!;
    
    // Add new session
    data.sessions.push(session);
    
    // Update user progress
    data.userProgress.totalSessions += 1;
    data.userProgress.lastActiveDate = session.timestamp;
    
    // Update topic completion and confidence levels
    session.topicsStudied.forEach(topic => {
      if (!data.userProgress.topicsCompleted.includes(topic)) {
        data.userProgress.topicsCompleted.push(topic);
      }
      
      const confidence = session.confidenceLevels[topic];
      if (confidence !== undefined) {
        // Update running average confidence for this topic
        const currentAvg = data.userProgress.averageConfidence[topic] || 0;
        const topicSessions = data.sessions.filter(s => s.topicsStudied.includes(topic)).length;
        data.userProgress.averageConfidence[topic] = (currentAvg * (topicSessions - 1) + confidence) / topicSessions;
      }
    });
    
    // Update learning streak
    data.userProgress.learningStreak = this.calculateLearningStreak(data.sessions);
    
    // Update knowledge gaps
    data.knowledgeGaps = this.identifyGaps(data);
    
    this.saveToStorage(data);
  }

  calculateMetrics(): LearningMetrics {
    const data = this.loadFromStorage()!;
    const sessions = data.sessions;
    
    if (sessions.length === 0) {
      return {
        totalStudyTime: 0,
        topicsCompleted: 0,
        averageConfidence: 0,
        learningVelocity: 0,
        streakDays: 0,
        totalSessions: 0,
        knowledgeRetention: 0
      };
    }

    // Calculate total study time
    const totalStudyTime = sessions.reduce((total, session) => total + session.duration, 0);
    
    // Calculate average confidence across all topics
    const confidenceValues = Object.values(data.userProgress.averageConfidence);
    const averageConfidence = confidenceValues.length > 0 
      ? confidenceValues.reduce((sum, conf) => sum + conf, 0) / confidenceValues.length 
      : 0;
    
    // Calculate learning velocity (topics per week)
    const weeksSinceStart = this.getWeeksSinceFirstSession(sessions);
    const learningVelocity = weeksSinceStart > 0 ? data.userProgress.topicsCompleted.length / weeksSinceStart : 0;
    
    // Calculate knowledge retention (recent sessions performance)
    const knowledgeRetention = this.calculateKnowledgeRetention(sessions);

    return {
      totalStudyTime,
      topicsCompleted: data.userProgress.topicsCompleted.length,
      averageConfidence,
      learningVelocity,
      streakDays: data.userProgress.learningStreak,
      totalSessions: sessions.length,
      knowledgeRetention
    };
  }

  identifyGaps(data?: LearningData): KnowledgeGap[] {
    const learningData = data || this.loadFromStorage()!;
    const gaps: KnowledgeGap[] = [];
    
    // Check each oncology topic
    ONCOLOGY_TOPICS.forEach(topic => {
      const averageConfidence = learningData.userProgress.averageConfidence[topic] || 0;
      const lastStudied = this.getLastStudiedDate(topic, learningData.sessions);
      
      let priority: 'high' | 'medium' | 'low' = 'low';
      let recommendedAction = 'Review when convenient';
      
      // Determine priority based on confidence and recency
      if (averageConfidence < 2) {
        priority = 'high';
        recommendedAction = 'Immediate review recommended - low confidence level';
      } else if (averageConfidence < 3.5) {
        priority = 'medium';
        recommendedAction = 'Schedule review session - moderate confidence';
      }
      
      // Increase priority if not studied recently
      const daysSinceStudied = lastStudied ? this.getDaysSince(lastStudied) : Infinity;
      if (daysSinceStudied > 14 && averageConfidence < 4) {
        priority = priority === 'low' ? 'medium' : 'high';
        recommendedAction = 'Knowledge may be fading - refresher needed';
      }
      
      // Only add as gap if there's a concern
      if (averageConfidence < 3.5 || daysSinceStudied > 21) {
        gaps.push({
          topic,
          confidenceLevel: averageConfidence,
          lastStudied: lastStudied || new Date(0),
          recommendedAction,
          priority
        });
      }
    });
    
    // Sort by priority and confidence level
    return gaps.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return a.confidenceLevel - b.confidenceLevel;
    });
  }

  private calculateLearningStreak(sessions: LearningSession[]): number {
    if (sessions.length === 0) return 0;
    
    const sortedSessions = sessions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    const today = new Date();
    let streak = 0;
    let currentDate = new Date(today);
    
    // Check each day backwards from today
    for (let i = 0; i < 365; i++) { // Max 1 year streak
      const dayStart = new Date(currentDate);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(currentDate);
      dayEnd.setHours(23, 59, 59, 999);
      
      // Check if there's a session on this day
      const hasSessionOnDay = sortedSessions.some(session => 
        session.timestamp >= dayStart && session.timestamp <= dayEnd
      );
      
      if (hasSessionOnDay) {
        streak++;
      } else if (i > 0) {
        // Break streak if no session today (but allow for today being incomplete)
        break;
      }
      
      // Move to previous day
      currentDate.setDate(currentDate.getDate() - 1);
    }
    
    return streak;
  }

  private getWeeksSinceFirstSession(sessions: LearningSession[]): number {
    if (sessions.length === 0) return 0;
    
    const firstSession = sessions.reduce((earliest, session) => 
      session.timestamp < earliest.timestamp ? session : earliest
    );
    
    const daysSinceFirst = this.getDaysSince(firstSession.timestamp);
    return daysSinceFirst / 7;
  }

  private calculateKnowledgeRetention(sessions: LearningSession[]): number {
    if (sessions.length === 0) return 0;
    
    // Get recent sessions (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentSessions = sessions.filter(session => session.timestamp >= thirtyDaysAgo);
    
    if (recentSessions.length === 0) return 0;
    
    // Calculate average success rate
    const totalQuestions = recentSessions.reduce((sum, session) => sum + session.questionsAnswered, 0);
    const totalCorrect = recentSessions.reduce((sum, session) => sum + session.correctAnswers, 0);
    
    return totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;
  }

  private getLastStudiedDate(topic: string, sessions: LearningSession[]): Date | null {
    const topicSessions = sessions.filter(session => session.topicsStudied.includes(topic));
    if (topicSessions.length === 0) return null;
    
    return topicSessions.reduce((latest, session) => 
      session.timestamp > latest.timestamp ? session : latest
    ).timestamp;
  }

  private getDaysSince(date: Date): number {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  getTopicProgress(): { [topic: string]: { confidence: number; lastStudied: Date | null; sessionsCount: number } } {
    const data = this.loadFromStorage()!;
    const progress: { [topic: string]: { confidence: number; lastStudied: Date | null; sessionsCount: number } } = {};
    
    ONCOLOGY_TOPICS.forEach(topic => {
      const topicSessions = data.sessions.filter(session => session.topicsStudied.includes(topic));
      progress[topic] = {
        confidence: data.userProgress.averageConfidence[topic] || 0,
        lastStudied: this.getLastStudiedDate(topic, data.sessions),
        sessionsCount: topicSessions.length
      };
    });
    
    return progress;
  }

  getRecentSessions(limit: number = 10): LearningSession[] {
    const data = this.loadFromStorage()!;
    return data.sessions
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  getSessionsByTopic(topic: string): LearningSession[] {
    const data = this.loadFromStorage()!;
    return data.sessions
      .filter(session => session.topicsStudied.includes(topic))
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  updateUserPreferences(preferences: Partial<UserProgress>): void {
    const data = this.loadFromStorage()!;
    data.userProgress = { ...data.userProgress, ...preferences };
    this.saveToStorage(data);
  }

  exportLearningData(): LearningData {
    return this.loadFromStorage()!;
  }

  importLearningData(importedData: LearningData): void {
    this.saveToStorage(importedData);
  }

  clearAllData(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.initializeStorage();
  }
}