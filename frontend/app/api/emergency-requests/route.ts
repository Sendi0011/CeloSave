import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

// POST - Create emergency request
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      poolId,
      requestId,
      requesterAddress,
      amount,
      reason,
      votingDeadline,
      txHash,
    } = body

    // Validate required fields
    if (!poolId || requestId === undefined || !requesterAddress || !amount || !reason) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Insert emergency request
    const { data, error } = await supabase
      .from('emergency_requests')
      .insert([
        {
          pool_id: poolId,
          request_id: requestId,
          requester_address: requesterAddress.toLowerCase(),
          amount: parseFloat(amount),
          reason,
          voting_deadline: votingDeadline || new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          tx_hash: txHash,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Failed to create emergency request:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    // Log activity
    await supabase.from('pool_activity').insert([
      {
        pool_id: poolId,
        activity_type: 'emergency_requested',
        user_address: requesterAddress.toLowerCase(),
        amount: parseFloat(amount),
        description: `Emergency withdrawal requested: ${reason.substring(0, 100)}`,
        tx_hash: txHash,
      },
    ])

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Emergency request creation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

