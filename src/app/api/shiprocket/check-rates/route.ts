import { NextRequest, NextResponse } from 'next/server';
import { shiprocketClient } from '@/lib/shiprocket/shiprocket-client';
import { z } from 'zod';

const checkRatesSchema = z.object({
  pickup_postcode: z.string().min(6).max(6),
  delivery_postcode: z.string().min(6).max(6),
  cod: z.boolean().optional().default(false),
  weight: z.string().optional(),
  length: z.number().optional(),
  breadth: z.number().optional(),
  height: z.number().optional(),
  declared_value: z.number().optional(),
  mode: z.enum(['Surface', 'Air']).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Parse and validate query parameters
    const params = {
      pickup_postcode: searchParams.get('pickup_postcode') || '',
      delivery_postcode: searchParams.get('delivery_postcode') || '',
      cod: searchParams.get('cod') === 'true' || searchParams.get('cod') === '1',
      weight: searchParams.get('weight') || undefined,
      length: searchParams.get('length') ? parseInt(searchParams.get('length')!) : undefined,
      breadth: searchParams.get('breadth') ? parseInt(searchParams.get('breadth')!) : undefined,
      height: searchParams.get('height') ? parseInt(searchParams.get('height')!) : undefined,
      declared_value: searchParams.get('declared_value') ? parseFloat(searchParams.get('declared_value')!) : undefined,
      mode: (searchParams.get('mode') as 'Surface' | 'Air' | null) || undefined,
    };

    // Validate parameters
    const validatedParams = checkRatesSchema.parse(params);

    console.log('Checking Shiprocket shipping rates:', validatedParams);

    // Call Shiprocket serviceability API
    const serviceabilityResponse = await shiprocketClient.checkServiceability(validatedParams);

    console.log('Shiprocket serviceability response:', JSON.stringify(serviceabilityResponse, null, 2));

    // Extract recommended courier
    const recommendedCourierId = serviceabilityResponse.data?.data?.recommended_courier_company_id;
    const availableCouriers = serviceabilityResponse.data?.data?.available_courier_companies || [];

    const recommendedCourier = availableCouriers.find(
      (courier) => courier.courier_company_id === recommendedCourierId
    );

    return NextResponse.json({
      success: true,
      data: {
        available_courier_companies: availableCouriers,
        recommended_courier_company_id: recommendedCourierId,
        recommended_courier: recommendedCourier,
      },
      message: 'Shipping rates fetched successfully',
    });
  } catch (error) {
    console.error('Shiprocket check rates error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch shipping rates';

    return NextResponse.json(
      {
        error: errorMessage,
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
