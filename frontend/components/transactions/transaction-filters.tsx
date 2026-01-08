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

export function TransactionFilters({ filters, onChange }: TransactionFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const activeFilterCount = [
    filters.type?.length,
    filters.status?.length,
    filters.category?.length,
    filters.dateRange ? 1 : 0,
    filters.isBookmarked ? 1 : 0,
  ].filter(Boolean).length;

  const handleTypeToggle = (type: TransactionType) => {
    const currentTypes = filters.type || [];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter((t) => t !== type)
      : [...currentTypes, type];

    onChange({
      ...filters,
      type: newTypes.length > 0 ? newTypes : undefined,
    });
  };

  const handleStatusToggle = (status: TransactionStatus) => {
    const currentStatuses = filters.status || [];
    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter((s) => s !== status)
      : [...currentStatuses, status];

    onChange({
      ...filters,
      status: newStatuses.length > 0 ? newStatuses : undefined,
    });
  };

  const handleCategoryToggle = (category: TransactionCategory) => {
    const currentCategories = filters.category || [];
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter((c) => c !== category)
      : [...currentCategories, category];

    onChange({
      ...filters,
      category: newCategories.length > 0 ? newCategories : undefined,
    });
  };

  const clearFilters = () => {
    onChange({});
  };

  
}