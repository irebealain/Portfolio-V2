import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import portrait from '../assets/asyv-graduation.png'
import boardChairVisitation from '../assets/pictures/board-chair-sg.JPG'
import doneCalvin from '../assets/pictures/donecalvin_75.jpg'
import eyPitching from '../assets/pictures/EY-pitching.jpg'
import Mentorship from '../assets/pictures/Mentorship_22.jpg'
import SwearingIn from '../assets/pictures/swearing-in.jpg'
// import

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


    // Placeholder images - replace these with your actual image imports
    const photos = [
        portrait, // Replace with your actual images
        boardChairVisitation,
        doneCalvin,
        eyPitching,
        SwearingIn,
        Mentorship,
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
                    <div className="relative w-[35rem] h-[35rem] md:w-[420px] md:h-[520px]">
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
                                    className="object-fit w-full h-full shadow-2xl rounded-2xl"
                                    src={photo}
                                    alt={`Photo ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience */}
            <section ref={expRef} className="pt-8 space-y-6">
                <div className="text-accent">// Experience</div>
                <h2 className="heading-lg md:text-6xl">Leadership, Extracurricular & Experience</h2>
                
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
                                { company: 'Jackal Tech Company Ltd', dates: 'January 2023 – Present', title: 'Active Member', desc: 'Campaigned for the concept of using telescopes; designed a coin-counting machine; organized and coordinated Jackal Programmers Days, Electronics and 3D Designing; pitched projects at STEM Days and graduations; and chaired the admission process for recruitment of new volunteers.' },
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
                                { company: 'Isomo Circles @ Bridge2Rwanda', dates: 'July 2023–July 2025', title: 'Scholar', desc: 'Learnt different topics like Young Earth vs Old Earth Theories, Critical Reading, Perspectives, Innovative Thinking, Career Exploration, Literature, Climate Economy, Public Speaking, Community Service and Discipleship.' },
                                { company: 'Washington University in St. Louis, Dual Enrollment', dates: ' May 2024–July 2024', title: 'Scholar', desc: 'Introduction to Environmental Science (Energy Saving, Water Conflict, Ocean Acidification,Agriculture and Pesticide Spraying, World Climate Change, Risk Prevention, and Biome Conservation) and Personal Narrative (Writing)' },
                                { company: 'Georgetown University-Qatar - Global Challengers Program', dates: ' May 2024', title: 'Scholar', desc: 'Social Entrepreneurship (Starting a New Business, NGO, and Program; Effective Management; Business Model Canvas; and Fundraising)' },
                                { company: 'Pay It Forward', dates: ' September 2022 – July 2023', title: 'Secretary', desc: 'Invited renowned speakers to speak to the community in the Lead Series; organized charity projects to help vulnerable families with basic materials and health insurance ( Mutuelle de santé) outside the school.' },
                                { company: 'ASYV Student Government 2024-2025', dates: ' July 2023 – July 2024', title: 'Minister of Gender & Family Promotion', desc: ' Founded the Family Visitation, ASYV Talk, and Debate Competition programs about gender equality; spearheaded tech-savvy education; advocated for students in implementations of the school policies and programs; and held town hall meetings.' },
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