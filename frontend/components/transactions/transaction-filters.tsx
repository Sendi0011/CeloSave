'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Filter, X, Calendar } from 'lucide-react';
import { DateRangePicker } from './date-range-picker';
import type { FilterOptions, TransactionType, TransactionStatus, TransactionCategory, DatePreset } from '@/types/transaction';

interface TransactionFiltersProps {
  filters: FilterOptions;
  onChange: (filters: FilterOptions) => void;
}

const TRANSACTION_TYPES: TransactionType[] = [
  'CONTRIBUTION',
  'PAYOUT',
  'WITHDRAWAL',
  'EMERGENCY',
  'FEE',
  'REFUND',
  'TRANSFER',
];

const TRANSACTION_STATUSES: TransactionStatus[] = [
  'PENDING',
  'PROCESSING',
  'COMPLETED',
  'FAILED',
  'CANCELLED',
  'REVERTED',
];

const TRANSACTION_CATEGORIES: TransactionCategory[] = [
  'SAVINGS',
  'EMERGENCY',
  'WITHDRAWAL',
  'INVESTMENT',
  'FEE',
  'OTHER',
];

