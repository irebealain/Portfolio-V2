import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import portrait from '../assets/asyv-graduation.png'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
    const rootRef = useRef(null)
    const heroRef = useRef(null)
    const expRef = useRef(null)
    const photoStackRef = useRef(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Hero animations
            gsap.from('.about-hero-title', { y: 16, opacity: 0, duration: 0.6, ease: 'power3.out' })

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

            // Photo Stack Animation - Stacked cards that slide away on scroll
            const photoCards = gsap.utils.toArray('.photo-card')

            // CRITICAL: Ensure all cards start perfectly flat and stacked
            photoCards.forEach((card, index) => {
                gsap.set(card, {
                    zIndex: photoCards.length - index,
                    scale: 1,
                    x: 0,
                    y: 0,
                    rotation: 0, // MUST be 0 degrees
                    opacity: 1,
                    transformOrigin: 'center center',
                    force3D: true
                })
            })

            // Create a timeline that pins the section
            const photoTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: photoStackRef.current,
                    start: 'center center',
                    end: '+=2000', // Total scroll distance needed
                    scrub: 1,
                    pin: true, // Pin the section
                    anticipatePin: 1,
                }
            })

            // Then create scroll animations - photos move in pairs
            photoCards.forEach((card, index) => {
                const direction = index % 2 === 0 ? 1 : -1 // Alternate left/right

                // Photos move in pairs: 0&1 together, 2&3 together, 4&5 together, etc.
                const pairIndex = Math.floor(index / 2)
                const startProgress = pairIndex * 0.18 // Start position in timeline (0 to 0.9)

                photoTimeline.to(card, {
                    x: direction * (window.innerWidth > 768 ? 800 : 400), // Responsive slide distance
                    rotation: direction * 70,
                    opacity: 0,
                    scale: 0.7,
                    ease: 'none',
                }, startProgress)
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

            // Awards cards individual animation
            gsap.utils.toArray('.award-card').forEach((card) => {
                gsap.from(card, {
                    y: 18,
                    opacity: 0,
                    duration: 0.45,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%'
                    },
                })
            })
        }, rootRef)
        return () => ctx.revert()
    }, [])

    // Code-like hero copy tokens for per-word animation
    const tokens = [
        { t: '<p>', className: 'text-accent font-mono' },
        { t: 'Alain' },
        { t: 'Irebe' },
        { t: 'Gashumba' },
        { t: 'is' },
        { t: 'a' },
        { t: 'passionate', highlight: true },
        { t: 'Rwandan' },
        { t: 'high' },
        { t: 'school' },
        { t: 'graduate' },
        { t: 'from' },
        { t: 'Agahozo-Shalom' },
        { t: 'Youth' },
        { t: 'Village,' },
        { t: 'specializing' },
        { t: 'in' },
        { t: 'Mathematics,' },
        { t: 'Physics,' },
        { t: 'Computer', highlight: true },
        { t: 'Science,' },
        { t: 'and' },
        { t: 'Entrepreneurship.' },
        { t: 'As' },
        { t: 'founder' },
        { t: 'of' },
        { t: 'Byte', highlight: true },
        { t: 'Builders,' },
        { t: 'he' },
        { t: 'taught' },
        { t: 'coding' },
        { t: 'to' },
        { t: 'peers,' },
        { t: 'organized' },
        { t: 'hackathons,' },
        { t: 'and' },
        { t: 'built' },
        { t: 'exchange' },
        { t: 'programs.' },
        { t: 'At' },
        { t: 'Career' },
        { t: 'Connect' },
        { t: 'Hub,' },
        { t: 'he' },
        { t: 'connected' },
        { t: '30+' },
        { t: 'students' },
        { t: 'with' },
        { t: 'mentors' },
        { t: 'and' },
        { t: 'raised' },
        { t: '1.5M' },
        { t: 'FRW' },
        { t: 'for' },
        { t: 'ventures.' },
        { t: 'Through' },
        { t: 'internships' },
        { t: 'at' },
        { t: 'Africlouds,' },
        { t: 'Growth' },
        { t: 'Wave,' },
        { t: 'and' },
        { t: 'Academic' },
        { t: 'Bridge,' },
        { t: 'he' },
        { t: 'developed', highlight: true },
        { t: 'web' },
        { t: 'applications,' },
        { t: 'designed' },
        { t: 'systems,' },
        { t: 'and' },
        { t: 'mentored' },
        { t: 'teams.' },
        { t: 'Winner' },
        { t: 'of' },
        { t: 'ASYV' },
        { t: 'STEM' },
        { t: 'Day' },
        { t: '2024' },
        { t: 'and' },
        { t: 'runner-up' },
        { t: 'in' },
        { t: 'entrepreneurial' },
        { t: 'challenges,' },
        { t: 'Alain' },
        { t: 'blends', highlight: true },
        { t: 'technical' },
        { t: 'expertise' },
        { t: 'with' },
        { t: 'leadership' },
        { t: 'and' },
        { t: 'community' },
        { t: 'impact.' },
        { t: 'Fluent' },
        { t: 'in' },
        { t: 'four' },
        { t: 'languages,' },
        { t: 'he' },
        { t: 'is' },
        { t: 'driven' },
        { t: 'by' },
        { t: 'curiosity,' },
        { t: 'creativity,' },
        { t: 'and' },
        { t: 'using' },
        { t: 'technology', highlight: true },
        { t: 'for' },
        { t: 'social' },
        { t: 'transformation.' },
        { t: '</p>', className: 'text-accent font-mono' },
    ]

    // Placeholder images - replace these with your actual image imports
    const photos = [
        portrait, // Replace with your actual images
        portrait,
        portrait,
        portrait,
        portrait,
        portrait,
        portrait,
        portrait,
        portrait,
        portrait,
    ]

    return (
        <div ref={rootRef} className="space-y-16">
            {/* Hero block matching reference */}
            <section ref={heroRef} className="relative pt-16 pb-24 overflow-hidden md:pt-24">
                {/* Blurry tech logos background */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none about-logos">
                    <div className="grid grid-cols-3 gap-10 text-6xl font-black sm:grid-cols-6 opacity-10 blur-md">
                        {['REACT', 'NODE', 'EXPRESS', 'PYTHON', 'JAVA', 'FLUTTER', 'FIGMA', 'PHP', 'LARAVEL'].map((k) => (
                            <span key={k} className="tracking-tight">{k}</span>
                        ))}
                    </div>
                </div>

                {/* Lime dot/sun top-right */}
                <div className="absolute w-40 h-40 rounded-full about-dot -top-8 -right-8 bg-emerald-500/30 blur-2xl" />

                <h1 className="text-4xl font-semibold leading-tight text-center about-hero-title font-display sm:text-5xl md:text-6xl lg:text-7xl">
                    HERE IS<br />MY ADVENTURE
                </h1>

                {/* Photo Stack that slides away on scroll - PINNED SECTION */}
                <div ref={photoStackRef} className="relative flex items-center justify-center h-screen overflow-hidden mt-14">
                    <div className="relative w-[340px] h-[440px] md:w-[420px] md:h-[520px]">
                        {/* Glow effect */}
                        <div className="absolute -inset-6 rounded-2xl bg-emerald-400/10 blur-2xl" />

                        {/* Stacked photo cards - all perfectly aligned */}
                        {photos.map((photo, index) => (
                            <div
                                key={index}
                                className="absolute top-0 left-0 w-full h-full photo-card will-change-transform"
                                style={{
                                    transform: 'translate3d(0px, 0px, 0px) rotate(0deg) scale(1)',
                                    opacity: 1,
                                    transformOrigin: 'center center'
                                }}
                            >
                                <img
                                    className="object-cover w-full h-full shadow-2xl rounded-2xl"
                                    src={photo}
                                    alt={`Photo ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Code-like animated paragraph */}
                <div className="max-w-3xl mx-auto mt-12 text-2xl leading-relaxed text-center about-words">
                    {tokens.map((tok, i) => (
                        <span
                            key={i}
                            className={`about-word inline-block text-base leading-[0.5rem] mr-2 ${tok.highlight ? 'text-accent' : ''} ${tok.className ? tok.className : ''}`}
                        >
                            {tok.t}
                        </span>
                    ))}
                </div>
            </section>

            {/* Experience */}
            <section ref={expRef} className="pt-8 space-y-6">
                <div className="text-accent">// Experience</div>
                <h2 className="heading-lg md:text-6xl">Leadership & Extracurricular Experience</h2>
                
                <div className="relative gap-8 flex flex-row">
                    <div className="relative w-1/2">
                        <span className="absolute hidden w-3 h-3 rounded-full exp-dot md:block -left-4 top-2 bg-accent"></span>
                        <ul className="divide-y exp-list divide-border">
                            {[
                                { company: 'Career Connect Hub', dates: 'June 2025 — Present', title: 'Lead Programmer', desc: 'Designed online competition apps, connected 30+ students with mentors, raised 1.5M FRW for ventures' },
                                { company: 'Growth Wave', dates: 'March 2025 — July 2025', title: 'Trainee', desc: 'Revamped school election system, designed pharmacy management system, taught system analysis' },
                                { company: 'Africlouds', dates: 'July 2024 — September 2024', title: 'Intern', desc: 'Developed company website, designed B&B radio web app, conducted system research' },
                                { company: 'Academic Bridge', dates: 'July 2023 — September 2024', title: 'Intern', desc: 'Designed prototypes for KudiBooks, developed election school system for ASYV' },
                                { company: 'Byte Builders', dates: 'May 2023 — Present', title: 'Founder', desc: 'Taught HTML, CSS, JS, PHP; organized ASYV Hackathon and Rwanda Coding Academy exchange program' },
                            ].map((r) => (
                                <li key={`${r.company}-${r.title}`} className="py-6 exp-row">
                                    <div className="flex items-start justify-between gap-6">
                                        <div>
                                            <div className="font-medium transition hover:text-accent">{r.company}</div>
                                            <div className="mt-1 text-sm text-accent">{r.dates}</div>
                                        </div>
                                        <div className="text-sm font-medium text-white/90 md:text-base">{r.title}</div>
                                    </div>
                                    <p className="mt-2 text-sm text-white/70">{r.desc}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative w-1/2">
                        <span className="absolute hidden w-3 h-3 rounded-full exp-dot md:block -left-4 top-2 bg-accent"></span>
                        <ul className="divide-y exp-list divide-border">
                            {[
                                { company: 'Career Connect Hub', dates: 'June 2025 — Present', title: 'Lead Programmer', desc: 'Designed online competition apps, connected 30+ students with mentors, raised 1.5M FRW for ventures' },
                                { company: 'Growth Wave', dates: 'March 2025 — July 2025', title: 'Trainee', desc: 'Revamped school election system, designed pharmacy management system, taught system analysis' },
                                { company: 'Africlouds', dates: 'July 2024 — September 2024', title: 'Intern', desc: 'Developed company website, designed B&B radio web app, conducted system research' },
                                { company: 'Academic Bridge', dates: 'July 2023 — September 2024', title: 'Intern', desc: 'Designed prototypes for KudiBooks, developed election school system for ASYV' },
                                { company: 'Byte Builders', dates: 'May 2023 — Present', title: 'Founder', desc: 'Taught HTML, CSS, JS, PHP; organized ASYV Hackathon and Rwanda Coding Academy exchange program' },
                            ].map((r) => (
                                <li key={`${r.company}-${r.title}`} className="py-6 exp-row">
                                    <div className="flex items-start justify-between gap-6">
                                        <div>
                                            <div className="font-medium transition hover:text-accent">{r.company}</div>
                                            <div className="mt-1 text-sm text-accent">{r.dates}</div>
                                        </div>
                                        <div className="text-sm font-medium text-white/90 md:text-base">{r.title}</div>
                                    </div>
                                    <p className="mt-2 text-sm text-white/70">{r.desc}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Awards */}
            <section className="pt-10 space-y-6">
                <div className="text-accent">// Awards & Recognition</div>
                <h2 className="heading-lg md:text-6xl">Honors & Achievements</h2>
                <div className="relative awards-wrap">
                    {[
                        {
                            title: 'ASYV STEM Day 2024 Winner',
                            desc: 'Automobile cane directing blinds project selected by 20+ teachers and 100+ students as Best 2024 STEAM Project Exhibition',
                            year: '2024',
                            img: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=64&h=64&auto=format&fit=crop'
                        },
                        {
                            title: 'Provincial Wavumbuzi Entrepreneurial Challenge',
                            desc: 'Presented sustainable solutions to poverty, ranked 2nd runner-up among provincial competitors in Rwanda',
                            year: '2023',
                            img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=64&h=64&auto=format&fit=crop'
                        },
                        {
                            title: 'Immense Scholarship Award',
                            desc: 'Selected as finalist in Immense Essay Competition (UK) and awarded scholarship of 200 euros',
                            year: '2022',
                            img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=64&h=64&auto=format&fit=crop'
                        },
                        {
                            title: 'Agahozo-Shalom Youth Village Scholarship',
                            desc: 'Awarded four-year full scholarship to Liquidnet Family High School at ASYV, graduated with 3.74 GPA',
                            year: '2021',
                            img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=64&h=64&auto=format&fit=crop'
                        },
                    ].map((a, i) => (
                        <div
                            key={a.title}
                            className="sticky p-6 mb-4 award-card card"
                            style={{ top: `${80 + i * 24}px`, zIndex: 10 - i }}
                        >
                            <div className="grid grid-cols-[64px_1fr_auto] items-center gap-6">
                                <img className="object-cover w-16 h-16 rounded" src={a.img} alt={a.title} />
                                <div>
                                    <div className="text-xl font-display md:text-2xl">{a.title}</div>
                                    <p className="mt-1 text-sm subtle md:text-base">{a.desc}</p>
                                </div>
                                <div className="text-sm text-accent">{a.year}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Technologies (redesigned) */}
            <section className="space-y-6">
                <div className="text-accent">// Technologies</div>
                <div className="p-6 tech-grid card">
                    {[
                        ['Frontend', ['HTML', 'CSS', 'JavaScript', 'React.js', 'Tailwind CSS', 'Figma']],
                        ['Backend & Mobile', ['Node.js', 'Express.js', 'PHP', 'Laravel', 'Python', 'Flutter', 'MongoDB']],
                        ['Languages & Tools', ['Java', 'C++', 'Visual Basic', 'Git', 'GitHub', 'Database Design']],
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
        </div>
    )
}