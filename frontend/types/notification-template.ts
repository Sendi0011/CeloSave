export interface NotificationTemplate {
    id: string;
    key: string; 
    name: string;
    description: string;
    type: NotificationType;
    titleTemplate: string;
    messageTemplate: string;
    defaultChannels: NotificationChannel[];
    defaultPriority: NotificationPriority;
    variables: TemplateVariable[];
    actionUrl?: string;
    actionLabel?: string;
    icon?: string;
    color?: string;
    expiresAfter?: number; 
    metadata: Record<string, any>;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  