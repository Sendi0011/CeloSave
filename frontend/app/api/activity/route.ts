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

// POST - Create activity (called after blockchain events)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      poolId,
      activityType,
      userAddress,
      amount,
      description,
      txHash,
    } = body

    // Validate required fields
    if (!poolId || !activityType) {
      return NextResponse.json(
        { error: 'poolId and activityType are required' },
        { status: 400 }
      )
    }

    // Insert activity
    const { data, error } = await supabase
      .from('pool_activity')
      .insert([
        {
          pool_id: poolId,
          activity_type: activityType,
          user_address: userAddress?.toLowerCase() || null,
          amount: amount || null,
          description: description || null,
          tx_hash: txHash || null,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Activity creation error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

   