import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

// GET - Fetch activity feed
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const poolId = searchParams.get('poolId')
    const userAddress = searchParams.get('userAddress')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = supabase
      .from('pool_activity')
      .select(`
        *,
        pools (
          id,
          name,
          type
        )
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    // Filter by pool
    if (poolId) {
      query = query.eq('pool_id', poolId)
    }

    // Filter by user
    if (userAddress) {
      query = query.eq('user_address', userAddress.toLowerCase())
    }

    const { data, error } = await query

    if (error) {
      console.error('Activity fetch error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Activity fetch error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

