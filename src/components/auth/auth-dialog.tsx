'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { SignInForm } from './signin-form';
import { SignUpForm } from './signup-form';

interface AuthDialogProps {
  trigger: React.ReactNode;
  defaultTab?: 'signin' | 'signup';
}

export function AuthDialog({ trigger, defaultTab = 'signin' }: AuthDialogProps) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleSuccess = () => {
    setOpen(false);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as 'signin' | 'signup');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger}
      <DialogContent className="sm:max-w-[480px] w-[calc(100vw-2rem)] max-h-[90vh] overflow-x-hidden overflow-y-auto p-0 gap-0 bg-gradient-to-br from-white to-gray-50">
        <DialogHeader className="px-4 sm:px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))] bg-clip-text text-transparent">
            {activeTab === 'signin' ? 'Welcome Back' : 'Create Account'}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground text-sm">
            {activeTab === 'signin'
              ? 'Sign in to your account to continue'
              : 'Join us and start your natural beauty journey'}
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full overflow-hidden"
        >
          <div className="px-4 sm:px-6">
            <TabsList className="grid w-full grid-cols-2 mb-4 mt-4 h-11 bg-gray-100 p-1">
              <TabsTrigger
                value="signin"
                className="data-[state=active]:bg-[hsl(var(--primary))] data-[state=active]:text-white transition-all duration-300 rounded-md data-[state=active]:shadow-md text-sm sm:text-base"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="data-[state=active]:bg-[hsl(var(--primary))] data-[state=active]:text-white transition-all duration-300 rounded-md data-[state=active]:shadow-md text-sm sm:text-base"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="px-4 sm:px-6 pb-4">
            <TabsContent value="signin" className="mt-0">
              <SignInForm
                onSuccess={handleSuccess}
                onSwitchToSignUp={() => setActiveTab('signup')}
                inDialog
              />
            </TabsContent>

            <TabsContent value="signup" className="mt-0">
              <SignUpForm
                onSuccess={handleSuccess}
                onSwitchToSignIn={() => setActiveTab('signin')}
                inDialog
              />
            </TabsContent>
          </div>

          <div className="px-4 sm:px-6 pb-6 pt-2 border-t bg-gray-50/50">
            <p className="text-xs text-center text-muted-foreground break-words">
              By continuing, you agree to our{' '}
              <a href="#" className="underline hover:text-[hsl(var(--primary))] transition-colors">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="underline hover:text-[hsl(var(--primary))] transition-colors">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

