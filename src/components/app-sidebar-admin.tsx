'use client';

import * as React from 'react';
import {

  IconDashboard,
  IconInnerShadowTop,
  IconPackage,
  IconCategory,
  IconShoppingCart,
  IconStar,
} from '@tabler/icons-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard/admin',
      icon: IconDashboard,
    },
    {
      title: 'Categories',
      url: '/dashboard/admin/categories',
      icon: IconCategory,
    },
    {
      title: 'Products',
      url: '/dashboard/admin/products',
      icon: IconPackage,
    },
    {
      title: 'Orders',
      url: '/dashboard/admin/orders',
      icon: IconShoppingCart,
    },
    {
      title: 'Reviews',
      url: '/dashboard/admin/reviews',
      icon: IconStar,
    },

  ],

};

export function AppSidebarAdmin({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Visit Website.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
