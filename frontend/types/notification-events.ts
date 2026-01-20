export interface NotificationEvent {
    id: string;
    notificationId: string;
    eventType: NotificationEventType;
    userAddress: string;
    timestamp: string;
    metadata: Record<string, any>;
  }
  
  