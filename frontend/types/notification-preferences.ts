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
  
  