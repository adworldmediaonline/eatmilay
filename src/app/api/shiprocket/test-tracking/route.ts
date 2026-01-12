import { NextRequest, NextResponse } from 'next/server';
import { shiprocketClient } from '@/lib/shiprocket/shiprocket-client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const shipmentId = searchParams.get('shipmentId');

    if (!shipmentId) {
      return NextResponse.json(
        { error: 'Shipment ID is required' },
        { status: 400 }
      );
    }

    // Parse shipment ID as number
    const shipmentIdNum = parseInt(shipmentId, 10);
    if (isNaN(shipmentIdNum)) {
      return NextResponse.json(
        { error: 'Invalid shipment ID. Must be a number.' },
        { status: 400 }
      );
    }

    console.log('Testing Shiprocket tracking for shipment ID:', shipmentIdNum);

    // Call Shiprocket tracking API
    const trackingResponse = await shiprocketClient.trackOrder(
      null, // AWB code
      shipmentIdNum, // shipment_id
      undefined, // channel_order_id
      undefined // channel_id
    );

    console.log('Shiprocket tracking response:', JSON.stringify(trackingResponse, null, 2));

    return NextResponse.json({
      success: true,
      data: trackingResponse.data,
      message: 'Tracking data fetched successfully',
    });
  } catch (error) {
    console.error('Shiprocket tracking test error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch tracking data';

    return NextResponse.json(
      {
        error: errorMessage,
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
