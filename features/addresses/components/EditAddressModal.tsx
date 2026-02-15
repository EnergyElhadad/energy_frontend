/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useForm, Controller, useWatch, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Textarea } from '@/shared/components/ui/textarea';
import { useEditAddress } from '../hooks/useEditAddress';
import { useAddress } from '../hooks/useAddress';
import { useEffect, useState, useCallback } from 'react';
import { getCities, getCountries, Country, City } from '@/shared/services/location';

const addressSchema = z.object({
  country_id: z.string().min(1, 'Country is required'),
  city_id: z.string().min(1, 'City is required'),
  area: z.string().min(1, 'Area is required'),
  street: z.string().min(1, 'Street is required'),
  building: z.string().min(1, 'Building is required'),
  apartment: z.string().min(1, 'Apartment is required'),
  notes: z.string().optional(),
  is_default: z.boolean().optional(),
});

type AddressFormValues = z.infer<typeof addressSchema>;

interface EditAddressModalProps {
  addressId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditAddressModal = ({ addressId, open, onOpenChange }: EditAddressModalProps) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const { data: addressData, isLoading: isLoadingAddress } = useAddress(addressId);
  const { mutate: editAddress, isPending } = useEditAddress();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      is_default: false,
      notes: '',
    },
  });

  const selectedCountryId = useWatch({
    control,
    name: 'country_id',
  });

  const fetchCities = useCallback((countryId: string | number) => {
    if (!countryId) {
      setCities([]);
      return;
    }
    getCities(Number(countryId))
      .then(data => setCities(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  useEffect(() => {
    getCountries().then(setCountries).catch(console.error);
  }, []);

  // Populate form when address data is loaded
  useEffect(() => {
    if (addressData && open) {
      setValue('area', addressData.area);
      setValue('street', addressData.street);
      setValue('building', addressData.building);
      setValue('apartment', addressData.apartment);
      setValue('notes', addressData.notes);
      setValue('is_default', addressData.is_default);

      if ((addressData as any).city?.country_id) {
        const countryId = String((addressData as any).city.country_id);
        setValue('country_id', countryId);
        setValue('city_id', String(addressData.city.id));
        getCities(Number(countryId))
          .then(data => setCities(Array.isArray(data) ? data : []))
          .catch(console.error);
      }
    }
  }, [addressData, open, setValue]);

  const onSubmit: SubmitHandler<AddressFormValues> = data => {
    if (!addressId) return;

    editAddress(
      {
        id: addressId,
        data: {
          city_id: Number(data.city_id),
          area: data.area,
          street: data.street,
          building: data.building,
          apartment: data.apartment,
          notes: data.notes || '',
          is_default: data.is_default || false,
        },
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          reset();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>تعديل العنوان</DialogTitle>
        </DialogHeader>
        {isLoadingAddress ? (
          <div className="py-8 text-center">جاري تحميل البيانات...</div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="country">الدولة</Label>
                <Controller
                  control={control}
                  name="country_id"
                  render={({ field }) => (
                    <Select
                      onValueChange={val => {
                        field.onChange(val);
                        fetchCities(val);
                        setValue('city_id', '');
                      }}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الدولة" />
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
                <Label htmlFor="city">المدينة</Label>
                <Controller
                  control={control}
                  name="city_id"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value} disabled={!selectedCountryId}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المدينة" />
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
              <Label htmlFor="area">المنطقة</Label>
              <Input id="area" {...register('area')} />
              {errors.area && <p className="text-sm text-red-500">{errors.area.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="street">الشارع</Label>
              <Input id="street" {...register('street')} />
              {errors.street && <p className="text-sm text-red-500">{errors.street.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="building">رقم المبنى</Label>
                <Input id="building" {...register('building')} />
                {errors.building && <p className="text-sm text-red-500">{errors.building.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="apartment">رقم الشقة</Label>
                <Input id="apartment" {...register('apartment')} />
                {errors.apartment && <p className="text-sm text-red-500">{errors.apartment.message}</p>}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">ملاحظات</Label>
              <Textarea id="notes" {...register('notes')} />
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="is_default" className="accent-primary h-4 w-4" {...register('is_default')} />
              <Label htmlFor="is_default">جعل هذا العنوان افتراضي</Label>
            </div>

            <Button type="submit" disabled={isPending}>
              {isPending ? 'جاري الحفظ...' : 'حفظ التعديلات'}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
