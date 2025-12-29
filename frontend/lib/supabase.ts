import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      pools: {
        Row: {
          id: string
          name: string
          description: string | null
          type: 'rotational' | 'target' | 'flexible'
          status: 'active' | 'completed' | 'paused'
          creator_address: string
          contract_address: string
          token_address: string
          total_saved: number
          target_amount: number | null
          progress: number
          members_count: number
          next_payout: string | null
          next_recipient: string | null
          created_at: string
          updated_at: string
          contribution_amount: number | null
          round_duration: number | null
          frequency: string | null
          deadline: string | null
          minimum_deposit: number | null
          withdrawal_fee: number | null
          yield_enabled: boolean
        }
        Insert: {
          name: string
          description?: string | null
          type: 'rotational' | 'target' | 'flexible'
          status?: 'active' | 'completed' | 'paused'
          creator_address: string
          contract_address: string
          token_address: string
          total_saved?: number
          target_amount?: number | null
          progress?: number
          members_count?: number
          next_payout?: string | null
          next_recipient?: string | null
          contribution_amount?: number | null
          round_duration?: number | null
          frequency?: string | null
          deadline?: string | null
          minimum_deposit?: number | null
          withdrawal_fee?: number | null
          yield_enabled?: boolean
        }
        Update: {
          name?: string
          description?: string | null
          type?: 'rotational' | 'target' | 'flexible'
          status?: 'active' | 'completed' | 'paused'
          creator_address?: string
          contract_address?: string
          token_address?: string
          total_saved?: number
          target_amount?: number | null
          progress?: number
          members_count?: number
          next_payout?: string | null
          next_recipient?: string | null
          contribution_amount?: number | null
          round_duration?: number | null
          frequency?: string | null
          deadline?: string | null
          minimum_deposit?: number | null
          withdrawal_fee?: number | null
          yield_enabled?: boolean
        }
      }
      pool_members: {
        Row: {
          id: string
          pool_id: string
          member_address: string
          contribution_amount: number
          status: 'pending' | 'paid' | 'late'
          joined_at: string
          invited_by: string | null
          invite_id: string | null
        }
        Insert: {
          pool_id: string
          member_address: string
          contribution_amount?: number
          status?: 'pending' | 'paid' | 'late'
          invited_by?: string | null
          invite_id?: string | null
        }
        Update: {
          pool_id?: string
          member_address?: string
          contribution_amount?: number
          status?: 'pending' | 'paid' | 'late'
          invited_by?: string | null
          invite_id?: string | null
        }
      }
      pool_activity: {
        Row: {
          id: string
          pool_id: string
          activity_type: string
          user_address: string | null
          amount: number | null
          description: string | null
          tx_hash: string | null
          created_at: string
        }
        Insert: {
          pool_id: string
          activity_type: string
          user_address?: string | null
          amount?: number | null
          description?: string | null
          tx_hash?: string | null
        }
        Update: {
          pool_id?: string
          activity_type?: string
          user_address?: string | null
          amount?: number | null
          description?: string | null
          tx_hash?: string | null
        }
      }
      member_profiles: {
        Row: {
          id: string
          wallet_address: string
          display_name: string | null
          bio: string | null
          avatar_url: string | null
          reputation_score: number
          total_groups_joined: number
          active_groups: number
          completed_groups: number
          total_contributions: number
          on_time_payments: number
          late_payments: number
          missed_payments: number
          verified_phone: boolean
          verified_email: boolean
          kyc_verified: boolean
          created_at: string
          updated_at: string
          last_active_at: string
        }
        Insert: {
          wallet_address: string
          display_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          reputation_score?: number
          total_groups_joined?: number
          active_groups?: number
          completed_groups?: number
          total_contributions?: number
          on_time_payments?: number
          late_payments?: number
          missed_payments?: number
          verified_phone?: boolean
          verified_email?: boolean
          kyc_verified?: boolean
        }
        Update: {
          display_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          reputation_score?: number
          total_groups_joined?: number
          active_groups?: number
          completed_groups?: number
          total_contributions?: number
          on_time_payments?: number
          late_payments?: number
          missed_payments?: number
          verified_phone?: boolean
          verified_email?: boolean
          kyc_verified?: boolean
        }
      }
      reputation_history: {
        Row: {
          id: string
          wallet_address: string
          pool_id: string | null
          action_type: string
          points_change: number
          previous_score: number
          new_score: number
          description: string | null
          created_at: string
        }
        Insert: {
          wallet_address: string
          pool_id?: string | null
          action_type: string
          points_change: number
          previous_score: number
          new_score: number
          description?: string | null
        }
        Update: {
          wallet_address?: string
          pool_id?: string | null
          action_type?: string
          points_change?: number
          previous_score?: number
          new_score?: number
          description?: string | null
        }
      }
      member_badges: {
        Row: {
          id: string
          wallet_address: string
          badge_type: string
          badge_name: string
          badge_description: string | null
          badge_icon: string | null
          earned_at: string
        }
        Insert: {
          wallet_address: string
          badge_type: string
          badge_name: string
          badge_description?: string | null
          badge_icon?: string | null
        }
        Update: {
          badge_type?: string
          badge_name?: string
          badge_description?: string | null
          badge_icon?: string | null
        }
      }
      group_invites: {
        Row: {
          id: string
          pool_id: string
          invite_code: string
          inviter_address: string
          max_uses: number | null
          uses_count: number
          expires_at: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          pool_id: string
          invite_code: string
          inviter_address: string
          max_uses?: number | null
          uses_count?: number
          expires_at?: string | null
          is_active?: boolean
        }
        Update: {
          pool_id?: string
          invite_code?: string
          inviter_address?: string
          max_uses?: number | null
          uses_count?: number
          expires_at?: string | null
          is_active?: boolean
        }
      }
      invite_uses: {
        Row: {
          id: string
          invite_id: string
          invitee_address: string
          used_at: string
        }
        Insert: {
          invite_id: string
          invitee_address: string
        }
        Update: {
          invite_id?: string
          invitee_address?: string
        }
      }
    }
  }
}

// Helper function to ensure member profile exists
export async function ensureMemberProfile(walletAddress: string) {
  const { data, error } = await supabase
    .from('member_profiles')
    .select('*')
    .eq('wallet_address', walletAddress.toLowerCase())
    .single()

  if (error && error.code === 'PGRST116') {
    // Profile doesn't exist, create it
    const { data: newProfile, error: createError } = await supabase
      .from('member_profiles')
      .insert([{ wallet_address: walletAddress.toLowerCase() }])
      .select()
      .single()

    if (createError) throw createError
    return newProfile
  }

  if (error) throw error
  return data
}

// Helper function to update reputation after payment
export async function updateReputationAfterPayment(
  walletAddress: string,
  poolId: string,
  wasOnTime: boolean
) {
  const profile = await ensureMemberProfile(walletAddress)

  const updates: any = {
    last_active_at: new Date().toISOString(),
  }

  if (wasOnTime) {
    updates.on_time_payments = (profile.on_time_payments || 0) + 1
  } else {
    updates.late_payments = (profile.late_payments || 0) + 1
  }

  const { data: updatedProfile, error } = await supabase
    .from('member_profiles')
    .update(updates)
    .eq('wallet_address', walletAddress.toLowerCase())
    .select()
    .single()

  if (error) throw error

  