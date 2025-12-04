import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Palette, Server, Rocket, Users, Code, Coffee, Zap, Heart } from 'lucide-react'
import Testimonials from '../components/Testimonials.jsx'
import asyvLogo from '../assets/logos/agahozo-shalom-youth-village.png'
import cchLogo from '../assets/logos/career-connect-hub.png'
import africloudsLogo from '../assets/logos/africlouds.png'
import academicBridgeLogo from '../assets/logos/academic-bridge.png'
import growthWaveLogo from '../assets/logos/growth-wave.png'
import kudiBooksLogo from '../assets/logos/kudi-books.png'
import alain from '../assets/alain.jpg'
import FinalCv from '../assets/papers/Final CV.pdf'
import introVid from '../assets/videos/intro.mp4'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
    const rootRef = useRef(null)
    const videoRef = useRef(null)
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)

    const handlePlayVideo = () => {
        if (videoRef.current) {
            videoRef.current.play()
            setIsVideoPlaying(true)
        }
    }

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Hero animations with more energy
            gsap.from('.hero-kicker', { y: 20, opacity: 0, duration: 0.6, ease: 'back.out(1.2)' })
            gsap.from('.hero-name', { 
                y: 40, 
                opacity: 0, 
                duration: 0.9, 
                ease: 'power3.out', 
                delay: 0.05 
            })
            gsap.from('.hero-copy', { y: 20, opacity: 0, duration: 0.6, delay: 0.15 })
            gsap.from('.hero-video-container', { 
                scale: 0.9, 
                opacity: 0, 
                duration: 0.8, 
                ease: 'back.out(1.2)', 
                delay: 0.2 
            })

            // Floating animation for video
            gsap.to('.hero-video-container', {
                y: -10,
                duration: 3,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true
            })

            // Fun stats animation
            gsap.from('.fun-stat', {
                scale: 0,
                opacity: 0,
                stagger: 0.1,
                duration: 0.5,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '.fun-stats',
                    start: 'top 80%'
                }
            })

            // Sections reveal
            gsap.utils.toArray('.reveal-up').forEach((el) => {
                gsap.from(el, {
                    scrollTrigger: { trigger: el, start: 'top 85%' },
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                })
            })

            // Stats counter animation
            gsap.utils.toArray('.stat-number').forEach((stat) => {
                const target = stat.getAttribute('data-target')
                gsap.from(stat, {
                    innerText: 0,
                    duration: 2,
                    ease: 'power1.out',
                    snap: { innerText: 1 },
                    scrollTrigger: {
                        trigger: stat,
                        start: 'top 85%',
                    },
                    onUpdate: function () {
                        stat.innerText = Math.ceil(this.targets()[0].innerText) + '+'
                    }
                })
            })

            // Service cards with bounce
            gsap.from('.service-card', {
                y: 40,
                opacity: 0,
                stagger: 0.12,
                duration: 0.6,
                ease: 'back.out(1.2)',
                scrollTrigger: {
                    trigger: '.service-grid',
                    start: 'top 85%',
                }
            })

            // Client logos with rotation
            gsap.utils.toArray('.client-card').forEach((card, i) => {
                gsap.from(card, {
                    scale: 0,
                    rotation: 360,
                    opacity: 0,
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: '.clients-grid',
                        start: 'top 85%'
                    }
                })
            })

            // Journey steps animation
            gsap.from('.journey-step', {
                x: -50,
                opacity: 0,
                stagger: 0.15,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.journey-timeline',
                    start: 'top 80%'
                }
            })
        }, rootRef)
        return () => ctx.revert()
    }, [])

    const name = 'ALAIN IREBE GASHUMBA'

    return (
        <div ref={rootRef} className="space-y-24">
            {/* Hero */}
            <section className="grid items-center gap-12 pt-10 md:pt-20 md:grid-cols-2">
                <div>
                    <div className="flex items-center gap-2 hero-kicker">
                        <span className="text-xs tracking-widest uppercase text-accent">Full-Stack Developer</span>
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                        <span className="px-2 py-1 text-xs rounded-full bg-accent/10 text-accent">Available for Projects</span>
                    </div>
                    <h1 className="mt-4 hero-name heading-xl">
                        I'm <span className="text-accent">Alain Irebe</span>,<br />
                        Building Digital<br />
                        Solutions & Teaching Code
                    </h1>
                    <p className="max-w-md mt-6 text-lg leading-relaxed hero-copy subtle">
                        Specializing in full-stack web development with React and Node.js. 
                        Passionate about creating scalable applications and empowering the next generation through technology education.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-8">
                        <a className="inline-flex items-center gap-2 px-6 py-3 transition-transform rounded-full bg-accent text-accent-fore hover:scale-105" href={FinalCv} target="_blank">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download CV
                        </a>
                        <a className="inline-flex items-center gap-2 px-6 py-3 transition-colors border rounded-full border-accent/20 text-accent hover:bg-accent/10" href="/projects">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                            View My Work
                        </a>
                    </div>
                </div>
                
                {/* Professional Video Container */}
                <div className="relative flex justify-center hero-video-container md:justify-end">
                    <div className="relative w-full max-w-md">
                        {/* Terminal-style frame */}
                        <div className="relative overflow-hidden rounded-lg shadow-2xl bg-gradient-to-br from-gray-900 to-black">
                            {/* Terminal header */}
                            <div className="flex items-center gap-2 px-4 py-3 border-b bg-gray-900/50 border-white/10">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                </div>
                                <div className="flex-1 text-xs text-center text-white/50 font-mono">
                                    intro_video.mp4
                                </div>
                            </div>
                            
                            {/* Video */}
                            <div className="relative bg-black aspect-video">
                                <video 
                                    ref={videoRef}
                                    src={introVid}
                                    className="w-full h-full"
                                    poster={alain}
                                    onEnded={() => setIsVideoPlaying(false)}
                                />
                                
                                {/* Play button overlay */}
                                {!isVideoPlaying && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/40 to-transparent">
                                        <button
                                            onClick={handlePlayVideo}
                                            className="px-6 py-3 text-sm font-medium transition-all border rounded-full bg-accent/90 text-accent-fore border-accent hover:scale-105 hover:bg-accent"
                                        >
                                            <div className="flex items-center gap-2">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                                </svg>
                                                Watch Introduction
                                            </div>
                                        </button>
                                    </div>
                                )}
                            </div>
                            
                            {/* Code-like bottom bar */}
                            <div className="px-4 py-2 text-xs border-t font-mono bg-gray-900/50 border-white/10 text-accent">
                                <span className="text-white/50">$</span> alain_introduction.play()
                            </div>
                        </div>

                        {/* Floating code elements */}
                        <div className="absolute -top-6 -left-6 px-3 py-2 text-xs font-mono bg-gray-900 border rounded-lg shadow-lg border-accent/30 text-accent">
                            &lt;Developer /&gt;
                        </div>
                        <div className="absolute -bottom-6 -right-6 px-3 py-2 text-xs font-mono bg-gray-900 border rounded-lg shadow-lg border-accent/30 text-accent">
                            function() &#123; &#125;
                        </div>

                        {/* Glow effect */}
                        <div className="absolute -inset-8 rounded-3xl bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 blur-3xl -z-10"></div>
                    </div>
                </div>
            </section>

            {/* Programming Stats Bar */}
            <section className="py-8 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-900/20 to-emerald-950/40 fun-stats reveal-up">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    {[
                        { icon: Code, value: '10+', label: 'Projects Deployed' },
                        { icon: Users, value: '30+', label: 'Students Mentored' },
                        { icon: Server, value: '6', label: 'Tech Organizations' },
                        { icon: Rocket, value: '3', label: 'Years Coding' }
                    ].map((stat) => (
                        <div key={stat.label} className="text-center fun-stat">
                            <stat.icon className="w-8 h-8 mx-auto mb-2 text-accent" />
                            <div className="text-3xl font-bold text-accent font-display">{stat.value}</div>
                            <div className="mt-1 text-sm text-white/70">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* My Journey Timeline */}
            <section className="space-y-6 reveal-up">
                <div className="text-accent">// My Journey</div>
                <h2 className="heading-lg">From Student to Technology Leader</h2>
                <p className="max-w-3xl text-lg subtle">
                    My journey started at Agahozo-Shalom Youth Village, where I discovered my passion for technology. 
                    Today, I'm building solutions, teaching the next generation, and making technology accessible to everyone.
                </p>
                
                <div className="relative pl-8 mt-12 space-y-8 border-l-2 journey-timeline border-accent/30">
                    {[
                        { year: '2021', title: 'Started at ASYV', desc: 'Began formal technology education and programming fundamentals' },
                        { year: '2023', title: 'Founded Byte Builders', desc: 'Established peer-to-peer coding education program' },
                        { year: '2024', title: 'Won STEM Competition', desc: 'Developed innovative assistive technology for accessibility' },
                        { year: '2025', title: 'Internship', desc: 'Graduated and now interning at The Agahozo-Shalom Youth Village' }
                    ].map((step, i) => (
                        <div key={i} className="relative journey-step">
                            <div className="absolute -left-[37px] w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-accent-fore"></div>
                            </div>
                            <div className="p-4 rounded-lg card">
                                <div className="text-sm font-medium text-accent">{step.year}</div>
                                <h3 className="mt-1 text-lg font-display">{step.title}</h3>
                                <p className="mt-1 text-sm text-white/70">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Clients */}
            <section className="space-y-6 reveal-up">
                <div className="text-accent">// Professional Experience</div>
                <h2 className="heading-lg">Organizations I've Collaborated With</h2>
                <div className="grid gap-4 clients-grid sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        { name: 'Career Connect Hub', logo: cchLogo },
                        { name: 'Agahozo-Shalom Youth Village', logo: asyvLogo },
                        { name: 'Africlouds', logo: africloudsLogo },
                        { name: 'Academic Bridge', logo: academicBridgeLogo },
                        { name: 'Growth Wave', logo: growthWaveLogo },
                        { name: 'KudiBooks', logo: kudiBooksLogo },
                    ].map((org) => (
                        <div
                            key={org.name}
                            className="flex items-center justify-center p-6 transition-all cursor-pointer client-card card hover:bg-accent/5 hover:scale-105"
                        >
                            <img
                                src={org.logo}
                                alt={org.name}
                                className="object-contain transition max-h-14 opacity-70 hover:opacity-100"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Services */}
            <section className="space-y-6 reveal-up">
                <div className="text-accent">// Core Competencies</div>
                <h2 className="heading-lg">Technology Skills & Services</h2>
                <div className="grid gap-6 service-grid md:grid-cols-2">
                    {[
                        {
                            icon: Palette,
                            title: 'Frontend Development',
                            desc: 'Building responsive, accessible interfaces with React, Tailwind CSS, and GSAP animations. Focus on user experience and performance optimization.'
                        },
                        {
                            icon: Server,
                            title: 'Backend Architecture',
                            desc: 'Developing scalable APIs and database solutions with Node.js, Express, MongoDB, and PHP. Expertise in system design and data modeling.'
                        },
                        {
                            icon: Rocket,
                            title: 'Full-Stack Solutions',
                            desc: 'End-to-end application development from requirements analysis to deployment. Specialized in election systems, management platforms, and web applications.'
                        },
                        {
                            icon: Users,
                            title: 'Technical Education',
                            desc: 'Teaching programming fundamentals through Byte Builders initiative. Organizing hackathons, workshops, and providing one-on-one mentorship to aspiring developers.'
                        }
                    ].map((service) => (
                        <div key={service.title} className="p-6 transition-all cursor-pointer service-card card hover:bg-accent/5 hover:scale-105">
                            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10">
                                <service.icon className="w-6 h-6 text-accent" />
                            </div>
                            <h3 className="mt-4 text-xl font-display">{service.title}</h3>
                            <p className="mt-2 subtle">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Process */}
            <section id="process" className="space-y-6 reveal-up">
                <div className="text-accent">// Development Process</div>
                <h2 className="heading-lg">How I Approach Projects</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    {[
                        ['01', 'Analysis & Planning', 'Understanding project requirements, conducting user research, and designing system architecture. Creating comprehensive technical specifications and development roadmaps.'],
                        ['02', 'Implementation', 'Agile development methodology with iterative sprints. Building frontend and backend components in parallel with continuous integration and regular stakeholder feedback.'],
                        ['03', 'Testing & Deployment', 'Comprehensive testing including unit tests, integration tests, and user acceptance testing. Performance optimization, security audits, and seamless deployment with post-launch support.'],
                    ].map(([num, title, desc]) => (
                        <div key={title} className="p-6 transition-all cursor-pointer card hover:scale-105">
                            <div className="text-5xl font-display text-accent/80">{num}</div>
                            <h3 className="mt-2 text-xl font-display">{title}</h3>
                            <p className="mt-2 subtle">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Skills + Stats */}
            <section className="p-8 space-y-8 reveal-up card md:p-12 bg-gradient-to-br from-emerald-900/10 to-emerald-950/20">
                <div>
                    <div className="text-accent">// Professional Summary</div>
                    <h2 className="mt-2 text-3xl font-display">Committed to Excellence in Software Development</h2>
                    <p className="max-w-3xl mt-4 text-lg subtle">
                        From teaching programming at Byte Builders to developing enterprise systems at Growth Wave and Africlouds, 
                        I've built a diverse portfolio. My focus is on creating technology solutions that empower communities and address real-world challenges through innovation and scalable architecture.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-8">
                    {[
                        ['3', 'Years Experience'],
                        ['6', 'Organizations Served'],
                        ['10', 'Projects Completed']
                    ].map(([num, label]) => (
                        <div key={label} className="text-center">
                            <div className="text-4xl stat-number font-display text-accent md:text-6xl" data-target={num}>{num}+</div>
                            <div className="mt-2 text-sm subtle">{label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <div className="reveal-up">
                <div className="mb-6 text-accent">// Professional Recommendations</div>
                <h2 className="mb-8 heading-lg">Testimonials & Feedback</h2>
                <Testimonials />
            </div>

            {/* CTA */}
            <section className="relative py-24 text-center reveal-up">
                <div className="absolute inset-0 rounded-full bg-emerald-600/20 blur-3xl" />
                <div className="relative">
                    <h2 className="text-4xl heading-lg md:text-6xl font-display">LET'S BUILD SOMETHING AMAZING TOGETHER</h2>
                    <p className="max-w-2xl mx-auto mt-4 subtle">Whether it's a web app, management system, or innovative solution, I'm ready to bring your vision to life.</p>
                    <a className="inline-flex px-6 py-3 mt-8 transition-transform rounded-full bg-accent text-accent-fore hover:scale-105" href="/contact">Start a Project</a>
                </div>
            </section>

            {/* Marquee + stacked photo */}
            <section className="relative py-16 overflow-hidden">
                <div className="text-6xl font-semibold whitespace-nowrap opacity-40 font-display text-white/30">
                    <div className="inline-block animate-marquee-left will-change-transform">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <span key={i} className="mx-6">{name} *</span>
                        ))}
                    </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="rotate-6">
                        <img className="w-[420px] h-[520px] object-cover rounded shadow-2xl" src={alain} alt="Alain Gashumba" />
                    </div>
                </div>
            </section>

            <style jsx>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    )
}