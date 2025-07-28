'use client';

import { ReactNode } from 'react';
import { ArrowLeft, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface AdminFormLayoutProps {
  title: string;
  description?: string;
  backUrl: string;
  backLabel?: string;
  actions?: ReactNode;
  children: ReactNode;
  sidebar?: ReactNode;
  className?: string;
}

export function AdminFormLayout({
  title,
  description,
  backUrl,
  backLabel = 'Voltar',
  actions,
  children,
  sidebar,
  className,
}: AdminFormLayoutProps) {
  return (
    <div className={cn('container mx-auto px-4 py-8', className)}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <Link href={backUrl}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {backLabel}
            </Button>
          </Link>
          
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-2">{description}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              {children}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        {sidebar && (
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {sidebar}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Componente para cards da sidebar
interface SidebarCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  icon?: LucideIcon;
}

export function SidebarCard({ title, children, className, icon: Icon }: SidebarCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center">
          {Icon && <Icon className="h-4 w-4 mr-2" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  );
}