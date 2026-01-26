export interface NotificationPreferences {
    id: string;
    userId: string;
    userAddress: string;
    email: EmailPreferences;
    push: PushPreferences;
    inApp: InAppPreferences;
    schedule: SchedulePreferences;
    types: NotificationTypePreferences;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface EmailPreferences {
    enabled: boolean;
    address?: string;
    verified: boolean;
    digest: DigestFrequency;
    digestTime: string; // HH:MM format (24h)
    digestDays?: number[]; // 0-6 for weekly digest
  }
  
  