// app/api/notifications/route.ts
import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

// GET - Fetch user notifications
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userAddress = searchParams.get('userAddress')
    const unreadOnly = searchParams.get('unreadOnly') === 'true'
    const limit = parseInt(searchParams.get('limit') || '50')

    if (!userAddress) {
      return NextResponse.json(
        { error: 'userAddress is required' },
        { status: 400 }
      )
    }

    let query = supabase
      .from('notifications')
      .select(`
        *,
        pools (
          id,
          name,
          type
        )
      `)
      .eq('user_address', userAddress.toLowerCase())
      .order('created_at', { ascending: false })
      .limit(limit)

    if (unreadOnly) {
      query = query.eq('read', false)
    }

    const { data, error } = await query

    if (error) {
      console.error('Notifications fetch error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Notifications fetch error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

