"use client"

import { useState, useRef, useEffect } from 'react'
import { Client, Conversation } from '@xmtp/xmtp-js'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send, Paperclip, Smile, BarChart3 } from 'lucide-react'
import { toast } from 'sonner'
import { useAccount } from 'wagmi'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface ChatInputProps {
  poolId: string
  memberAddresses: string[]
  client: Client
}

export function ChatInput({ poolId, memberAddresses, client }: ChatInputProps) {
  const { address } = useAccount()
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [showMentions, setShowMentions] = useState(false)
  const [mentionSearch, setMentionSearch] = useState('')
  const [mentionPosition, setMentionPosition] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const conversationTopic = `ajo-pool-${poolId}`

  // Handle @mentions
  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    const handleInput = () => {
      const cursorPos = textarea.selectionStart
      const textBeforeCursor = message.slice(0, cursorPos)
      const lastAtSymbol = textBeforeCursor.lastIndexOf('@')

      if (lastAtSymbol !== -1 && lastAtSymbol === cursorPos - 1) {
        setShowMentions(true)
        setMentionSearch('')
        setMentionPosition(lastAtSymbol)
      } else if (lastAtSymbol !== -1) {
        const searchTerm = textBeforeCursor.slice(lastAtSymbol + 1)
        if (!searchTerm.includes(' ')) {
          setShowMentions(true)
          setMentionSearch(searchTerm.toLowerCase())
          setMentionPosition(lastAtSymbol)
        } else {
          setShowMentions(false)
        }
      } else {
        setShowMentions(false)
      }
    }

    handleInput()
  }, [message])

  const filteredMembers = memberAddresses.filter(addr => 
    addr.toLowerCase().includes(mentionSearch) &&
    addr.toLowerCase() !== address?.toLowerCase()
  )

  