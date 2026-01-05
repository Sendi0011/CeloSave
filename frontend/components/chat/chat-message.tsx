"use client"

import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { MoreVertical, Pin, Reply, ThumbsUp, Smile } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ChatMessage as ChatMessageType } from '@/types/chat'
import { toast } from 'sonner'

interface ChatMessageProps {
  message: ChatMessageType
  isOwnMessage: boolean
  showAvatar: boolean
  poolId: string
}

