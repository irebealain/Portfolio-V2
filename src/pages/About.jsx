import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
    const rootRef = useRef(null)
    const heroRef = useRef(null)
    const expRef = useRef(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Hero animations
            gsap.from('.about-hero-title', { y: 16, opacity: 0, duration: 0.6, ease: 'power3.out' })
            gsap.from('.about-portrait', { scale: 0.96, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.05 })

            // Parallax portrait over title
            gsap.to('.about-portrait', {
                y: -80,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: '+=500',
                    scrub: true,
                },
            })

            // Moving lime dot in top-right
            gsap.to('.about-dot', {
                x: 30,
                y: -40,
                scale: 1.05,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: '+=500',
                    scrub: true,
                },
            })

            // Subtle drift for blurry tech logos
            gsap.to('.about-logos', {
                y: -60,
                opacity: 0.25,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: '+=500',
                    scrub: true,
                },
            })

            // Word-by-word rise for the code-like paragraph
            gsap.from('.about-word', {
                y: 18,
                opacity: 0,
                stagger: 0.035,
                duration: 0.45,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.about-words',
                    start: 'top 80%',
                },
            })

            // Cards later in the page
            gsap.from('.about-card', { y: 24, opacity: 0, duration: 0.6, stagger: 0.08, delay: 0.1, scrollTrigger: { trigger: '.about-card', start: 'top 85%' } })

            // Technologies rows
            gsap.from('.tech-row', {
                y: 16,
                opacity: 0,
                stagger: 0.08,
                duration: 0.5,
                ease: 'power2.out',
                scrollTrigger: { trigger: '.tech-grid', start: 'top 85%' },
            })

            // Experience rows
            gsap.from('.exp-row', {
                y: 18,
                opacity: 0,
                stagger: 0.06,
                duration: 0.45,
                ease: 'power2.out',
                scrollTrigger: { trigger: '.exp-list', start: 'top 85%' },
            })

            // Experience dot movement
            gsap.to('.exp-dot', {
                y: () => Math.max(0, (expRef.current?.querySelector('.exp-list')?.scrollHeight || 400) - 24),
                scrollTrigger: { trigger: expRef.current, start: 'top 60%', end: 'bottom 40%', scrub: true },
            })

            // Awards rows
            gsap.from('.award-row', {
                y: 18,
                opacity: 0,
                stagger: 0.06,
                duration: 0.45,
                ease: 'power2.out',
                scrollTrigger: { trigger: '.awards-wrap', start: 'top 85%' },
            })
        }, rootRef)
        return () => ctx.revert()
    }, [])

    // Code-like hero copy tokens for per-word animation
    const tokens = [
        { t: '<p>', className: 'text-accent font-mono' },
        { t: 'I' },
        { t: 'craft' },
        { t: 'fast,' },
        { t: 'scalable,' },
        { t: 'and' },
        { t: 'user-friendly', highlight: true },
        { t: 'web', highlight: true },
        { t: 'applications' },
        { t: 'with' },
        { t: 'modern' },
        { t: 'JavaScript' },
        { t: 'frameworks' },
        { t: '—' },
        { t: 'combining' },
        { t: 'React' },
        { t: 'on' },
        { t: 'the' },
        { t: 'frontend' },
        { t: 'with' },
        { t: 'robust' },
        { t: 'server-side', highlight: true },
        { t: 'solutions', highlight: true },
        { t: 'using' },
        { t: 'Node.js.' },
        { t: '</p>', className: 'text-accent font-mono' },
    ]

    return (
        <div ref={rootRef} className="space-y-16">
            {/* Hero block matching reference */}
            <section ref={heroRef} className="relative pt-16 pb-24 overflow-visible md:pt-24">
                {/* Blurry tech logos background */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none about-logos">
                    <div className="grid grid-cols-3 gap-10 text-6xl font-black sm:grid-cols-6 opacity-10 blur-md">
                        {['HTML', 'CSS', 'JS', 'REACT', 'NODE', 'EXPRESS', 'MONGO', 'PHP', 'LARAVEL'].map((k) => (
                            <span key={k} className="tracking-tight">{k}</span>
                        ))}
                    </div>
                </div>

                {/* Lime dot/sun top-right */}
                <div className="absolute w-40 h-40 rounded-full about-dot -top-8 -right-8 bg-emerald-500/30 blur-2xl" />

                <h1 className="text-4xl font-semibold leading-tight text-center about-hero-title font-display sm:text-5xl md:text-6xl lg:text-7xl">
                    I’M A FULL<br />STACK DEVELOPER
                </h1>

                {/* Portrait that moves over the title on scroll */}
                <div className="flex justify-center mt-14">
                    <div className="relative">
                        <div className="absolute -inset-6 rounded-2xl bg-emerald-400/10 blur-2xl" />
                        <img
                            className="about-portrait relative z-10 will-change-transform w-[280px] h-[320px] md:w-[380px] md:h-[420px] lg:w-[460px] lg:h-[500px] object-cover rounded-2xl shadow-2xl"
                            src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1200&auto=format&fit=crop"
                            alt="About portrait"
                        />
                    </div>
                </div>

                {/* Code-like animated paragraph */}
                <div className="max-w-3xl mx-auto mt-12 text-2xl leading-relaxed text-center about-words">
                    {tokens.map((tok, i) => (
                        <span
                            key={i}
                            className={`about-word inline-block mr-2 ${tok.highlight ? 'text-accent' : ''} ${tok.className ? tok.className : ''}`}
                        >
                            {tok.t}
                        </span>
                    ))}
                </div>
            </section>

            {/* Technologies (redesigned) */}
            <section className="space-y-6">
                <div className="text-accent">// Technologies</div>
                <div className="p-6 tech-grid card">
                    {[
                        ['Frontend', ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS']],
                        ['Server-side', ['Node.js', 'Express.js', 'MongoDB', 'PHP', 'Laravel']],
                        ['Tools', ['Git', 'GitHub', 'AWS', 'Docker', 'Stack Overflow']],
                    ].map(([label, items]) => (
                        <div key={label} className="py-5 border-b tech-row border-border last:border-0">
                            <div className="text-xs tracking-widest uppercase text-muted">{label}</div>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {items.map((t) => (
                                    <span key={t} className="px-3 py-1 text-xs border rounded-full bg-accent/10 text-accent border-accent/20">{t}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Experience */}
            <section ref={expRef} className="pt-8 space-y-6">
                <div className="text-accent">// Experience</div>
                <h2 className="heading-lg md:text-6xl">Professional Working Experience</h2>

                <div className="relative grid md:grid-cols-[420px_1fr] gap-8">
                    <img className="w-full h-[560px] object-cover rounded-2xl" src="https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?q=80&w=1200&auto=format&fit=crop" alt="Working" />
                    <div className="relative">
                        <span className="absolute hidden w-3 h-3 rounded-full exp-dot md:block -left-4 top-2 bg-accent"></span>
                        <ul className="divide-y exp-list divide-border">
                            {[
                                { company: 'CodeCraft Inc.', dates: 'Aug 2021 — Jun 2022', title: 'Sr. Full Stack Developer' },
                                { company: 'CodeCraft Inc.', dates: 'Aug 2021 — Jun 2022', title: 'Jr. Full Stack Developer' },
                                { company: 'CodeCraft Inc.', dates: 'Aug 2021 — Jun 2022', title: 'Full Stack Developer' },
                                { company: 'CodeCraft Inc.', dates: 'Aug 2021 — Jun 2022', title: 'Frontend Developer' },
                                { company: 'CodeCraft Inc.', dates: 'Aug 2021 — Jun 2022', title: 'Intern Frontend Developer' },
                            ].map((r) => (
                                <li key={`${r.company}-${r.title}`} className="flex items-center justify-between gap-6 py-6 exp-row">
                                    <div>
                                        <div className="font-medium transition hover:text-accent">{r.company}</div>
                                        <div className="mt-1 text-sm text-accent">{r.dates}</div>
                                    </div>
                                    <div className="text-sm text-white/80 md:text-base">{r.title}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Awards */}
            <section className="pt-10 space-y-6">
                <div className="text-accent">// Awards</div>
                <h2 className="heading-lg md:text-6xl">Awards & Recognition</h2>
                <div className="divide-y awards-wrap divide-border">
                    {[
                        { title: 'KSCCS Award', desc: 'Recognized for consistent delivery, code quality, and client satisfaction.', year: '2024', img: 'https://picsum.photos/seed/award1/64/64' },
                        { title: 'Awards DEV', desc: 'Recognitions earned for excellence in modern web development.', year: '2022', img: 'https://picsum.photos/seed/award2/64/64' },
                        { title: 'Award', desc: 'Celebrating milestones in software, design, and technical impact.', year: '2020', img: 'https://picsum.photos/seed/award3/64/64' },
                        { title: 'DEVIES Awards', desc: 'Proof of passion, skill, and results in development journey.', year: '2018', img: 'https://picsum.photos/seed/award4/64/64' },
                    ].map((a) => (
                        <div key={a.title} className="award-row grid grid-cols-[64px_1fr_auto] items-center gap-6 py-6">
                            <img className="object-cover w-16 h-16 rounded" src={a.img} alt={a.title} />
                            <div>
                                <div className="text-2xl font-display">{a.title}</div>
                                <p className="mt-1 subtle">{a.desc}</p>
                            </div>
                            <div className="text-sm text-accent">{a.year}</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}


