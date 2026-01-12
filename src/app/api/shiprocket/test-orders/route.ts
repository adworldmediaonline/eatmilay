import { NextRequest, NextResponse } from 'next/server';
import { shiprocketClient } from '@/lib/shiprocket/shiprocket-client';

export async function GET(request: NextRequest) {
  try {
    console.log('Testing Shiprocket get all orders API');

    // Call Shiprocket get all orders API
    const ordersResponse = await shiprocketClient.getAllOrders();

    console.log('Shiprocket get orders response:', JSON.stringify(ordersResponse, null, 2));

    return NextResponse.json({
      success: true,
      data: ordersResponse.data,
      message: 'Orders fetched successfully',
    });
  } catch (error) {
    console.error('Shiprocket get orders test error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch orders';

    return NextResponse.json(
      {
        error: errorMessage,
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
