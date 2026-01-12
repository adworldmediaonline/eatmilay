'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Package, CheckCircle2, XCircle } from 'lucide-react';

export default function ShiprocketTrackingTestPage() {
  const [shipmentId, setShipmentId] = useState('1123414531');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTestTracking = async () => {
    if (!shipmentId.trim()) {
      setError('Please enter a shipment ID');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch(`/api/shiprocket/test-tracking?shipmentId=${encodeURIComponent(shipmentId.trim())}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch tracking data');
      }

      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to test tracking');
      console.error('Tracking test error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Shiprocket Tracking API Test
          </CardTitle>
          <CardDescription>
            Test Shiprocket tracking API endpoint: /courier/track/shipment/{'{shipment_id}'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="shipmentId">Shipment ID</Label>
              <div className="flex gap-2">
                <Input
                  id="shipmentId"
                  placeholder="e.g., 1123414531"
                  value={shipmentId}
                  onChange={(e) => setShipmentId(e.target.value)}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={handleTestTracking}
                  disabled={isLoading || !shipmentId.trim()}
                  className="gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    <>
                      <Package className="w-4 h-4" />
                      Test Tracking
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>API Endpoint: <code className="bg-muted px-2 py-1 rounded">GET /courier/track/shipment/{shipmentId || '{shipment_id}'}</code></p>
              <p className="mt-1">Full URL: <code className="bg-muted px-2 py-1 rounded">https://apiv2.shiprocket.in/v1/external/courier/track/shipment/{shipmentId || '{shipment_id}'}</code></p>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Error:</strong> {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Success Display */}
          {response && (
            <div className="space-y-4">
              <Alert>
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>
                  <strong>Success!</strong> Tracking data fetched successfully.
                </AlertDescription>
              </Alert>

              {/* Response Data */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">API Response</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Tracking Data */}
                    {response.data?.tracking_data && (
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold mb-2">Shipment Track</h3>
                          {response.data.tracking_data.shipment_track &&
                           response.data.tracking_data.shipment_track.length > 0 ? (
                            <div className="space-y-2">
                              {response.data.tracking_data.shipment_track.map((track: any, index: number) => (
                                <div key={index} className="p-3 bg-muted rounded-lg">
                                  <p><strong>Status:</strong> {track.current_status}</p>
                                  <p><strong>Status Code:</strong> {track.current_status_code}</p>
                                  <p><strong>Timestamp:</strong> {track.current_timestamp}</p>
                                  {track.awb_code && <p><strong>AWB Code:</strong> {track.awb_code}</p>}
                                  {track.courier_name && <p><strong>Courier:</strong> {track.courier_name}</p>}
                                  {track.etd && <p><strong>ETD:</strong> {track.etd}</p>}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-muted-foreground">No shipment track data available</p>
                          )}
                        </div>

                        <div>
                          <h3 className="font-semibold mb-2">Tracking Activities</h3>
                          {response.data.tracking_data.shipment_track_activities &&
                           response.data.tracking_data.shipment_track_activities.length > 0 ? (
                            <div className="space-y-2">
                              {response.data.tracking_data.shipment_track_activities.map((activity: any, index: number) => (
                                <div key={index} className="p-3 bg-muted rounded-lg">
                                  <p><strong>Status:</strong> {activity.status}</p>
                                  <p><strong>Activity:</strong> {activity.activity}</p>
                                  {activity.location && <p><strong>Location:</strong> {activity.location}</p>}
                                  <p><strong>Date:</strong> {activity.date}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-muted-foreground">No tracking activities available</p>
                          )}
                        </div>

                        <div>
                          <p><strong>Shipment Status:</strong> {response.data.tracking_data.shipment_status}</p>
                        </div>
                      </div>
                    )}

                    {/* Raw JSON */}
                    <div>
                      <h3 className="font-semibold mb-2">Raw JSON Response</h3>
                      <pre className="bg-muted p-4 rounded-lg overflow-auto text-xs">
                        {JSON.stringify(response, null, 2)}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
