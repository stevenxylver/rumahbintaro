import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
    if (price >= 1_000_000_000) {
        return `Rp ${(price / 1_000_000_000).toFixed(1)} M`
    }
    if (price >= 1_000_000) {
        return `Rp ${(price / 1_000_000).toFixed(0)} Juta`
    }
    return `Rp ${price.toLocaleString('id-ID')}`
}

export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
}

export function parseImages(images: string): string[] {
    try {
        return JSON.parse(images)
    } catch {
        return []
    }
}
