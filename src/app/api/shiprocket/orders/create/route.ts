import { NextRequest, NextResponse } from 'next/server';
import { createShiprocketOrder } from '@/app/actions/shiprocket';
import { z } from 'zod';

const createShiprocketOrderSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
  pickupLocation: z.string().max(100).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request data
    const validatedData = createShiprocketOrderSchema.parse(body);
    const { orderId, pickupLocation } = validatedData;

    // Create Shiprocket order
    const result = await createShiprocketOrder({
      orderId,
      pickupLocation,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    console.error('Shiprocket order creation error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message || 'Invalid request data' },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: 'Failed to create Shiprocket order' },
      { status: 500 }
    );
  }
}
