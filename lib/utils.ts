import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
export const runtime = 'experimental-edge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
