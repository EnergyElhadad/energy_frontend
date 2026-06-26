'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { getCountries, getCities, Country, City } from '@/shared/services/location';

// Messages are localized, so build the schema with the `t` translator. Typing
// the param as the translator keeps the message keys type-checked, and the
// inferred value type is stable regardless of locale.
const makeGuestCheckoutSchema = (t: ReturnType<typeof useTranslations<'Checkout'>>) =>
  z.object({
    first_name: z.string().min(1, t('first_name_required')),
    last_name: z.string().min(1, t('last_name_required')),
    company_name: z.string().optional(),
    country_id: z.string().min(1, t('country_required')),
    city_id: z.string().min(1, t('city_required')),
    area: z.string().min(1, t('area_required')),
    street: z.string().min(1, t('street_required')),
    building: z.string().optional(),
    apartment: z.string().optional(),
    phone_number: z.string().min(1, t('phone_required')),
    email: z.string().email(t('email_invalid')).optional().or(z.literal('')),
    notes: z.string().optional(),
  });

export type GuestCheckoutFormValues = z.infer<ReturnType<typeof makeGuestCheckoutSchema>>;

export const useGuestCheckoutForm = () => {
  const t = useTranslations('Checkout');
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  // Rebuild with localized messages whenever the translator changes.
  const schema = useMemo(() => makeGuestCheckoutSchema(t), [t]);

  const form = useForm<GuestCheckoutFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      first_name: '',
      last_name: '',
      company_name: '',
      country_id: '',
      city_id: '',
      area: '',
      street: '',
      building: '',
      apartment: '',
      phone_number: '',
      email: '',
      notes: '',
    },
  });

  const selectedCountryId = form.watch('country_id');

  useEffect(() => {
    getCountries()
      .then(list => {
        setCountries(list);
        // Default to Egypt. Name is localized by Accept-Language, so match both.
        const egypt = list.find(c => c.name === 'مصر' || /egypt/i.test(c.name));
        if (egypt && !form.getValues('country_id')) {
          form.setValue('country_id', String(egypt.id));
        }
      })
      .catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedCountryId) {
      getCities(Number(selectedCountryId))
        .then(data => setCities(Array.isArray(data) ? data : []))
        .catch(console.error);
      form.setValue('city_id', '');
    } else {
      setCities([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountryId]);

  return { form, countries, cities };
};
