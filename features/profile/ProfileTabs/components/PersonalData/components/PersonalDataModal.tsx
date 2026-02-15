'use client';

import { useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/Button';

// ... imports

interface PersonalDataModalProps {
  trigger: React.ReactNode;
  title?: string;
  initialValue?: string;
  onSave?: (value: string) => Promise<void> | void;
  type?: string;
}

export const PersonalDataModal = ({ trigger, title = 'تعديل', initialValue = '', onSave, type = 'text' }: PersonalDataModalProps) => {
  const [value, setValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (onSave) {
        await onSave(value);
      }
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
        setOpen(false);
      }, 1500);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="flex max-w-[480px] flex-col rounded-3xl border-0 bg-white p-0 shadow-2xl">
        <DialogTitle className="sr-only">{title}</DialogTitle>

        <div className="relative p-10">
          <h2 className="mb-2 text-sm font-semibold text-black">{title}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Input
                type={type}
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder=" "
                dir={type === 'email' ? 'ltr' : 'rtl'}
                required
                className="bg-Background border-Stroke text-WetGray h-11.25 rounded-sm border text-base font-bold"
              />
            </div>

            <Button type="submit" disabled={isLoading} className="h-11.25 w-full">
              <span className="relative z-10">{isSaved ? ' تم الحفظ' : isLoading ? 'جاري الحفظ...' : 'حفظ'}</span>
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
