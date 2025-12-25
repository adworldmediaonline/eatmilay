'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { signupSchema } from '@/lib/validations/signup.schema';
import { toast } from 'sonner';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { authClient } from '../../lib/auth-client';
import { GoogleSignIn } from './google-signin';

interface SignUpFormProps extends React.ComponentProps<'div'> {
  onSuccess?: () => void;
  onSwitchToSignIn?: () => void;
  inDialog?: boolean;
}

export function SignUpForm({
  className,
  onSuccess,
  onSwitchToSignIn,
  inDialog = false,
  ...props
}: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    await authClient.signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.name,
        callbackURL: `/verify-email?email=${encodeURIComponent(values.email)}`,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          setIsLoading(false);
          toast.success('Sign up successful');
          if (onSuccess) {
            onSuccess();
          }
          // Always redirect to verify email page for email verification
          router.push(
            `/verify-email?email=${encodeURIComponent(values.email)}`
          );
        },
        onError: ctx => {
          console.log(ctx);
          setIsLoading(false);
          toast.error(ctx.error.message);
        },
      }
    );
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      {inDialog ? (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  {/* <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  Sign up with Apple
                </Button> */}
                  <GoogleSignIn text="Sign up with Google" />
                </div>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>

                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel>Name</FormLabel>
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            id="name"
                            type="text"
                            placeholder="John Doe"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              id="email"
                              type="email"
                              placeholder="m@example.com"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center">
                            <FormLabel>Password</FormLabel>
                          </div>
                          <FormControl>
                            <Input
                              {...field}
                              id="password"
                              type="password"
                              placeholder="********"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[hsl(var(--primary))] hover:bg-[#1e7a1e] text-white transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isLoading ? 'Signing up...' : 'Sign up'}
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Already have an account?{' '}
                  {inDialog && onSwitchToSignIn ? (
                    <button
                      type="button"
                      onClick={onSwitchToSignIn}
                      className="underline underline-offset-4 text-[hsl(var(--primary))] hover:text-[#1e7a1e] font-medium transition-colors"
                    >
                      Sign in
                    </button>
                  ) : (
                    <Link
                      href="/sign-in"
                      className="underline underline-offset-4 text-[hsl(var(--primary))] hover:text-[#1e7a1e] font-medium transition-colors"
                    >
                      Sign in
                    </Link>
                  )}
                </div>
              </div>
            </form>
          </Form>
        ) : (
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Welcome back</CardTitle>
              <CardDescription>Sign up with your Google account</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid gap-6">
                    <div className="flex flex-col gap-4">
                      <GoogleSignIn text="Sign up with Google" />
                    </div>
                    <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                      <span className="bg-card text-muted-foreground relative z-10 px-2">
                        Or continue with
                      </span>
                    </div>

                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center">
                              <FormLabel>Name</FormLabel>
                            </div>
                            <FormControl>
                              <Input
                                {...field}
                                id="name"
                                type="text"
                                placeholder="John Doe"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  id="email"
                                  type="email"
                                  placeholder="m@example.com"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center">
                                <FormLabel>Password</FormLabel>
                              </div>
                              <FormControl>
                                <Input
                                  {...field}
                                  id="password"
                                  type="password"
                                  placeholder="********"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {isLoading ? 'Signing up...' : 'Sign up'}
                      </Button>
                    </div>
                    <div className="text-center text-sm">
                      Already have an account?{' '}
                      <Link
                        href="/sign-in"
                        className="underline underline-offset-4 text-[hsl(var(--primary))] hover:text-[#1e7a1e] font-medium transition-colors"
                      >
                        Sign in
                      </Link>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}
      {!inDialog && (
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '}
          and <a href="#">Privacy Policy</a>.
        </div>
      )}
    </div>
  );
}
