import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

// POST - Cast a vote
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { poll_id, option_id, voter_address } = body

    if (!poll_id || !option_id || !voter_address) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    
}

