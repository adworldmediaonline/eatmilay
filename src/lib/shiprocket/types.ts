/**
 * Shiprocket API Types
 */

export interface ShiprocketOrderItem {
  name: string;
  sku: string;
  units: number;
  selling_price: number;
  discount?: number;
  tax?: number;
  hsn?: string;
}

export interface ShiprocketAddress {
  customer_name: string;
  last_name?: string;
  address: string;
  address_2?: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
  email: string;
  phone: string;
}

export interface ShiprocketCreateOrderPayload {
  order_id: string;
  order_date: string;
  pickup_location: string;
  comment?: string;
  reseller_name?: string;
  company_name?: string;
  billing_customer_name: string;
  billing_last_name?: string;
  billing_address: string;
  billing_address_2?: string;
  billing_isd_code?: string;
  billing_city: string;
  billing_pincode: string;
  billing_state: string;
  billing_country: string;
  billing_email: string;
  billing_phone: string;
  billing_alternate_phone?: string;
  shipping_is_billing: boolean;
  shipping_customer_name?: string;
  shipping_last_name?: string;
  shipping_address?: string;
  shipping_address_2?: string;
  shipping_city?: string;
  shipping_pincode?: string;
  shipping_country?: string;
  shipping_state?: string;
  shipping_email?: string;
  shipping_phone?: string;
  order_items: ShiprocketOrderItem[];
  payment_method: string;
  shipping_charges?: number;
  giftwrap_charges?: number;
  transaction_charges?: number;
  total_discount?: number;
  sub_total: number;
  length?: number;
  breadth?: number;
  height?: number;
  weight?: number;
  ewaybill_no?: string;
  customer_gstin?: string;
  invoice_number?: string;
  order_type?: string;
}

export interface ShiprocketOrderResponse {
  order_id?: number;
  channel_order_id?: string;
  shipment_id: number;
  awb_code: string | null;
  status?: string;
  status_code?: number;
  onway_status?: string;
  delivered_status?: string;
  rto_status?: string;
  rto_delivered_status?: string;
  onboarding_completed_now?: number;
  courier_company_id?: string;
  courier_name?: string;
  new_channel?: boolean;
  packaging_box_error?: string;
}

export interface ShiprocketTrackingResponse {
  tracking_data: {
    shipment_status: number;
    shipment_track: Array<{
      current_status: string;
      current_status_code: string;
      current_timestamp: string;
      awb_code: string;
      courier_name: string;
      etd: string;
    }>;
    shipment_track_activities: Array<{
      date: string;
      status: string;
      activity: string;
      location: string;
    }>;
  };
}
