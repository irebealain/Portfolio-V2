import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
    {
        title: 'Techzo',
        desc: 'A cutting-edge design agency template built to showcase innovation, digital expertise, and a bold creative presence online.',
        tags: ['HTML5 & CSS', 'Framer Motion', 'Vite'],
    },
    {
        title: 'Lumin Studio',
        desc: 'Modern design agency template crafted to highlight creative work and impress potential clients.',
        tags: ['HTML5 & Tailwind CSS', 'React', 'Vite'],
    },
    {
        title: 'Nubuilt',
        desc: 'Sleek architecture template built for performance, responsiveness, and timeless design.',
        tags: ['HTML5', 'CSS', 'GSAP'],
    },
    {
        title: 'Design Orbit',
        desc: 'Conversion-focused portfolio website template made for design agencies to attract clients.',
        tags: ['HTML5 & CSS', 'GSAP', 'Vite'],
    },
    {
        title: 'Formation Time',
        desc: 'Consultant website template designed to build trust, highlight services, and convert leads.',
        tags: ['HTML5', 'Tailwind CSS', 'Alpine.js'],
    },
    {
        title: 'LaundryBee',
        desc: 'Clean and modern website template built to promote laundry services and boost online bookings.',
        tags: ['Tailwind CSS', 'Alpine.js', 'Formspree'],
    },
]

export default function Projects() {
    const rootRef = useRef(null)
    const cardsRef = useRef([])

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.projects-title', { y: 24, opacity: 0, duration: 0.7 })
            cardsRef.current.forEach((el) => {
                if (!el) return
                gsap.from(el, {
                    scrollTrigger: { trigger: el, start: 'top 85%' },
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                })
            })
        }, rootRef)
        return () => ctx.revert()
    }, [])

    return (
        <div ref={rootRef} className="space-y-10">
            <header className="flex items-end justify-between">
                <div>
                    <div className="text-accent">// Explore Work</div>
                    <h1 className="projects-title heading-xl">A Showcase of My Latest Projects</h1>
                </div>
            </header>

            <div className="grid md:grid-cols-2 gap-10">
                {projects.map((p, i) => (
                    <article
                        key={p.title}
                        ref={(el) => (cardsRef.current[i] = el)}
                        className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur"
                    >
                        <div className="relative">
                            <div className="aspect-[16/10]">
                                <img
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                                    src={`https://picsum.photos/seed/${encodeURIComponent(p.title)}/1600/1000`}
                                    alt={p.title}
                                />
                            </div>
                            <button
                                data-cursor-link
                                className="absolute left-6 top-6 h-10 w-10 rounded-full bg-black/70 text-white flex items-center justify-center border border-white/10"
                                aria-label="Open details"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-6">
                            <h3 className="font-display text-2xl">{p.title}</h3>
                            <p className="subtle mt-2">{p.desc}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {p.tags.map((t) => (
                                    <span key={t} className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">{t}</span>
                                ))}
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    )
}


