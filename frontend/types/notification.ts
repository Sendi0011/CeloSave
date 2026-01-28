export type NotificationType = 
  | 'PAYMENT_REMINDER'      // Upcoming payment due
  | 'PAYMENT_DUE'          // Payment due today
  | 'PAYMENT_OVERDUE'      // Payment is overdue
  | 'PAYMENT_RECEIVED'     // Payment was received
  | 'PAYOUT_READY'         // User is next for payout
  | 'PAYOUT_RECEIVED'      // Payout was received
  | 'POOL_INVITE'          // Invited to join pool
  | 'MEMBER_JOINED'        // New member joined pool
  | 'MEMBER_LEFT'          // Member left pool
  | 'EMERGENCY_REQUEST'    // Emergency withdrawal request
  | 'EMERGENCY_APPROVED'   // Emergency request approved
  | 'BADGE_EARNED'         // Achievement unlocked
  | 'REPUTATION_UP'        // Reputation increased
  | 'REPUTATION_DOWN'      // Reputation decreased
  | 'MILESTONE_REACHED'    // Pool milestone achieved
  | 'POOL_COMPLETED'       // Pool goal completed
  | 'ANNOUNCEMENT'         // Pool announcement
  | 'SYSTEM_UPDATE'        // System/platform update
  | 'VERIFICATION_NEEDED'  // KYC/verification required
  | 'DISPUTE_RAISED'       // Transaction dispute
  | 'POLL_CREATED'         // New poll in pool
  | 'POLL_CLOSING';        // Poll closing soon

