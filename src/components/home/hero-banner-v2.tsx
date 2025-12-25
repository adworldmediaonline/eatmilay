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
  ArrowRight,
  Heart,
  Leaf,
  LogOut,
  Menu,
  Package,
  Settings,
  Shield,
  User,
  UserIcon
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { AuthDialog } from '@/components/auth/auth-dialog';
import { CartDropdown } from '@/components/cart/cart-dropdown';
import { DialogTrigger } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { authClient } from '../../lib/auth-client';

export default function HeroBannerV2() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <section className="relative min-h-screen bg-primary overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large organic background shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[hsl(var(--primary))]/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-gradient-to-tr from-[hsl(var(--primary))]/10 to-transparent rounded-tr-full"></div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-1/4 w-16 h-16 bg-white/20 rounded-full"></div>
        <div className="absolute bottom-32 right-1/4 w-24 h-24 bg-white/15 rounded-full"></div>
        <div className="absolute top-1/2 left-10 w-8 h-8 bg-[#ffffff]/30 rounded-full"></div>
      </div>

      {/* Enhanced Navigation Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 transition-all duration-300 ease-in-out ${isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
        : 'bg-transparent py-6'
        }`}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className={`bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isScrolled ? 'w-10 h-10' : 'w-12 h-12'
            }`}>
            <Leaf className={`text-[hsl(var(--primary))] transition-all duration-300 ${isScrolled ? 'w-5 h-5' : 'w-6 h-6'
              }`} />
          </div>
          <span className={`font-bold text-xl transition-colors duration-300 ${isScrolled ? 'text-[hsl(var(--primary))]' : 'text-white'
            }`}>SumNSubstance</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center">
          <NavigationMenu>
            <NavigationMenuList className="space-x-1">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className={`${navigationMenuTriggerStyle()} transition-colors duration-300 font-medium ${isScrolled
                      ? 'text-gray-700 hover:text-[hsl(var(--primary))] bg-transparent hover:bg-gray-100'
                      : 'text-white hover:text-[#ffffff] bg-transparent hover:bg-white/10'
                      }`}
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/products"
                    className={`${navigationMenuTriggerStyle()} transition-colors duration-300 font-medium ${isScrolled
                      ? 'text-gray-700 hover:text-[hsl(var(--primary))] bg-transparent hover:bg-gray-100'
                      : 'text-white hover:text-[#ffffff] bg-transparent hover:bg-white/10'
                      }`}
                  >
                    Products
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/categories"
                    className={`${navigationMenuTriggerStyle()} transition-colors duration-300 font-medium ${isScrolled
                      ? 'text-gray-700 hover:text-[hsl(var(--primary))] bg-transparent hover:bg-gray-100'
                      : 'text-white hover:text-[#ffffff] bg-transparent hover:bg-white/10'
                      }`}
                  >
                    Categories
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/about"
                    className={`${navigationMenuTriggerStyle()} transition-colors duration-300 font-medium ${isScrolled
                      ? 'text-gray-700 hover:text-[hsl(var(--primary))] bg-transparent hover:bg-gray-100'
                      : 'text-white hover:text-[#ffffff] bg-transparent hover:bg-white/10'
                      }`}
                  >
                    About
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/contact"
                    className={`${navigationMenuTriggerStyle()} transition-colors duration-300 font-medium ${isScrolled
                      ? 'text-gray-700 hover:text-[hsl(var(--primary))] bg-transparent hover:bg-gray-100'
                      : 'text-white hover:text-[#ffffff] bg-transparent hover:bg-white/10'
                      }`}
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
          {/* Cart */}
          <CartDropdown isScrolled={isScrolled} />

          {/* User Account - Desktop */}
          {!isPending && session ? (
            <div className="hidden md:block">{isMounted && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full hover:bg-white/10"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={session.user.image ?? ''} alt={''} />
                      <AvatarFallback className="bg-white text-[hsl(var(--primary))] font-semibold">
                        {session.user.initials ?? ''}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-64 bg-white/95 backdrop-blur-sm"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {session.user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user.email}
                      </p>
                      {false && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mt-1 w-fit">
                          Admin
                        </span>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link href={session?.user.role === 'admin' ? '/dashboard/admin/' : '/dashboard/user/'} className="cursor-pointer">
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>

                  {/* <DropdownMenuItem asChild>
                    <Link
                      href={session?.user.role === 'admin' ? '/dashboard/admin/user/profile' : '/dashboard/user/profile'}
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
                    <DropdownMenuItem asChild>
                      <Link href={session?.user.role === 'admin' ? '/dashboard/admin' : '/dashboard/user'} className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-red-600 focus:text-red-600"
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
                      className={`relative p-2 rounded-full transition-all duration-300 ${isScrolled
                        ? 'hover:bg-gray-100'
                        : 'hover:bg-white/10'
                        }`}
                    >
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 ${isScrolled
                        ? 'bg-[hsl(var(--primary))] text-white'
                        : 'bg-white text-[hsl(var(--primary))]'
                        }`}>
                        <User className="w-5 h-5" />
                      </div>
                    </Button>
                  </DialogTrigger>
                }
              />
            )
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            {isMounted && (
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`p-2 transition-colors duration-300 ${isScrolled
                      ? 'text-gray-700 hover:text-[hsl(var(--primary))] hover:bg-gray-100'
                      : 'text-white hover:bg-white/10'
                      }`}
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[85vw] sm:w-80 bg-gradient-to-br from-white to-gray-50 p-0"
                >
                  <div className="flex flex-col h-full">
                    {/* Header with Gradient Background */}
                    <div className="bg-primary px-6 py-6 text-white">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Leaf className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white font-bold text-xl">
                          SumNSubstance
                        </span>
                      </div>

                      {/* User Section or Login Button */}
                      {!isPending && session ? (
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mt-2">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-12 w-12 ring-2 ring-white/30">
                              <AvatarImage src={session.user.image ?? ''} alt={session.user.name ?? ''} />
                              <AvatarFallback className="bg-white text-[hsl(var(--primary))] font-semibold">
                                {session.user.initials ?? ''}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold truncate text-white">
                                {session.user.name}
                              </p>
                              <p className="text-xs truncate text-white/80">
                                {session.user.email}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-2">
                          {isMounted && (
                            <AuthDialog
                              trigger={
                                <DialogTrigger asChild>
                                  <Button className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 h-12 font-medium shadow-lg">
                                    <User className="w-5 h-5 mr-2" />
                                    Login / Sign Up
                                  </Button>
                                </DialogTrigger>
                              }
                            />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Main Navigation */}
                    <nav className="flex-1 px-4 py-6 overflow-y-auto">
                      <div className="space-y-1">
                        <Link
                          href="/"
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-[hsl(var(--primary))] hover:text-white rounded-xl transition-all duration-200 font-medium group"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] group-hover:bg-white mr-3 transition-colors"></span>
                          Home
                        </Link>
                        <Link
                          href="/products"
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-[hsl(var(--primary))] hover:text-white rounded-xl transition-all duration-200 font-medium group"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] group-hover:bg-white mr-3 transition-colors"></span>
                          Products
                        </Link>
                        <Link
                          href="/categories"
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-[hsl(var(--primary))] hover:text-white rounded-xl transition-all duration-200 font-medium group"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] group-hover:bg-white mr-3 transition-colors"></span>
                          Categories
                        </Link>
                        <Link
                          href="/about"
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-[hsl(var(--primary))] hover:text-white rounded-xl transition-all duration-200 font-medium group"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] group-hover:bg-white mr-3 transition-colors"></span>
                          About
                        </Link>
                        <Link
                          href="/contact"
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-[hsl(var(--primary))] hover:text-white rounded-xl transition-all duration-200 font-medium group"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] group-hover:bg-white mr-3 transition-colors"></span>
                          Contact
                        </Link>
                      </div>

                      {/* Account Section - Only show when logged in */}
                      {!isPending && session && (
                        <>
                          <div className="my-6 border-t border-gray-200"></div>
                          <div className="space-y-1">
                            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                              Account
                            </p>
                            <Link
                              href={session?.user.role === 'admin' ? '/dashboard/admin' : '/dashboard/user'}
                              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <UserIcon className="w-5 h-5 mr-3 text-gray-400 group-hover:text-[hsl(var(--primary))] transition-colors" />
                              Dashboard
                            </Link>
                            {/* <Link
                              href="/dashboard/admin/user/profile"
                              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <Settings className="w-5 h-5 mr-3 text-gray-400 group-hover:text-[hsl(var(--primary))] transition-colors" />
                              Account Settings
                            </Link> */}
                            <Link
                              href={session?.user.role === 'admin' ? '/dashboard/admin/orders' : '/dashboard/user/orders'}
                              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <Package className="w-5 h-5 mr-3 text-gray-400 group-hover:text-[hsl(var(--primary))] transition-colors" />
                              Orders
                            </Link>
                          </div>
                        </>
                      )}
                    </nav>

                    {/* Logout Section - Only show when logged in */}
                    {!isPending && session && (
                      <div className="border-t border-gray-200 p-4 bg-white">
                        <Button
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
                          disabled={false}
                          variant="outline"
                          className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 h-12 font-medium"
                        >
                          <LogOut className="w-5 h-5 mr-2" />
                          Log out
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-120px)]">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
              <span className="w-2 h-2 bg-[#ffffff] rounded-full"></span>
              100% BIO & ORGANIC PRODUCT
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Natural
                <br />
                <span className="bg-white bg-clip-text text-transparent">
                  Beauty
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-white/90 leading-relaxed max-w-lg">
                Transform your skin with our premium collection of natural,
                organic skincare products designed for radiant, healthy beauty.
              </p>
            </div>

            {/* CTA Button */}
            <Button
              size="lg"
              className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] text-white px-8 py-6 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              DISCOVER MORE
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Right Product Display */}
          <div className="relative flex justify-center items-center">
            {/* Main Product Container */}
            <div className="relative">
              {/* Large background circle - Made bigger */}
              <div className="w-[500px] h-[500px] bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center relative overflow-hidden">
                {/* Product Image from Unsplash - Made bigger and better styled */}
                <div className="w-[450px] h-[450px] rounded-full overflow-hidden shadow-2xl relative border-4 border-white/30">
                  <Image
                    src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=800&fit=crop&crop=center"
                    alt="Natural Skincare Product"
                    fill
                    className="object-cover scale-110 hover:scale-125 transition-transform duration-700"
                    sizes="450px"
                  />
                  {/* Enhanced overlay for better product presentation */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[hsl(var(--primary))]/20"></div>

                  {/* Product highlight ring */}
                  <div className="absolute inset-8 rounded-full border-2 border-white/40 animate-pulse"></div>
                  <div className="absolute inset-16 rounded-full border border-[#ffffff]/30"></div>
                </div>

                {/* Enhanced floating natural elements - Positioned for bigger circle */}
                <div className="absolute -top-12 -left-12 w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300">
                  <Leaf className="w-12 h-12 text-[#ffffff]" />
                </div>

                <div className="absolute -bottom-12 -right-12 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300">
                  <Heart className="w-10 h-10 text-[#ffffff]" />
                </div>

                {/* Enhanced orbiting elements */}
                <div className="absolute top-16 right-16 w-8 h-8 bg-[#ffffff] rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute bottom-16 left-16 w-6 h-6 bg-white/80 rounded-full shadow-lg"></div>
                <div className="absolute top-1/2 left-8 w-4 h-4 bg-[#ffffff]/60 rounded-full"></div>
                <div className="absolute top-1/2 right-8 w-4 h-4 bg-white/60 rounded-full"></div>
              </div>

              {/* Enhanced floating badge - Repositioned for bigger layout */}
              <div className="absolute top-20 -right-16 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[hsl(var(--primary))] rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[hsl(var(--primary))]">
                      100% Natural
                    </div>
                    <div className="text-xs text-gray-600">
                      Certified Organic
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional product quality indicators */}
              <div className="absolute bottom-20 -left-16 bg-gradient-to-r from-[#ffffff]/90 to-[#ffffff]/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl transform hover:scale-105 transition-transform duration-300">
                <div className="text-center">
                  <div className="text-white font-bold text-lg">Premium</div>
                  <div className="text-white/90 text-xs">Quality</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-20 fill-white">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,69.3C960,85,1056,107,1152,112C1248,117,1344,107,1392,101.3L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
}
