import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userAddress = searchParams.get('userAddress')

    if (!userAddress) {
      return NextResponse.json(
        { error: 'userAddress is required' },
        { status: 400 }
      )
    }

    // Fetch user's pools with payment information
    const { data: poolMembers, error: poolError } = await supabase
      .from('pool_members')
      .select(`
        *,
        pools (
          id,
          name,
          type,
          status,
          contribution_amount,
          round_duration,
          frequency,
          deadline,
          next_payout,
          created_at
        )
      `)
      .eq('member_address', userAddress.toLowerCase())

    if (poolError) throw poolError

    // Fetch user's payment activities
    const { data: activities, error: activitiesError } = await supabase
      .from('pool_activity')
      .select('*')
      .eq('user_address', userAddress.toLowerCase())
      .in('activity_type', ['deposit', 'contribution'])

    if (activitiesError) throw activitiesError

    const payments: any[] = []
    const now = new Date()

    
}