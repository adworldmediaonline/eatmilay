'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Plus,
  Download,
  Filter,
  MoreHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

export interface PageHeaderProps {
  title?: string;
  description?: string;
  backButton?: {
    href: string;
    label?: string;
  };
  actions?: {
    primary?: React.ReactNode;
    secondary?: React.ReactNode[];
    dropdown?: {
      label: string;
      items: Array<{
        label: string;
        onClick: () => void;
        icon?: React.ElementType;
        destructive?: boolean;
      }>;
    };
  };
  badges?: Array<{
    label: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    color?: string;
  }>;
  stats?: Array<{
    label: string;
    value: string | number;
    description?: string;
  }>;
  children?: React.ReactNode;
}

export default function PageHeader({
  title,
  description,
  backButton,
  actions,
  badges,
  stats,
  children,
}: PageHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          {/* Back Button */}
          {backButton && (
            <div className="flex items-center gap-2 mb-2">
              <Button variant="ghost" size="sm" asChild>
                <Link
                  href={backButton.href}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {backButton.label || 'Back'}
                </Link>
              </Button>
            </div>
          )}

          {/* Title and Description */}
          <div className="space-y-1">
            {title && (
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                {badges && badges.length > 0 && (
                  <div className="flex items-center gap-2">
                    {badges.map((badge, index) => (
                      <Badge
                        key={index}
                        variant={badge.variant || 'default'}
                        className={
                          badge.color
                            ? `bg-${badge.color}-100 text-${badge.color}-800`
                            : ''
                        }
                      >
                        {badge.label}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            )}
            {description && (
              <p className="text-muted-foreground max-w-2xl">{description}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        {actions && (
          <div className="flex items-center gap-2 flex-wrap">
            {actions.secondary && actions.secondary.length > 0 && (
              <>
                <div className="flex items-center gap-2">
                  {actions.secondary.map((action, index) => (
                    <React.Fragment key={index}>{action}</React.Fragment>
                  ))}
                </div>
                <Separator orientation="vertical" className="h-6" />
              </>
            )}

            {actions.dropdown && (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="w-4 h-4 mr-2" />
                      {actions.dropdown.label}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {actions.dropdown.items.map((item, index) => (
                      <DropdownMenuItem
                        key={index}
                        onClick={item.onClick}
                        className={
                          item.destructive
                            ? 'text-destructive focus:text-destructive'
                            : ''
                        }
                      >
                        {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                        {item.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {actions.primary && (
                  <Separator orientation="vertical" className="h-6" />
                )}
              </>
            )}

            {actions.primary && (
              <div className="flex items-center">{actions.primary}</div>
            )}
          </div>
        )}
      </div>

      {/* Stats Section */}
      {stats && stats.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-card rounded-lg border p-4 space-y-2"
            >
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm font-medium">{stat.label}</div>
              {stat.description && (
                <div className="text-xs text-muted-foreground">
                  {stat.description}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Custom Content */}
      {children && <div>{children}</div>}
    </div>
  );
}

// Pre-configured action buttons for common use cases
export const PageHeaderActions = {
  // Common primary actions
  AddNew: ({ href, label = 'Add New' }: { href: string; label?: string }) => (
    <Button asChild>
      <Link href={href}>
        <Plus className="w-4 h-4 mr-2" />
        {label}
      </Link>
    </Button>
  ),

  Export: ({
    onClick,
    label = 'Export',
  }: {
    onClick: () => void;
    label?: string;
  }) => (
    <Button variant="outline" onClick={onClick}>
      <Download className="w-4 h-4 mr-2" />
      {label}
    </Button>
  ),

  Filter: ({
    onClick,
    label = 'Filter',
  }: {
    onClick: () => void;
    label?: string;
  }) => (
    <Button variant="outline" onClick={onClick}>
      <Filter className="w-4 h-4 mr-2" />
      {label}
    </Button>
  ),
};
