'use client'

export function MainHero() {
    return (
        <section className="relative min-h-screen overflow-hidden">
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="/videos/intro.mp4" type="video/mp4" />
            </video>
        </section>
    )
}

