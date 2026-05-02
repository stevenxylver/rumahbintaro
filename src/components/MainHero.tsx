'use client'

import React, { useState, useEffect } from 'react'

export function MainHero() {
    const [videoUrl, setVideoUrl] = useState('/videos/intro.mp4')

    useEffect(() => {
        fetch('/api/admin/hero')
            .then(res => res.json())
            .then(data => {
                if (data && data.videoUrl) {
                    setVideoUrl(data.videoUrl)
                }
            })
            .catch(err => console.error('Error loading hero video:', err))
    }, [])

    return (
        <section className="relative h-[65vh] md:h-auto md:min-h-screen overflow-hidden bg-gray-900">
            {/* Optimized Video Background */}
            <video
                key={videoUrl}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
                preload="auto"
            >
                <source src={videoUrl} type="video/mp4" />
                {/* Fallback for browsers that don't support video */}
                Your browser does not support the video tag.
            </video>

            {/* Subtle Overlay to make content pop if added later */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none"></div>
        </section>
    )
}
