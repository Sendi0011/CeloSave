import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'
import { customAlphabet } from 'nanoid'

// Create short invite codes (8 characters, URL-safe)
const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 8)

// POST - Create new invite link
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { pool_id, inviter_address, max_uses, expires_in_days } = body

    if (!pool_id || !inviter_address) {
      return NextResponse.json(
        { error: 'Missing pool_id or inviter_address' },
        { status: 400 }
      )
    }

    