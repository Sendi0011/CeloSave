import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { filters, columns } = body;
    
    // Build query with filters (similar to main route)
    let query = supabase.from('transactions').select(`
      *,
      pools:pool_id (name, type),
      member_profiles!transactions_user_address_fkey (display_name)
    `);
    
    // Apply filters
    if (filters?.poolId) query = query.in('pool_id', filters.poolId);
    if (filters?.type) query = query.in('transaction_type', filters.type);
    if (filters?.status) query = query.in('transaction_status', filters.status);
    if (filters?.startDate) query = query.gte('timestamp', filters.startDate);
    if (filters?.endDate) query = query.lte('timestamp', filters.endDate);
    if (filters?.userAddress) {
      query = query.eq('user_address', filters.userAddress.toLowerCase());
    }
    
    const { data, error } = await query.order('timestamp', { ascending: false });
    
    if (error) throw error;
    
    // Define available columns
    const availableColumns = [
      { key: 'timestamp', label: 'Date' },
      { key: 'type', label: 'Type' },
      { key: 'status', label: 'Status' },
      { key: 'category', label: 'Category' },
      { key: 'amount', label: 'Amount' },
      { key: 'currency', label: 'Currency' },
      { key: 'poolName', label: 'Pool' },
      { key: 'description', label: 'Description' },
      { key: 'hash', label: 'Transaction Hash' },
      { key: 'blockNumber', label: 'Block Number' },
      { key: 'gasFee', label: 'Gas Fee' },
      { key: 'userAddress', label: 'User Address' },
      { key: 'userName', label: 'User Name' },
    ];
    
    // Use provided columns or all columns
    const selectedColumns = columns && columns.length > 0 
      ? columns.filter((c: any) => c.enabled)
      : availableColumns;
    
    // Generate CSV headers
    const headers = selectedColumns.map((col: any) => col.label).join(',');
    
    
    
    const csv = [headers, ...rows].join('\n');
    
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="transactions-${Date.now()}.csv"`,
      },
    });
  } catch (error) {
    console.error('CSV export error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}