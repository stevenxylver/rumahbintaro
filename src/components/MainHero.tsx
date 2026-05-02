'use client'

export function MainHero() {
    return (
        <section className="relative h-[65vh] md:h-auto md:min-h-screen overflow-hidden bg-gray-900">
            {/* Optimized Video Background */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
                preload="auto"
            >
                <source src="/videos/intro.mp4" type="video/mp4" />
                {/* Fallback for browsers that don't support video */}
                Your browser does not support the video tag.
            </video>

            {/* Subtle Overlay to make content pop if added later */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none"></div>
        </section>
    )
}
