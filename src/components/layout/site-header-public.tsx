'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  LogOut,
  Menu,
  Package,
  User,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';
// import Image from 'next/image';
// import logo from '../../../public/brand/S&S Logo-01.png';

import { AuthDialog } from '@/components/auth/auth-dialog';
import { CartDropdown } from '@/components/cart/cart-dropdown';
import { DialogTrigger } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';

export default function SiteHeaderPublic() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 bg-header-background shadow-lg py-4 h-20 transition-all duration-300">

      {/* Left Section: Desktop Navigation & Mobile Menu */}
      <div className="flex flex-1 items-center justify-start">
        {/* Mobile Menu */}
        <div className="md:hidden mr-4">
          {isMounted && (
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 transition-colors duration-300 text-header-foreground hover:bg-white/10"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] sm:w-[400px] bg-gradient-to-br from-primary to-primary/80 border-r border-white/10"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center mb-8">
                    <span className="text-3xl font-bold text-white">EatMilay</span>
                  </div>

                  {/* User Info (Mobile) */}
                  {session && (
                    <div className="mb-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-14 w-14 border-2 border-white/20">
                          <AvatarImage src={session.user.image ?? ''} alt={''} />
                          <AvatarFallback className="bg-white text-primary font-semibold text-lg">
                            {session.user.initials ?? ''}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-white font-medium text-base">{session.user.name}</p>
                          <p className="text-white/70 text-sm">{session.user.email}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mobile Navigation Links */}
                  <nav className="flex-1 space-y-2">
                    <Link
                      href="/"
                      className="flex items-center gap-3 text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="font-medium">Home</span>
                    </Link>

                    <Link
                      href="/about"
                      className="flex items-center gap-3 text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="font-medium">About Us</span>
                    </Link>

                    <Link
                      href="/contact-us"
                      className="flex items-center gap-3 text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="font-medium">Contact</span>
                    </Link>

                    <div className="my-4 h-px bg-white/20" />

                    {session && (
                      <>
                        <Link
                          href={session.user.role === 'admin' ? '/dashboard/admin' : '/dashboard/user'}
                          className="flex items-center gap-3 text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <UserIcon className="w-5 h-5" />
                          <span className="font-medium">Dashboard</span>
                        </Link>
                        <Link
                          href={session.user.role === 'admin' ? '/dashboard/admin/orders' : '/dashboard/user/orders'}
                          className="flex items-center gap-3 text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Package className="w-5 h-5" />
                          <span className="font-medium">Orders</span>
                        </Link>
                      </>
                    )}
                  </nav>

                  {/* Mobile Bottom Actions */}
                  <div className="pt-4 border-t border-white/20">
                    {session ? (
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-white hover:bg-red-500/20 hover:text-white"
                        onClick={() => {
                          authClient.signOut({
                            fetchOptions: {
                              onSuccess: () => {
                                setIsMobileMenuOpen(false);
                                router.push('/');
                              },
                            },
                          });
                        }}
                      >
                        <LogOut className="mr-2 h-5 w-5" />
                        <span className="font-medium">Log out</span>
                      </Button>
                    ) : (
                      <AuthDialog
                        trigger={
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-white hover:bg-white/10"
                            >
                              <User className="mr-2 h-5 w-5" />
                              <span className="font-medium">Sign In</span>
                            </Button>
                          </DialogTrigger>
                        }
                      />
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center">
          <NavigationMenu>
            <NavigationMenuList className="space-x-1">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className={`${navigationMenuTriggerStyle()} transition-colors duration-300 font-medium text-lg text-header-foreground hover:text-header-foreground/80 bg-transparent hover:bg-white/10 focus:bg-white/10 focus:text-header-foreground`}
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/about"
                    className={`${navigationMenuTriggerStyle()} transition-colors duration-300 font-medium text-lg text-header-foreground hover:text-header-foreground/80 bg-transparent hover:bg-white/10 focus:bg-white/10 focus:text-header-foreground`}
                  >
                    About Us
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/contact-us"
                    className={`${navigationMenuTriggerStyle()} transition-colors duration-300 font-medium text-lg text-header-foreground hover:text-header-foreground/80 bg-transparent hover:bg-white/10 focus:bg-white/10 focus:text-header-foreground`}
                  >
                    Contact
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      {/* Center Section: Logo */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Link href="/" className="flex items-center">
          <span className="text-3xl font-bold text-header-foreground tracking-tight">EatMilay</span>
        </Link>
      </div>

      {/* Right Section: Icons */}
      <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
        {/* Cart */}
        {isMounted && <CartDropdown isScrolled={false} />}

        {/* User Account - Desktop */}
        {!isPending && session ? (
          <div className="hidden md:block">{isMounted && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-11 w-11 rounded-full hover:bg-white/10"
                >
                  <Avatar className="h-11 w-11 border border-white/20">
                    <AvatarImage src={session.user.image ?? ''} alt={''} />
                    <AvatarFallback className="bg-white text-primary font-semibold text-base">
                      {session.user.initials ?? ''}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-64 bg-header-background border-white/10 text-header-foreground"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-white">
                      {session.user.name}
                    </p>
                    <p className="text-xs leading-none text-gray-400">
                      {session.user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />

                <DropdownMenuItem asChild className="focus:bg-white/10 focus:text-white cursor-pointer">
                  <Link href={session.user.role === 'admin' ? '/dashboard/admin/' : '/dashboard/user/'}>
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="focus:bg-white/10 focus:text-white cursor-pointer">
                  <Link href={session.user.role === 'admin' ? '/dashboard/admin/orders' : '/dashboard/user/orders'}>
                    <Package className="mr-2 h-4 w-4" />
                    <span>Orders</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem
                  className="cursor-pointer text-red-500 focus:text-red-400 focus:bg-white/10"
                  onClick={() => {
                    authClient.signOut({
                      fetchOptions: {
                        onSuccess: () => {
                          router.push('/');
                        },
                      },
                    });
                  }}
                  disabled={false}
                >
                  <LogOut className="mr-2 h-4 w-4" /> <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}</div>
        ) : (
          isMounted && (
            <AuthDialog
              trigger={
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative p-2 rounded-full transition-all duration-300 hover:bg-white/10 text-header-foreground"
                  >
                    <User className="w-6 h-6" />
                  </Button>
                </DialogTrigger>
              }
            />
          )
        )}
      </div>
    </nav>
  );
}

