'use client';

import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Textarea } from '@/shared/components/ui/textarea';
import { useAddAddress } from '../hooks/useAddAddress';
import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { getCities, getCountries, Country, City } from '@/shared/services/location';
import { AddAddressIcon } from '@/shared/components/icons/social/AddAddress';

const makeAddressSchema = (t: ReturnType<typeof useTranslations<'Addresses'>>) =>
  z.object({
    country_id: z.string().min(1, t('country_required')),
    city_id: z.string().min(1, t('city_required')),
    area: z.string().min(1, t('area_required')),
    street: z.string().min(1, t('street_required')),
    building: z.string().optional(),
    apartment: z.string().optional(),
    notes: z.string().optional(),
    is_default: z.boolean().optional(),
  });

type AddressFormValues = z.input<ReturnType<typeof makeAddressSchema>>;

export const AddAddressModal = () => {
  const t = useTranslations('Addresses');
  const [open, setOpen] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const { mutate: addAddress, isPending } = useAddAddress();

  const addressSchema = useMemo(() => makeAddressSchema(t), [t]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      is_default: false,
      notes: '',
    },
  });

  const selectedCountryId = watch('country_id');

  useEffect(() => {
    getCountries()
      .then(list => {
        setCountries(list);
        // Default to Egypt. Name is localized by Accept-Language, so match both.
        const egypt = list.find(c => c.name === 'مصر' || /egypt/i.test(c.name));
        if (egypt && !getValues('country_id')) {
          setValue('country_id', String(egypt.id));
        }
      })
      .catch(console.error);
  }, [setValue, getValues]);

  useEffect(() => {
    if (selectedCountryId) {
      getCities(Number(selectedCountryId))
        .then(data => setCities(Array.isArray(data) ? data : []))
        .catch(console.error);
    } else {
      setCities([]);
    }
  }, [selectedCountryId]);

  const onSubmit = (data: AddressFormValues) => {
    addAddress(
      {
        city_id: Number(data.city_id),
        area: data.area,
        street: data.street,
        building: data.building || '',
        apartment: data.apartment || '',
        notes: data.notes || '',
        is_default: data.is_default ?? false,
      },
      {
        onSuccess: () => {
          setOpen(false);
          reset();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-primary text-primary hover:bg-primary xs:w-62.5 mt-4 flex h-10.5 w-full items-center justify-center gap-2 rounded-sm border px-4 py-2 text-sm font-semibold transition hover:text-white"
        >
          <AddAddressIcon /> {t('add_new_address')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('add_new_address')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="country"> {t('country')} <span className="text-red-500">*</span></Label>
              <Controller
                control={control}
                name="country_id"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('select_country')} />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map(country => (
                        <SelectItem key={country.id} value={String(country.id)}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.country_id && <p className="text-sm text-red-500">{errors.country_id.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="city">{t('city')} <span className="text-red-500">*</span></Label>
              <Controller
                control={control}
                name="city_id"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value} disabled={!selectedCountryId}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('select_city')} />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.isArray(cities) &&
                        cities.map(city => (
                          <SelectItem key={city.id} value={String(city.id)}>
                            {city.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.city_id && <p className="text-sm text-red-500">{errors.city_id.message}</p>}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="area">{t('area')} <span className="text-red-500">*</span></Label>
            <Input id="area" {...register('area')} />
            {errors.area && <p className="text-sm text-red-500">{errors.area.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="street">{t('street')} <span className="text-red-500">*</span></Label>
            <Input id="street" {...register('street')} />
            {errors.street && <p className="text-sm text-red-500">{errors.street.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="building">{t('building')}</Label>
              <Input id="building" {...register('building')} />
              {errors.building && <p className="text-sm text-red-500">{errors.building.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="apartment">{t('apartment')}</Label>
              <Input id="apartment" {...register('apartment')} />
              {errors.apartment && <p className="text-sm text-red-500">{errors.apartment.message}</p>}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes">{t('notes')}</Label>
            <Textarea id="notes" {...register('notes')} />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="is_default" className="accent-primary h-4 w-4" {...register('is_default')} />
            <Label htmlFor="is_default">{t('make_default')}</Label>
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? t('saving') : t('save_address')}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
