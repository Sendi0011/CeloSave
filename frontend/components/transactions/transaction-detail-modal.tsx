'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  ExternalLink,
  Copy,
  Download,
  Edit,
  Save,
  X,
  Tag as TagIcon,
  Bookmark,
  BookmarkCheck,
} from 'lucide-react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Transaction } from '@/types/transaction';

interface TransactionDetailModalProps {
  transactionId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate?: () => void;
}

export function TransactionDetailModal({
  transactionId,
  open,
  onOpenChange,
  onUpdate,
}: TransactionDetailModalProps) {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingNotes, setEditingNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (open && transactionId) {
      fetchTransaction();
    }
  }, [open, transactionId]);

  const fetchTransaction = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/transactions/${transactionId}`);
      const data = await res.json();
      setTransaction(data.transaction);
      setNotes(data.transaction.notes || '');
      setIsBookmarked(data.transaction.isBookmarked);
    } catch (error) {
      toast.error('Failed to load transaction details');
    } finally {
      setLoading(false);
    }
  };

  const copyHash = () => {
    if (transaction) {
      navigator.clipboard.writeText(transaction.hash);
      toast.success('Transaction hash copied to clipboard');
    }
  };

  const saveNotes = async () => {
    try {
      const res = await fetch(`/api/transactions/${transactionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      });

      if (res.ok) {
        toast.success('Notes saved');
        setEditingNotes(false);
        onUpdate?.();
      }
    } catch (error) {
      toast.error('Failed to save notes');
    }
  };

  const toggleBookmark = async () => {
    try {
      const res = await fetch(`/api/transactions/${transactionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_bookmarked: !isBookmarked }),
      });

      if (res.ok) {
        setIsBookmarked(!isBookmarked);
        toast.success(isBookmarked ? 'Bookmark removed' : 'Bookmarked');
        onUpdate?.();
      }
    } catch (error) {
      toast.error('Failed to update bookmark');
    }
  };

  if (loading || !transaction) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  
}


}