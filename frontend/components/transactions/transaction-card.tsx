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

