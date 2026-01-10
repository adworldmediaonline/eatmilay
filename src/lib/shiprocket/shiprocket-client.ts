/**
 * Shiprocket API Client
 * Simple implementation for authentication and order creation
 */

interface ShiprocketAuthResponse {
  token: string;
}

interface ShiprocketApiResponse<T = unknown> {
  status?: number;
  message?: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
}

class ShiprocketClient {
  private apiUrl: string;
  private email: string;
  private password: string;

  constructor() {
    this.apiUrl = process.env.SHIPROCKET_API_URL || 'https://apiv2.shiprocket.in/v1/external';
    this.email = process.env.SHIPROCKET_API_EMAIL || '';
    this.password = process.env.SHIPROCKET_API_PASSWORD || '';
  }

  /**
   * Get authentication token
   */
  private async getAuthToken(): Promise<string> {
    const response = await fetch(`${this.apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.email,
        password: this.password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Authentication failed' }));
      throw new Error(errorData.message || `Authentication failed: ${response.status}`);
    }

    const data = (await response.json()) as ShiprocketAuthResponse;

    if (!data.token) {
      throw new Error('No token received from Shiprocket');
    }

    return data.token;
  }

  /**
   * Create order in Shiprocket
   */
  async createOrder(orderData: import('./types').ShiprocketCreateOrderPayload): Promise<ShiprocketApiResponse<import('./types').ShiprocketOrderResponse>> {
    const token = await this.getAuthToken();

    const response = await fetch(`${this.apiUrl}/orders/create/adhoc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      let errorData: any;
      try {
        errorData = await response.json();
        console.error('Shiprocket API error response:', JSON.stringify(errorData, null, 2));

        // If error contains pickup location data, extract available locations
        if (errorData.data?.data && Array.isArray(errorData.data.data)) {
          const locations = errorData.data.data.map((loc: any) => loc.pickup_location).filter(Boolean);
          if (locations.length > 0) {
            console.error('Available pickup locations:', locations);
            errorData.availableLocations = locations;
          }
        }
      } catch {
        const errorText = await response.text();
        console.error('Shiprocket API error text:', errorText);
        errorData = { message: errorText || 'Failed to create order' };
      }

      const errorMessage = errorData.message ||
        (errorData.errors && Array.isArray(errorData.errors)
          ? errorData.errors.map((e: any) => `${e.field || ''}: ${e.message || ''}`).join(', ')
          : '') ||
        `Failed to create order: ${response.status}`;

      // Include available locations in error if present
      if (errorData.availableLocations && errorData.availableLocations.length > 0) {
        throw new Error(`${errorMessage}. Available locations: ${errorData.availableLocations.join(', ')}`);
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();

    // Shiprocket returns order data directly, not wrapped in data object
    // Check if it's the order response format (has shipment_id or order_id)
    if (data.shipment_id || data.order_id) {
      return {
        data: {
          shipment_id: data.shipment_id,
          awb_code: data.awb_code || null,
          order_id: data.order_id,
          channel_order_id: data.channel_order_id,
          status: data.status,
          status_code: data.status_code,
        },
      } as ShiprocketApiResponse<import('./types').ShiprocketOrderResponse>;
    }

    // If it's wrapped in data object, return as is
    return data as ShiprocketApiResponse<import('./types').ShiprocketOrderResponse>;
  }
}

// Export singleton instance
export const shiprocketClient = new ShiprocketClient();
