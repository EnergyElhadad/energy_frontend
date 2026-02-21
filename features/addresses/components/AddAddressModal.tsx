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
import { useEffect, useState } from 'react';
import { getCities, getCountries, Country, City } from '@/shared/services/location';
import { AddAddressIcon } from '@/shared/components/icons/social/AddAddress';

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

type AddressFormValues = z.input<typeof addressSchema>;

export const AddAddressModal = () => {
  const [open, setOpen] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const { mutate: addAddress, isPending } = useAddAddress();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
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
    getCountries().then(setCountries).catch(console.error);
  }, []);

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
        building: data.building,
        apartment: data.apartment,
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
          <AddAddressIcon /> إضافة عنوان جديد
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>إضافة عنوان جديد</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="country">الدولة</Label>
              <Controller
                control={control}
                name="country_id"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
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
            {isPending ? 'جاري الحفظ...' : 'حفظ العنوان'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
