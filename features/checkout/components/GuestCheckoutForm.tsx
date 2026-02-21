'use client';

import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { Controller } from 'react-hook-form';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Textarea } from '@/shared/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { useGuestCheckoutForm, GuestCheckoutFormValues } from '../hooks/useGuestCheckoutForm';

export interface GuestCheckoutFormRef {
  validate: () => Promise<GuestCheckoutFormValues | null>;
}

interface GuestCheckoutFormProps {
  onCityChange?: (cityId: number | null) => void;
}

export const GuestCheckoutForm = forwardRef<GuestCheckoutFormRef, GuestCheckoutFormProps>(({ onCityChange }, ref) => {
  const { form, countries, cities } = useGuestCheckoutForm();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const watchedCityId = form.watch('city_id');

  useEffect(() => {
    onCityChange?.(watchedCityId ? Number(watchedCityId) : null);
  }, [watchedCityId, onCityChange]);

  useImperativeHandle(ref, () => ({
    validate: () =>
      new Promise<GuestCheckoutFormValues | null>(resolve => {
        handleSubmit(
          data => resolve(data),
          () => resolve(null)
        )();
      }),
  }));

  return (
    <>
      <h2 className="text-base font-bold text-black">عنوان التوصيل</h2>

      <div className="flex flex-col gap-4">
        {/* First Name + Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="first_name" className="text-sm font-semibold text-black">
              الاسم الأول
            </Label>
            <Input id="first_name" {...register('first_name')} className="bg-Background border-Stroke rounded-sm border" autoComplete="given-name" />
            {errors.first_name && <p className="text-sm text-red-500">{errors.first_name.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="last_name" className="text-sm font-semibold text-black">
              الاسم الثاني
            </Label>
            <Input id="last_name" {...register('last_name')} className="bg-Background border-Stroke rounded-sm border" autoComplete="family-name" />
            {errors.last_name && <p className="text-sm text-red-500">{errors.last_name.message}</p>}
          </div>
        </div>

        {/* Company Name (optional) */}
        <div className="grid gap-2">
          <Label htmlFor="company_name" className="text-sm font-semibold text-black">
            اسم الشركة (اختياري)
          </Label>
          <Input id="company_name" {...register('company_name')} className="bg-Background border-Stroke rounded-sm border" autoComplete="organization" />
        </div>

        {/* Country */}
        <div className="grid gap-2">
          <Label htmlFor="country_id" className="text-sm font-semibold text-black">
            البلد
          </Label>
          <Controller
            control={control}
            name="country_id"
            render={({ field }) => (
              <Select dir="rtl" onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="bg-Background border-Stroke rounded-sm border">
                  <SelectValue placeholder="اختر البلد" />
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

        {/* City */}
        <div className="grid gap-2">
          <Label htmlFor="city_id" className="text-sm font-semibold text-black">
            المدينة
          </Label>
          <Controller
            control={control}
            name="city_id"
            render={({ field }) => (
              <Select dir="rtl" onValueChange={field.onChange} value={field.value} disabled={!form.watch('country_id')}>
                <SelectTrigger className="bg-Background border-Stroke rounded-sm border">
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

        {/* Area */}
        <div className="grid gap-2">
          <Label htmlFor="area" className="text-sm font-semibold text-black">
            المنطقة
          </Label>
          <Input id="area" {...register('area')} className="bg-Background border-Stroke rounded-sm border" />
          {errors.area && <p className="text-sm text-red-500">{errors.area.message}</p>}
        </div>

        {/* Street */}
        <div className="grid gap-2">
          <Label htmlFor="street" className="text-sm font-semibold text-black">
            عنوان الشارع
          </Label>
          <Input id="street" {...register('street')} className="bg-Background border-Stroke rounded-sm border" autoComplete="street-address" />
          {errors.street && <p className="text-sm text-red-500">{errors.street.message}</p>}
        </div>

        {/* Building + Apartment */}
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="building" className="text-sm font-semibold text-black">
              رقم المبنى
            </Label>
            <Input id="building" {...register('building')} className="bg-Background border-Stroke rounded-sm border" />
            {errors.building && <p className="text-sm text-red-500">{errors.building.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="apartment" className="text-sm font-semibold text-black">
              رقم الشقة
            </Label>
            <Input id="apartment" {...register('apartment')} className="bg-Background border-Stroke rounded-sm border" />
            {errors.apartment && <p className="text-sm text-red-500">{errors.apartment.message}</p>}
          </div>
        </div>

        {/* Phone */}
        <div className="grid gap-2">
          <Label htmlFor="phone_number" className="text-sm font-semibold text-black">
            رقم الموبايل
          </Label>
          <Input id="phone_number" {...register('phone_number')} className="bg-Background border-Stroke rounded-sm border" autoComplete="tel" />
          {errors.phone_number && <p className="text-sm text-red-500">{errors.phone_number.message}</p>}
        </div>

        {/* Email */}
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-sm font-semibold text-black">
            الايميل
          </Label>
          <Input id="email" type="email" {...register('email')} className="bg-Background border-Stroke rounded-sm border" autoComplete="email" />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        {/* Notes */}
        <div className="grid gap-2">
          <Label htmlFor="notes" className="text-sm font-semibold text-black">
            ملاحظات الطلب
          </Label>
          <Textarea id="notes" {...register('notes')} className="bg-Background border-Stroke min-h-24 resize-none rounded-sm border" rows={4} />
        </div>
      </div>
    </>
  );
});

GuestCheckoutForm.displayName = 'GuestCheckoutForm';
