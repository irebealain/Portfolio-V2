import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Palette, Server, Rocket, Users } from 'lucide-react'
import Testimonials from '../components/Testimonials.jsx'
import asyvLogo from '../assets/logos/agahozo-shalom-youth-village.png';
import cchLogo from '../assets/logos/career-connect-hub.png';
import africloudsLogo from '../assets/logos/africlouds.png';
import academicBridgeLogo from '../assets/logos/academic-bridge.png';
import growthWaveLogo from '../assets/logos/growth-wave.png';
import kudiBooksLogo from '../assets/logos/kudi-books.png';
import alain from '../assets/alain.jpg'
import FinalCv from '../assets/papers/Final CV.pdf'
import introVid from '../assets/videos/intro.mp4'
gsap.registerPlugin(ScrollTrigger)

export default function Home() {
    const rootRef = useRef(null)
    const cardsRef = useRef([])

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Hero
            gsap.from('.hero-kicker', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' })
            gsap.from('.hero-name', { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.05 })
            gsap.from('.hero-copy', { y: 20, opacity: 0, duration: 0.6, delay: 0.15 })
            gsap.from('.hero-portrait', { scale: 0.95, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.1 })

            // Hero portrait parallax on scroll
            gsap.to('.hero-portrait', {
                y: 50,
                scale: 1.02,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero-portrait',
                    start: 'top 20%',
                    end: 'bottom top',
                    scrub: true,
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

            // Project cards hover enhancement
            gsap.utils.toArray('.project-card').forEach((card) => {
                const img = card.querySelector('.project-img')
                card.addEventListener('mouseenter', () => {
                    gsap.to(img, { scale: 1.05, duration: 0.4, ease: 'power2.out' })
                })
                card.addEventListener('mouseleave', () => {
                    gsap.to(img, { scale: 1, duration: 0.4, ease: 'power2.out' })
                })
            })

            // Stats counter animation
            gsap.utils.toArray('.stat-number').forEach((stat) => {
                const target = stat.getAttribute('data-target')
                const duration = 2
                gsap.from(stat, {
                    innerText: 0,
                    duration: duration,
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

            // Service cards stagger
            gsap.from('.service-card', {
                y: 30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.service-grid',
                    start: 'top 85%',
                }
            })

            // Client logos subtle float
            gsap.utils.toArray('.client-card').forEach((card, i) => {
                gsap.to(card, {
                    y: -5,
                    duration: 2 + (i * 0.2),
                    ease: 'sine.inOut',
                    repeat: -1,
                    yoyo: true,
                })
            })
        }, rootRef)
        return () => ctx.revert()
    }, [])

    const name = 'ALAIN IREBE GASHUMBA'

    return (
        <div ref={rootRef} className="space-y-24">
            {/* Hero */}
            <section className="grid items-end gap-8 pt-10 md:pt-20 md:grid-cols-2">
                <div>
                    <p className="text-xs tracking-widest uppercase hero-kicker text-accent">Hey, Feel Free To Call Me</p>
                    <h1 className="mt-4 hero-name heading-xl">{name}</h1>
                    <p className="max-w-md mt-6 hero-copy subtle">
                        Alain Irebe Gashumba is a young Rwandan leader dedicated to technology, gender equality, and community growth. A graduate of Agahozo-Shalom Youth Village, he founded ByteBuilders, taught programming to over 30 students, and organized hackathons. As his community’s Minister of Gender and Family Promotion, he created a girls’ referee class to empower young women. With experience from Africlouds, GrowthWave, and Academic Bridge, Alain uses creativity and leadership to drive positive change.
                    </p>
                    <a className="inline-flex px-6 py-3 mt-8 transition-transform rounded-full bg-accent text-accent-fore hover:scale-105" href= {FinalCv} target="_blank">View My CV</a>
                </div>
                <div className="relative flex justify-center md:justify-end">
                    <div className="relative hero-portrait">
                        <div className="absolute rounded-full -inset-12 bg-emerald-500/20 blur-3xl"></div>
                        {/* <img className="relative z-10 w-[360px] h-[460px] object-cover rounded-2xl" src={alain} alt="Portrait" /> */}
                        <video src= {introVid} controls></video>
                    </div>
                </div>
            </section>

            {/* Clients */}
            <section className="space-y-6 reveal-up">
                <div className="text-accent">// Organizations I've Worked With</div>
                <h2 className="heading-lg">Collaborated With Amazing Organizations</h2>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                            className="flex items-center justify-center p-5 transition-colors cursor-pointer client-card card hover:bg-accent/5"
                        >
                            <img
                                src={org.logo}
                                alt={org.name}
                                className="max-h-12 object-contain opacity-70 hover:opacity-100 transition"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Services */}
            <section className="space-y-6 reveal-up">
                <div className="text-accent">// What I Offer</div>
                <h2 className="heading-lg">Comprehensive Development Services</h2>
                <div className="grid gap-6 service-grid md:grid-cols-2">
                    <div className="p-6 transition-colors cursor-pointer service-card card hover:bg-accent/5">
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10">
                            <Palette className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="mt-4 text-xl font-display">Frontend Development</h3>
                        <p className="mt-2 subtle">Building responsive, pixel-perfect user interfaces with React, modern CSS, and smooth animations using GSAP.</p>
                    </div>
                    <div className="p-6 transition-colors cursor-pointer service-card card hover:bg-accent/5">
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10">
                            <Server className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="mt-4 text-xl font-display">Backend & API Development</h3>
                        <p className="mt-2 subtle">Creating robust server-side logic with Node.js, Express, PHP, and designing scalable database architectures.</p>
                    </div>
                    <div className="p-6 transition-colors cursor-pointer service-card card hover:bg-accent/5">
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10">
                            <Rocket className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="mt-4 text-xl font-display">Full Stack Solutions</h3>
                        <p className="mt-2 subtle">End-to-end application development from concept to deployment, specializing in management systems and web platforms.</p>
                    </div>
                    <div className="p-6 transition-colors cursor-pointer service-card card hover:bg-accent/5">
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10">
                            <Users className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="mt-4 text-xl font-display">Technical Mentorship</h3>
                        <p className="mt-2 subtle">Teaching programming fundamentals, organizing hackathons, and guiding aspiring developers through their coding journey.</p>
                    </div>
                </div>
            </section>

            {/* Process */}
            <section id="process" className="grid gap-6 md:grid-cols-3 reveal-up">
                {[
                    ['01', 'Discovery & Planning', 'Understanding your goals, conducting user research, and creating detailed system architecture. I ensure every project starts with a solid foundation.'],
                    ['02', 'Design & Development', 'Building intuitive interfaces and robust backends in parallel. Iterative development with regular check-ins to ensure alignment with your vision.'],
                    ['03', 'Testing & Launch', 'Rigorous quality assurance, performance optimization, and smooth deployment. Post-launch support to ensure everything runs perfectly.'],
                ].map(([num, title, desc]) => (
                    <div key={title} className="p-6 transition-transform cursor-pointer card hover:scale-105">
                        <div className="text-6xl font-display text-accent/80">{num}</div>
                        <h3 className="mt-2 text-2xl font-display">{title}</h3>
                        <p className="mt-2 subtle">{desc}</p>
                    </div>
                ))}
            </section>

            {/* Skills + Resume and Stats */}
            <section className="reveal-up">
                <div className='w-full'>
                    <p className="w-full subtle">
                        From teaching coding at Byte Builders to developing enterprise systems at Growth Wave and Africlouds, I've built a diverse skill set. I'm passionate about creating technology that empowers communities and solves real challenges.
                    </p>
                    

                    <div className="grid grid-cols-3 gap-8 mt-12">
                        {[
                            ['3', 'Years Experience'],
                            ['6', 'Organizations Served'],
                            ['10', 'Projects Completed']
                        ].map(([num, label]) => (
                            <div key={label}>
                                <div className="text-5xl stat-number font-display text-accent" data-target={num}>{num}+</div>
                                <div className="mt-2 text-sm subtle">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <div className="reveal-up">
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
        </div>
    )
}