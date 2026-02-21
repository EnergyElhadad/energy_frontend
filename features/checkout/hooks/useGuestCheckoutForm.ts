'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getCountries, getCities, Country, City } from '@/shared/services/location';

const guestCheckoutSchema = z.object({
  first_name: z.string().min(1, 'الاسم الأول مطلوب'),
  last_name: z.string().min(1, 'الاسم الثاني مطلوب'),
  company_name: z.string().optional(),
  country_id: z.string().min(1, 'البلد مطلوب'),
  city_id: z.string().min(1, 'المدينة مطلوبة'),
  area: z.string().min(1, 'المنطقة مطلوبة'),
  street: z.string().min(1, 'عنوان الشارع مطلوب'),
  building: z.string().min(1, 'رقم المبنى مطلوب'),
  apartment: z.string().min(1, 'رقم الشقة مطلوب'),
  phone_number: z.string().min(1, 'رقم الموبايل مطلوب'),
  email: z.string().email('الايميل غير صالح'),
  notes: z.string().optional(),
});

export type GuestCheckoutFormValues = z.infer<typeof guestCheckoutSchema>;

export const useGuestCheckoutForm = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const form = useForm<GuestCheckoutFormValues>({
    resolver: zodResolver(guestCheckoutSchema),
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
    getCountries().then(setCountries).catch(console.error);
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
