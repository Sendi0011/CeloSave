"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { QrCode, Copy, Share2, Check, Calendar, Users, Link2 } from "lucide-react"
import { toast } from "sonner"
import { useAccount } from "wagmi"

interface QRInviteDialogProps {
  poolId: string
  poolName: string
}

