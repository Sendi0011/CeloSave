'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import type { ExportOptions, ExportFormat } from '@/types/export';

interface UseTransactionExportReturn {
  exporting: boolean;
  exportCSV: (options: ExportOptions) => Promise<void>;
  exportPDF: (options: ExportOptions) => Promise<void>;
  exportJSON: (options: ExportOptions) => Promise<void>;
}

