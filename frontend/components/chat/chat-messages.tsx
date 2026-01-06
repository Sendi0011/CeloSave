"use client"

import { useEffect, useState, useRef } from 'react'
import { Client, Conversation } from '@xmtp/xmtp-js'
import { useAccount } from 'wagmi'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChatMessage as ChatMessageComponent } from './chat-message'
import { Loader2 } from 'lucide-react'
import type { ChatMessage as ChatMessageType } from '@/types/chat'

interface ChatMessagesProps {
  poolId: string
  poolName: string
  memberAddresses: string[]
  client: Client
}

