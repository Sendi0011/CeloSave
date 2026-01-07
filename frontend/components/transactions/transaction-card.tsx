'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ArrowUpRight,
  ArrowDownLeft,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  MoreVertical,
  FileText,
  Tag,
  MessageSquare,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TransactionDetailModal } from './transaction-detail-modal';
import type { Transaction } from '@/types/transaction';
import { formatDistanceToNow } from 'date-fns';

interface TransactionCardProps {
  transaction: Transaction;
  onUpdate?: () => void;
}

export function TransactionCard({ transaction, onUpdate }: TransactionCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(transaction.isBookmarked);
  const [showDetail, setShowDetail] = useState(false);

  const getTypeIcon = () => {
    switch (transaction.type) {
      case 'CONTRIBUTION':
      case 'PAYOUT':
        return <ArrowUpRight className="h-5 w-5" />;
      case 'WITHDRAWAL':
      case 'EMERGENCY':
        return <ArrowDownLeft className="h-5 w-5" />;
      default:
        return <ArrowUpRight className="h-5 w-5" />;
    }
  };

  const getStatusColor = () => {
    switch (transaction.status) {
      case 'COMPLETED':
        return 'bg-primary/10 text-primary';
      case 'PENDING':
      case 'PROCESSING':
        return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-500';
      case 'FAILED':
      case 'CANCELLED':
      case 'REVERTED':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeColor = () => {
    switch (transaction.type) {
      case 'CONTRIBUTION':
        return 'bg-primary/10 text-primary';
      case 'PAYOUT':
        return 'bg-accent/10 text-accent';
      case 'WITHDRAWAL':
      case 'EMERGENCY':
        return 'bg-orange-500/10 text-orange-600 dark:text-orange-500';
      case 'FEE':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const toggleBookmark = async () => {
    try {
      const response = await fetch(`/api/transactions/${transaction.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_bookmarked: !isBookmarked }),
      });

      if (response.ok) {
        setIsBookmarked(!isBookmarked);
        onUpdate?.();
      }
    } catch (error) {
      console.error('Failed to toggle bookmark:', error);
    }
  };

  
}