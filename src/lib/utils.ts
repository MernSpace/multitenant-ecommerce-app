import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function generateTenantURL(tenantSlug: string) {

  if (process.env.NODE_ENV === "development") {
    return `${process.env.NEXT_PUBLIC_ROOTDOMAIN}/tenants/${tenantSlug}`
  }

  const protocol = "https";
  const domain = process.env.NEXT_PUBLIC_ROOTDOMAIN!
  // if (process.env.NODE_ENV === "development") {
  //   protocol = "http"
  // }

  return `${protocol}://${tenantSlug}.${domain}`
}

export function formatCurrency(value: number | string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(Number(value))
}