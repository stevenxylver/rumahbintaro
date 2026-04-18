'use client'

import { sendGAEvent } from '@next/third-parties/google'

/**
 * Tracks a WhatsApp click event to Google Analytics.
 * @param location - Where the click happened (e.g., 'Navbar', 'Property Detail')
 */
export const trackWhatsAppClick = (location: string) => {
    sendGAEvent({
        event: 'click_whatsapp',
        value: location,
        location: location,
    })
    console.log(`GA4 Event: click_whatsapp from ${location}`)
}

/**
 * Tracks a Lead Form submission event.
 */
export const trackLeadForm = (location: string) => {
    sendGAEvent({
        event: 'generate_lead',
        value: location,
        location: location,
    })
    console.log(`GA4 Event: generate_lead from ${location}`)
}

/**
 * Tracks when the Promo/Gift icon is clicked to view the promotion.
 */
export const trackPromoView = (location: string) => {
    sendGAEvent({
        event: 'view_promotion',
        value: location,
        location: location,
    })
    console.log(`GA4 Event: view_promotion from ${location}`)
}
