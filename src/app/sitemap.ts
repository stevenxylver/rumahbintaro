import { MetadataRoute } from 'next'
import { areas } from '@/data/areas'
import { kavlings } from '@/data/kavlings'
import { blogPosts } from '@/data/blog'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://perumahanbintarojaya.com'

    // Static routes
    const routes = [
        '',
        '/properties',
        '/kavling',
        '/about',
        '/contact',
        '/blog',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic property pages
    const propertyPages = areas.map((area) => ({
        url: `${baseUrl}/properties/${area.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    // Dynamic kavling pages
    const kavlingPages = kavlings.map((kavling) => ({
        url: `${baseUrl}/kavling/${kavling.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    // Dynamic blog pages
    const blogPages = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
    }))

    return [...routes, ...propertyPages, ...kavlingPages, ...blogPages]
}
