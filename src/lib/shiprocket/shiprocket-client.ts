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

  /**
   * Track order by shipment_id (priority), AWB code, or channel_order_id
   * Shiprocket API tracking uses shipment_id primarily
   * API: GET /courier/track/shipment/{shipment_id} OR /courier/track?order_id={channel_order_id}
   */
  async trackOrder(
    awbCode?: string | null,
    shipmentId?: number,
    channelOrderId?: string,
    channelId?: string
  ): Promise<ShiprocketApiResponse<import('./types').ShiprocketTrackingResponse>> {
    const token = await this.getAuthToken();

    // Priority: shipment_id > AWB code > channel_order_id
    // Shiprocket tracking API primarily uses shipment_id
    let trackUrl: string;
    if (shipmentId) {
      // Use shipment_id for tracking (most reliable method)
      trackUrl = `${this.apiUrl}/courier/track/shipment/${shipmentId}`;
      console.log('Tracking with Shiprocket shipment_id:', shipmentId);
    } else if (awbCode) {
      trackUrl = `${this.apiUrl}/courier/track/awb/${awbCode}`;
      console.log('Tracking with AWB code:', awbCode);
    } else if (channelOrderId) {
      // Use channel_order_id (our order number) as fallback
      // Format: /courier/track?order_id={channel_order_id}&channel_id={channel_id}
      const params = new URLSearchParams({
        order_id: channelOrderId,
      });

      // Add channel_id if provided (optional parameter)
      if (channelId) {
        params.append('channel_id', channelId);
      }

      trackUrl = `${this.apiUrl}/courier/track?${params.toString()}`;
      console.log('Tracking with channel_order_id:', channelOrderId, channelId ? `and channel_id: ${channelId}` : '');
    } else {
      throw new Error('Either shipment ID, AWB code, or channel order ID is required for tracking');
    }

    console.log('Shiprocket tracking URL:', trackUrl);

    const response = await fetch(trackUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      let errorData: any;
      try {
        errorData = await response.json();
        console.error('Shiprocket tracking API error:', JSON.stringify(errorData, null, 2));
      } catch {
        const errorText = await response.text();
        console.error('Shiprocket tracking API error text:', errorText);
        errorData = { message: errorText || 'Failed to track order' };
      }

      const errorMessage = errorData.message || `Failed to track order: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('Shiprocket tracking response:', JSON.stringify(data, null, 2));

    // Shiprocket tracking response format
    return {
      data: data as import('./types').ShiprocketTrackingResponse,
    };
  }

  /**
   * Get all orders from Shiprocket
   * Shiprocket API: GET /orders
   */
  async getAllOrders(): Promise<ShiprocketApiResponse<any>> {
    const token = await this.getAuthToken();

    const ordersUrl = `${this.apiUrl}/orders`;
    console.log('Shiprocket get orders URL:', ordersUrl);

    const response = await fetch(ordersUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      let errorData: any;
      try {
        errorData = await response.json();
        console.error('Shiprocket get orders API error:', JSON.stringify(errorData, null, 2));
      } catch {
        const errorText = await response.text();
        console.error('Shiprocket get orders API error text:', errorText);
        errorData = { message: errorText || 'Failed to get orders' };
      }

      const errorMessage = errorData.message || `Failed to get orders: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('Shiprocket get orders response:', JSON.stringify(data, null, 2));

    return {
      data: data,
    };
  }

  /**
   * Check courier serviceability and get shipping rates
   * Shiprocket API: GET /courier/serviceability/
   */
  async checkServiceability(params: {
    pickup_postcode: string;
    delivery_postcode: string;
    cod?: boolean;
    weight?: string;
    length?: number;
    breadth?: number;
    height?: number;
    declared_value?: number;
    mode?: 'Surface' | 'Air';
  }): Promise<ShiprocketApiResponse<import('./types').ShiprocketServiceabilityResponse>> {
    const token = await this.getAuthToken();

    const queryParams = new URLSearchParams({
      pickup_postcode: params.pickup_postcode,
      delivery_postcode: params.delivery_postcode,
    });

    if (params.cod !== undefined) {
      queryParams.append('cod', params.cod ? '1' : '0');
    }

    if (params.weight) {
      queryParams.append('weight', params.weight);
    }

    if (params.length) {
      queryParams.append('length', params.length.toString());
    }

    if (params.breadth) {
      queryParams.append('breadth', params.breadth.toString());
    }

    if (params.height) {
      queryParams.append('height', params.height.toString());
    }

    if (params.declared_value) {
      queryParams.append('declared_value', params.declared_value.toString());
    }

    if (params.mode) {
      queryParams.append('mode', params.mode);
    }

    const serviceabilityUrl = `${this.apiUrl}/courier/serviceability/?${queryParams.toString()}`;
    console.log('Shiprocket serviceability URL:', serviceabilityUrl);

    const response = await fetch(serviceabilityUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      let errorData: any;
      try {
        errorData = await response.json();
        console.error('Shiprocket serviceability API error:', JSON.stringify(errorData, null, 2));
      } catch {
        const errorText = await response.text();
        console.error('Shiprocket serviceability API error text:', errorText);
        errorData = { message: errorText || 'Failed to check serviceability' };
      }

      const errorMessage = errorData.message || `Failed to check serviceability: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('Shiprocket serviceability response:', JSON.stringify(data, null, 2));

    return {
      data: data as import('./types').ShiprocketServiceabilityResponse,
    };
  }
}

// Export singleton instance
export const shiprocketClient = new ShiprocketClient();
