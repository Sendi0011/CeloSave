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

export function ChatMessage({ message, isOwnMessage, showAvatar, poolId }: ChatMessageProps) {
  const [showActions, setShowActions] = useState(false)

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const handlePinMessage = async () => {
    try {
      const response = await fetch('/api/chat/pins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pool_id: poolId,
          message_id: message.id,
          message_content: message.content,
          message_sender: message.senderAddress,
        }),
      })

      if (response.ok) {
        toast.success('Message pinned!')
      } else {
        toast.error('Failed to pin message')
      }
    } catch (error) {
      console.error('Failed to pin message:', error)
      toast.error('Failed to pin message')
    }
  }

  const handleReaction = (emoji: string) => {
    toast.success(`Reacted with ${emoji}`)
    // In production, store reactions in database or XMTP metadata
  }

  
}