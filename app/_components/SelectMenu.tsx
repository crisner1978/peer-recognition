'use client'

import React, { FC } from 'react'
import { useController } from 'react-hook-form'
import { cn } from '../_utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './fields/select'

interface SelectMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  options: string[]
  control: any
  name: string
  rules?: any
  placeholder?: string
}

const SelectMenu: FC<SelectMenuProps> = (props: any) => {
  const { property, options, name, className, placeholder } = props
  const method = useController(props)

  return (
    <div className={cn('h-full', className)} {...props}>
      <label
        className='sm:text-sm font-medium leading-4 text-primary-detail mb-5 whitespace-nowrap font-mont'
        htmlFor={name}>
        {placeholder ?? name}
      </label>
      <Select value={method.field.value} name={name} onValueChange={method.field.onChange}>
        <SelectTrigger id={name} className='!bg-background capitalize h-[52px] sm:h-10'>
          <SelectValue placeholder={property ?? name} className='capitalize' />
        </SelectTrigger>
        <SelectContent className='max-h-60 bg-background'>
          {options?.map((option: any, i: React.Key) => (
            <SelectItem
              key={option.id}
              value={option.id + ' ' + option.name}
              className='capitalize'>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectMenu
