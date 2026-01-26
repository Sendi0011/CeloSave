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
  
  export interface PushPreferences {
    enabled: boolean;
    subscription?: PushSubscription;
    deviceTokens: string[];
  }
  
  export interface InAppPreferences {
    enabled: boolean;
    showBadge: boolean;
    playSound: boolean;
    soundFile?: string;
    showPreview: boolean;
    groupSimilar: boolean;
    autoMarkReadAfter?: number; // seconds
  }
  
 