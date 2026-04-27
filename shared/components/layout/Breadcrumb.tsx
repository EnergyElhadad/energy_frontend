import { Link } from '@/core/i18n';
import React from 'react';
import { useTranslations } from 'next-intl';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  homeAsFirstItem?: boolean;
  className?: string;
}

export const Breadcrumb = ({ items, separator = '/', homeAsFirstItem = false, className = '' }: BreadcrumbProps) => {
  const t = useTranslations('Common');

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {homeAsFirstItem && (
        <React.Fragment>
          <Link href="/" className="text-signalGray hover:text-primary text-[16px]">
            {t('home')}
          </Link>
          <span className="text-signalGray mx-0.5">{separator}</span>
        </React.Fragment>
      )}
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.href ? (
            <Link href={item.href} className="text-signalGray hover:text-primary text-[16px]">
              {item.label}
            </Link>
          ) : (
            <span className="text-signalGray text-[16px]">{item.label}</span>
          )}
          {index < items.length - 1 && <span className="text-signalGray mx-0.5">{separator}</span>}
        </React.Fragment>
      ))}
    </div>
  );
};
