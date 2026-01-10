'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

export default function ShiprocketTestPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    token?: string;
  } | null>(null);

  const testAuthentication = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/shiprocket/test-auth', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.success) {
        setResult({
          success: true,
          message: 'Authentication successful!',
          token: data.token ? `${data.token.substring(0, 20)}...` : undefined,
        });
      } else {
        setResult({
          success: false,
          message: data.error || 'Authentication failed',
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Shiprocket Authentication Test</CardTitle>
          <CardDescription>
            Test if Shiprocket API authentication is working correctly
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Click the button below to test Shiprocket authentication. This will:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Connect to Shiprocket API</li>
              <li>Authenticate with your credentials</li>
              <li>Return the authentication token</li>
            </ul>
          </div>

          <Button
            onClick={testAuthentication}
            disabled={isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing Authentication...
              </>
            ) : (
              'Test Authentication'
            )}
          </Button>

          {result && (
            <div
              className={`p-4 rounded-lg border ${result.success
                ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800'
                : 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800'
                }`}
            >
              <div className="flex items-start gap-3">
                {result.success ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                )}
                <div className="flex-1">
                  <p
                    className={`font-medium ${result.success
                      ? 'text-green-900 dark:text-green-100'
                      : 'text-red-900 dark:text-red-100'
                      }`}
                  >
                    {result.success ? 'Success!' : 'Failed'}
                  </p>
                  <p
                    className={`text-sm mt-1 ${result.success
                      ? 'text-green-700 dark:text-green-300'
                      : 'text-red-700 dark:text-red-300'
                      }`}
                  >
                    {result.message}
                  </p>
                  {result.token && (
                    <p className="text-xs mt-2 text-green-600 dark:text-green-400 font-mono">
                      Token: {result.token}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              <strong>Note:</strong> Make sure your environment variables are set:
              <br />
              <code className="bg-muted px-1 py-0.5 rounded">
                SHIPROCKET_API_URL, SHIPROCKET_API_EMAIL, SHIPROCKET_API_PASSWORD
              </code>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
