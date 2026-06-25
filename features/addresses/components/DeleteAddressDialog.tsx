'use client';

import { useTranslations } from 'next-intl';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog';

interface DeleteAddressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isPending: boolean;
}

export const DeleteAddressDialog = ({ open, onOpenChange, onConfirm, isPending }: DeleteAddressDialogProps) => {
  const t = useTranslations('Addresses');
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('delete_confirm_title')}</AlertDialogTitle>
          <AlertDialogDescription>{t('delete_confirm_desc')}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>{t('cancel')}</AlertDialogCancel>
          <AlertDialogAction
            onClick={e => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={isPending}
            className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-600 focus:ring-offset-red-600"
          >
            {isPending ? t('deleting') : t('delete')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
