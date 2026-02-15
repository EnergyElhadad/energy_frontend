import { useEffect, useRef } from 'react';
import { UseFormSetValue, Control, useWatch, Path, FieldValues } from 'react-hook-form';

interface UseFormPersistenceOptions<T extends FieldValues> {
  setValue: UseFormSetValue<T>;
  control: Control<T>;
  storageKey: string;
  exclude?: Path<T>[];
  storageType?: 'sessionStorage' | 'localStorage';
}

export function useFormPersistence<T extends FieldValues>({ setValue, control, storageKey, exclude = [], storageType = 'sessionStorage' }: UseFormPersistenceOptions<T>) {
  const storage = typeof window !== 'undefined' ? window[storageType] : null;
  const initialized = useRef(false);
  const excludeStr = JSON.stringify(exclude);

  // Restore data on mount
  useEffect(() => {
    if (!storage || initialized.current) return;

    const savedData = storage.getItem(storageKey);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        Object.keys(parsedData).forEach(key => {
          const fieldName = key as Path<T>;
          const currentExclude = JSON.parse(excludeStr) as Path<T>[];
          if (!currentExclude.includes(fieldName)) {
            setValue(fieldName, parsedData[key]);
          }
        });
        initialized.current = true;
      } catch (error) {
        console.error('Error parsing persisted form data:', error);
      }
    }
  }, [setValue, storageKey, excludeStr, storage]);

  // Watch and save data
  const watchedValues = useWatch({ control });

  useEffect(() => {
    if (!storage) return;

    const dataToSave = { ...watchedValues };
    const currentExclude = JSON.parse(excludeStr) as Path<T>[];
    currentExclude.forEach(key => {
      delete dataToSave[key as keyof typeof dataToSave];
    });

    storage.setItem(storageKey, JSON.stringify(dataToSave));
  }, [watchedValues, storageKey, excludeStr, storage]);

  return watchedValues;
}
