import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const snakeCaseToHumanCase = (input: string) => {
  const words = input.split('_')
  const humanCase = words.map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ')

  return humanCase
}
