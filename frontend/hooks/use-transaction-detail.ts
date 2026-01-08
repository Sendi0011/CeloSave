'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Transaction } from '@/types/transaction';

interface UseTransactionDetailParams {
  transactionId: string | null;
  autoFetch?: boolean;
}

interface UseTransactionDetailReturn {
  transaction: Transaction | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  updateTransaction: (updates: Partial<Transaction>) => Promise<void>;
}

