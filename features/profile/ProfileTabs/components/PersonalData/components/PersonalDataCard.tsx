import { Button } from '@/shared/components/ui/Button';
import React from 'react';
import { PersonalDataModal } from './PersonalDataModal';

// ... imports

type PersonalDataCardProps = {
  title: string;
  subtitle: string;
  onClick?: () => void;
  onSave?: (value: string) => Promise<void>;
  modalTitle?: string;
  inputType?: string;
  customModal?: React.ReactNode;
};

export const PersonalDataCard: React.FC<PersonalDataCardProps> = ({ title, subtitle, onSave, modalTitle, inputType = 'text', customModal }) => {
  return (
    <div className="border-Stroke xs:flex-row xs:items-center flex flex-col justify-between gap-y-3 rounded-md border px-6 py-4">
      <div>
        <h3 className="text-WetGray mb-2 text-sm font-semibold">{title}</h3>
        <p className="text-WetGray text-bold text-base">{subtitle}</p>
      </div>

      {customModal ? (
        customModal
      ) : (
        <PersonalDataModal
          trigger={
            <Button variant={'outline'} className="border-signalGray text-signalGray rounded-sm border px-4 py-1 text-sm leading-relaxed font-medium">
              تعديل
            </Button>
          }
          title={modalTitle || `تعديل ${title}`}
          initialValue={subtitle}
          onSave={onSave}
          type={inputType}
        />
      )}
    </div>
  );
};
