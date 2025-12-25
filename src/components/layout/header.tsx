'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
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
import { authClient } from '@/lib/auth-client';

import {
  Loader2,
  LogOut,
  Menu,
  Package,
  Search,
  Settings,
  ShoppingCart,
  User,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';

import { useState } from 'react';

interface HeaderProps {
  cartItemCount?: number;
  onSearch?: (query: string) => void;
  variant?: 'default' | 'green' | 'blue' | 'purple';
}

export default function Header({
  cartItemCount = 0,
  variant = 'default',
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: session } = authClient.useSession();
  // Theme variants
  const themes = {
    default: {
      banner: 'bg-gray-800',
      bannerText: 'text-white',
      bannerAccent: 'text-gray-300',
      main: 'bg-white',
      logo: 'text-gray-900',
      logoAccent: 'text-gray-600',
      navText: 'text-gray-900',
      navHover: 'hover:text-gray-600',
      button: 'bg-gray-900 hover:bg-gray-800',
      cartBadge: 'bg-gray-800 text-white',
      mobileUser: 'bg-gray-800',
      mobileUserText: 'text-gray-300',
    },
    green: {
      banner: 'bg-green-800',
      bannerText: 'text-white',
      bannerAccent: 'text-green-300',
      main: 'bg-white',
      logo: 'text-green-800',
      logoAccent: 'text-green-600',
      navText: 'text-gray-900',
      navHover: 'hover:text-green-700',
      button: 'bg-green-800 hover:bg-green-700',
      cartBadge: 'bg-green-600 text-white',
      mobileUser: 'bg-green-800',
      mobileUserText: 'text-green-300',
    },
    blue: {
      banner: 'bg-blue-700',
      bannerText: 'text-white',
      bannerAccent: 'text-blue-300',
      main: 'bg-white',
      logo: 'text-blue-700',
      logoAccent: 'text-blue-800',
      navText: 'text-gray-900',
      navHover: 'hover:text-blue-700',
      button: 'bg-blue-700 hover:bg-blue-800',
      cartBadge: 'bg-blue-300 text-blue-800',
      mobileUser: 'bg-blue-700',
      mobileUserText: 'text-blue-300',
    },
    purple: {
      banner: 'bg-purple-700',
      bannerText: 'text-white',
      bannerAccent: 'text-purple-300',
      main: 'bg-white',
      logo: 'text-purple-700',
      logoAccent: 'text-purple-800',
      navText: 'text-gray-900',
      navHover: 'hover:text-purple-700',
      button: 'bg-purple-700 hover:bg-purple-800',
      cartBadge: 'bg-purple-300 text-purple-800',
      mobileUser: 'bg-purple-700',
      mobileUserText: 'text-purple-300',
    },
  };

  const currentTheme = themes[variant];

  return (
    <header className="w-full font-sans">
      {/* Promotional Banner */}

      {/* Main Header */}
      <div
        className={`${currentTheme.main} border-b border-gray-100 shadow-md`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="block">
                <h1
                  className={`text-xl sm:text-2xl font-bold ${currentTheme.navText} tracking-tight`}
                >
                  <span className={currentTheme.logoAccent}>Sum</span>NSubstance
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              <NavigationMenu>
                <NavigationMenuList className="space-x-1">
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/"
                        className={`${navigationMenuTriggerStyle()} ${currentTheme.navText
                          } ${currentTheme.navHover} font-medium`}
                      >
                        Home
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/products"
                        className={`${navigationMenuTriggerStyle()} ${currentTheme.navText
                          } ${currentTheme.navHover} font-medium`}
                      >
                        Products
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/categories"
                        className={`${navigationMenuTriggerStyle()} ${currentTheme.navText
                          } ${currentTheme.navHover} font-medium`}
                      >
                        Categories
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/about"
                        className={`${navigationMenuTriggerStyle()} ${currentTheme.navText
                          } ${currentTheme.navHover} font-medium`}
                      >
                        About
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/contact"
                        className={`${navigationMenuTriggerStyle()} ${currentTheme.navText
                          } ${currentTheme.navHover} font-medium`}
                      >
                        Contact
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Search */}
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-gray-50 hidden sm:flex"
              >
                <Search className="h-5 w-5 text-gray-600" />
              </Button>

              {/* User Account */}
              <div className="hidden md:block">
                {false ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-9 w-9 rounded-full"
                      >
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={''} alt={''} />
                          <AvatarFallback className="bg-gray-100 text-gray-900 font-semibold">
                            {''}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-64"
                      align="end"
                      forceMount
                    >
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {''}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {''}
                          </p>
                          {false && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mt-1 w-fit">
                              {session?.user.role === 'admin' ? 'Admin' : 'User'}
                            </span>
                          )}
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/admin" className="cursor-pointer">
                          <UserIcon className="mr-2 h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>

                      {/* <DropdownMenuItem asChild>
                        <Link
                          href="/dashboard/admin/user/profile"
                          className="cursor-pointer"
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Account Settings</span>
                        </Link>
                      </DropdownMenuItem> */}

                      <DropdownMenuItem asChild>
                        <Link href={session?.user.role === 'admin' ? '/dashboard/admin/orders' : '/dashboard/user/orders'} className="cursor-pointer">
                          <Package className="mr-2 h-4 w-4" />
                          <span>Orders</span>
                        </Link>
                      </DropdownMenuItem>

                      {false && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link
                              href={session?.user.role === 'admin' ? '/dashboard/admin' : '/dashboard/user'}
                              className="cursor-pointer"
                            >
                              <Settings className="mr-2 h-4 w-4" />
                              <span>Dashboard</span>
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}

                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => { }}
                        disabled={false}
                        className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50"
                      >
                        {false ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <LogOut className="w-4 h-4 mr-2" />
                        )}
                        {false ? 'Logging out...' : 'Sign Out'}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 hover:bg-gray-50"
                    onClick={() => { }}
                  >
                    <User className="h-5 w-5 text-gray-600" />
                  </Button>
                )}
              </div>

              {/* Shopping Cart */}
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1.5 sm:p-2 relative hover:bg-gray-50"
                >
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                  {cartItemCount > 0 && (
                    <Badge
                      className={`absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full p-0 flex items-center justify-center text-xs ${currentTheme.cartBadge} font-bold`}
                    >
                      {cartItemCount > 9 ? '9+' : cartItemCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Mobile Menu */}
              <div className="lg:hidden">
                <Sheet
                  open={isMobileMenuOpen}
                  onOpenChange={setIsMobileMenuOpen}
                >
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-2 hover:bg-gray-50"
                    >
                      <Menu className="h-5 w-5 text-gray-600" />
                    </Button>
                  </SheetTrigger>

                  <SheetContent
                    side="right"
                    className="w-full max-w-sm p-0 overflow-y-auto"
                  >

                    <div className="flex flex-col h-full">
                      {/* User Section */}
                      <div className="p-4 sm:p-6 border-b">
                        {false ? (
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={''} alt={''} />
                              <AvatarFallback className="bg-gray-100 text-gray-900 font-semibold">
                                {''}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">
                                {''}
                              </div>
                              <div className="text-sm text-gray-500">{''}</div>
                              {false && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mt-1">
                                  Admin
                                </span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                              }}
                            >
                              Login
                            </Button>
                            <Button
                              className={`w-full ${currentTheme.button} text-white`}
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                              }}
                            >
                              Sign Up
                            </Button>
                          </div>
                        )}
                      </div>

                      {/* Mobile Navigation Items */}
                      <nav className="flex-1 px-4 sm:px-6 py-4 space-y-2">
                        <Link
                          href="/"
                          className="flex items-center space-x-3 text-lg font-medium py-2 hover:text-primary transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span>Home</span>
                        </Link>
                        <Link
                          href="/products"
                          className="flex items-center space-x-3 text-lg font-medium py-2 hover:text-primary transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span>Products</span>
                        </Link>
                        <Link
                          href="/categories"
                          className="flex items-center space-x-3 text-lg font-medium py-2 hover:text-primary transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span>Categories</span>
                        </Link>
                        <Link
                          href="/about"
                          className="flex items-center space-x-3 text-lg font-medium py-2 hover:text-primary transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span>About</span>
                        </Link>
                        <Link
                          href="/contact"
                          className="flex items-center space-x-3 text-lg font-medium py-2 hover:text-primary transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span>Contact</span>
                        </Link>

                        {/* User Account Links (when logged in) */}
                        {false && (
                          <div className="border-t pt-4 mt-6">
                            <div className="space-y-2">
                              <Link
                                href={session?.user.role === 'admin' ? '/dashboard/admin' : '/dashboard/user'}
                                className="flex items-center space-x-3 text-lg font-medium py-2 hover:text-primary transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <UserIcon className="w-5 h-5" />
                                <span>Dashboard</span>
                              </Link>
                              {/* <Link
                                href="/dashboard/admin/user/profile"
                                className="flex items-center space-x-3 text-lg font-medium py-2 hover:text-primary transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <Settings className="w-5 h-5" />
                                <span>Account Settings</span>
                              </Link> */}
                              <Link
                                href={session?.user.role === 'admin' ? '/dashboard/admin/orders' : '/dashboard/user/orders'}
                                className="flex items-center space-x-3 text-lg font-medium py-2 hover:text-primary transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <Package className="w-5 h-5" />
                                <span>Orders</span>
                              </Link>
                              {false && (
                                <Link
                                  href={session?.user.role === 'admin' ? '/dashboard/admin' : '/dashboard/user'}
                                  className="flex items-center space-x-3 text-lg font-medium py-2 hover:text-primary transition-colors"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  <Settings className="w-5 h-5" />
                                  <span>Dashboard</span>
                                </Link>
                              )}
                            </div>
                          </div>
                        )}
                      </nav>

                      {/* Logout Button (when logged in) */}
                      {false && (
                        <div className="p-4 sm:p-6 border-t">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                            }}
                            disabled={false}
                            className="w-full text-red-600 border-red-200 hover:bg-red-50"
                          >
                            {false ? (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <LogOut className="w-4 h-4 mr-2" />
                            )}
                            {false ? 'Logging out...' : 'Logout'}
                          </Button>
                        </div>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
