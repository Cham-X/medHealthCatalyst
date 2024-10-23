'use client'

import React from 'react'
import { Control } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormFieldType } from '../forms/PatientForm'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from 'next/image'
import { Select, SelectContent, SelectTrigger, SelectValue } from './select'
import { Textarea } from './textarea'
import { Checkbox } from './checkbox'

interface CustomProps{
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?:(field:any) => React.ReactNode,
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
    const { fieldType, iconAlt, iconSrc, placeholder,showTimeSelect,dateFormat,renderSkeleton } = props;
    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className='flex rounded-md border border-dark-500 bg-dark-400'>
                    {iconSrc && (
                        <Image
                            src={iconSrc}
                            alt={iconAlt || "icon"}
                            height={24}
                            width={24}
                            className='ml-2'
                        />
                    )}
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            className='shad-input border-0'
                        />
                    </FormControl>
                </div>
            )
        case FormFieldType.PHONE_INPUT:
           return (
        <FormControl>
                   <PhoneInput
                       defaultCountry='US'
                       placeholder={placeholder}
                       international
                       withCountryCallingCode
                       value={field.value as E164Number || undefined}
                       onChange={field.onChange}
                       className='input-phone'
                   />
        </FormControl>
            )
        case FormFieldType.TEXTAREA:
            return (
                <FormControl>
                    <Textarea
                        placeholder={placeholder}
                        {...field}
                        className='shad-textArea'
                        disabled={props.disabled}
                    />
                </FormControl>
            )
        case FormFieldType.CHECKBOX:
            return (
                <FormControl>
                    <div className='flex items-center gap-4'>
                        <Checkbox
                            id={props.name}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                        <label htmlFor={props.name} className="checked-label">
                            {props.label}
                        </label>
                    </div>
                </FormControl>
            )
        case FormFieldType.DATE_PICKER:
            return (
                <div className='flex rounded-md border border-dark-500 bg-dark-400'>
                    <Image
                        src="/assets/icons/calendar.svg"
                        height={24}
                        width={24}
                        alt="calendar"
                        className='ml-2'
                    />
                    <FormControl>
                        <DatePicker
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            dateFormat={dateFormat ?? 'MM/dd/YYYY'}
                            showTimeSelect={showTimeSelect ?? false}
                            timeInputLabel='Time:'
                            wrapperClassName="date-picker"
                        />
                    </FormControl>
                </div>
            )
        case FormFieldType.SKELETON:
            return (
                renderSkeleton? renderSkeleton(field):null
            )
        case FormFieldType.SELECT:
            return (
                <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl
                            className='shad-select-trigger'
                        >
                            <SelectTrigger>
                            <SelectValue placeholder={ placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent
                            className='shad-select-content text-dark-700'>
                            {props.children}
                            </SelectContent>
                    </Select>
                </FormControl>
            )       
    }
}

const CustomFormField = (props: CustomProps) => {
    const { control, fieldType, name, label } = props;
  return (
     <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className='flex-1'>
                  {fieldType !== FormFieldType.CHECKBOX && label && (
                      <FormLabel>{label }</FormLabel>
                  )}

                  <RenderInput field={field} props={props} />

                  <FormMessage className='shad-error'/>
            </FormItem>
          )}
        />
  )
}

export default CustomFormField