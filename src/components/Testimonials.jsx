import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import christian from '../assets/christian.jpg'
import justin from '../assets/justin.jpg'
import pacifique from '../assets/pacifique.jpg'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
    {
        quote:
            'Alain immediately understood our product goals and translated them into a beautifully optimized web experience. His technical expertise and collaborative spirit made a complex project feel effortless.',
        name: 'Christian',
        title: 'Co-founder @ Academic Bridge',
        avatar: christian,
    },
    {
        quote:
            'Working with Alain was a game-changer for our database dictionary. He delivered scalable, high-quality code and brought clarity to the entire process.',
        name: 'Justin',
        title: 'IT Officer @ ASYV',
        avatar: justin,
    },
    {
        quote:
            'He understood our vision, delivered clean & scalable code, and communicated clearly throughout the project.',
        name: 'Pacifique',
        title: 'Full Stack Developer',
        avatar: pacifique,
    },
]

export default function Testimonials() {
    const containerRef = useRef(null)
    const slidesRef = useRef([])
    const avatarRef = useRef(null)
    const [index, setIndex] = useState(0)
    const quoteRef = useRef(null)

    // Initial reveal on scroll
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(containerRef.current, {
                scrollTrigger: { trigger: containerRef.current, start: 'top 85%' },
                y: 30,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out',
            })
        })
        return () => ctx.revert()
    }, [])

    // Prepare slides stacking
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            slidesRef.current.forEach((el, i) => {
                if (!el) return
                gsap.set(el, { position: 'absolute', inset: 0, opacity: i === index ? 1 : 0 })
            })
        }, containerRef)
        return () => ctx.revert()
    }, [])

    const go = (dir) => {
        const total = TESTIMONIALS.length
        const next = (index + (dir === 'next' ? 1 : -1) + total) % total

        const currentEl = slidesRef.current[index]
        const nextEl = slidesRef.current[next]

        const xOut = dir === 'next' ? -40 : 40
        const xIn = dir === 'next' ? 40 : -40

        gsap.set(nextEl, { opacity: 0, x: xIn, zIndex: 2 })
        gsap.set(currentEl, { zIndex: 1 })

        const tl = gsap.timeline({ defaults: { duration: 0.6, ease: 'power3.out' } })
        // word-level fancy animation
        const words = Array.from(quoteRef.current?.querySelectorAll('.quote-word') || [])
        tl.to(currentEl, { x: xOut, opacity: 0, ease: 'power2.in', duration: 0.35 })
            .to(nextEl, { x: 0, opacity: 1 }, '<0.05')
            .fromTo(words, { y: 12, opacity: 0, rotate: 2 }, { y: 0, opacity: 1, rotate: 0, stagger: 0.015, duration: 0.35 }, '<0.05')
            .fromTo(
                avatarRef.current,
                { y: 10, opacity: 0.85 },
                { y: 0, opacity: 1, duration: 0.4 },
                '<'
            )

        setIndex(next)
    }

    return (
        <section className="space-y-6" ref={containerRef}>
            <div className="text-accent">// Testimonials</div>
            <h2 className="heading-lg">What Clients Say About Me</h2>

            <div className="relative p-8 overflow-hidden card md:p-10">
                {/* Decorative elements */}
                <span className="absolute inline-flex w-3 h-3 rounded-full left-6 top-6 bg-accent"></span>
                <span className="pointer-events-none select-none absolute left-10 top-10 text-[9rem] leading-none text-accent/20">“</span>

                <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center min-h-[260px]">
                    {/* Slides stack */}
                    <div className="relative min-h-[180px]" ref={quoteRef}>
                        {TESTIMONIALS.map((t, i) => (
                            <blockquote
                                key={t.name}
                                ref={(el) => (slidesRef.current[i] = el)}
                                className="text-xl leading-relaxed md:text-2xl"
                            >
                                {t.quote.split(' ').map((w, wi) => (
                                    <span key={wi} className="inline-block mr-1 quote-word">{w}</span>
                                ))}
                            </blockquote>
                        ))}
                    </div>

                    {/* Avatar and meta */}
                    <div className="flex items-center gap-4 md:gap-5">
                        <img
                            ref={avatarRef}
                            className="object-cover rounded w-28 h-28 md:w-36 md:h-36"
                            src={TESTIMONIALS[index].avatar}
                            alt={TESTIMONIALS[index].name}
                        />
                        <div>
                            <div className="font-medium">{TESTIMONIALS[index].name}</div>
                            <div className="text-sm subtle">{TESTIMONIALS[index].title}</div>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex gap-3 mt-6">
                    <button
                        aria-label="Previous testimonial"
                        className="inline-flex items-center justify-center transition rounded-lg shadow group h-11 w-11 bg-accent text-accent-fore hover:opacity-90"
                        onClick={() => go('prev')}
                    >
                        <svg
                            className="h-5 w-5 transform transition-transform group-active:-translate-x-0.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <button
                        aria-label="Next testimonial"
                        className="inline-flex items-center justify-center transition rounded-lg shadow group h-11 w-11 bg-accent text-accent-fore hover:opacity-90"
                        onClick={() => go('next')}
                    >
                        <svg
                            className="h-5 w-5 transform transition-transform group-active:translate-x-0.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    )
}


