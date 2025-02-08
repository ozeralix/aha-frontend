export interface HealthData {
    userId: string;
    metrics: {
      steps: number;
      heartRate: number;
      sleepHours: number;
      glucoseLevel?: number;
    };
    timestamp: Date;
  }
  
  export interface UserProfile {
    id: string;
    name: string;
    healthGoals: string[];
    connectedDevices: string[];
  }
  
  export interface HealthInsight {
    id: string;
    message: string;
    type: 'recommendation' | 'alert' | 'achievement';
    timestamp: Date;
  }