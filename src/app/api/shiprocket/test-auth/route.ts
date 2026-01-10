import { NextRequest, NextResponse } from 'next/server';
import { shiprocketClient } from '@/lib/shiprocket/shiprocket-client';

export async function POST(request: NextRequest) {
  try {
    // Test authentication by trying to get a token
    // We'll use a private method, so we'll create a test method instead
    const apiUrl = process.env.SHIPROCKET_API_URL || 'https://apiv2.shiprocket.in/v1/external';
    const email = process.env.SHIPROCKET_API_EMAIL || '';
    const password = process.env.SHIPROCKET_API_PASSWORD || '';

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: 'Shiprocket credentials not configured. Please set SHIPROCKET_API_EMAIL and SHIPROCKET_API_PASSWORD environment variables.',
        },
        { status: 400 }
      );
    }

    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Authentication failed' }));
      return NextResponse.json(
        {
          success: false,
          error: errorData.message || `Authentication failed: ${response.status}`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data.token) {
      return NextResponse.json(
        {
          success: false,
          error: 'No token received from Shiprocket',
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Authentication successful!',
      token: data.token,
    });
  } catch (error) {
    console.error('Shiprocket authentication test error:', error);

    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}
