import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Testimonials from '../components/Testimonials.jsx'
import electionSystem from '../assets/ElectionDashboard.png'

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
        }, rootRef)
        return () => ctx.revert()
    }, [])

    const name = 'ALAIN IREBE GASHUMBA'

    return (
        <div ref={rootRef} className="space-y-24">
            {/* Hero */}
            <section className="grid items-end gap-8 pt-10 md:pt-20 md:grid-cols-2">
                <div>
                    <p className="text-xs tracking-widest uppercase hero-kicker text-accent">Hey, I’m a Full Stack Developer</p>
                    <h1 className="mt-4 hero-name heading-xxl">{name}</h1>
                    <p className="max-w-md mt-6 hero-copy subtle">
                        I craft fast, scalable, and user-friendly web applications with modern JavaScript frameworks — combining React on the frontend with robust server-side solutions using Node.js.
                    </p>
                </div>
                <div className="relative flex justify-center md:justify-end">
                    <div className="relative hero-portrait">
                        <div className="absolute rounded-full -inset-12 bg-emerald-500/20 blur-3xl"></div>
                        <img className="relative z-10 w-[360px] h-[460px] object-cover rounded-2xl" src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1200&auto=format&fit=crop" alt="Portrait" />
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <div className="reveal-up">
                <Testimonials />
            </div>

            {/* Clients */}
            <section className="space-y-6 reveal-up">
                <div className="text-accent">// My Client</div>
                <h2 className="heading-lg">Worked With Amazing Clients</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {['Liquidnet Family High School', 'Agahozo-Shalom Youth Village', 'Africloud', 'Academic Bridge', 'GrowthWave', 'KOKO App'].map((c) => (
                        <div key={c} className="flex items-center justify-center p-5 card text-white/70">{c}</div>
                    ))}
                </div>
            </section>

            {/* Blogs */}
            <section className="space-y-6 reveal-up">
                <div className="text-accent">// Blogs</div>
                <h2 className="heading-lg">Developer Insights & Ideas</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    {[
                        ['Frontend vs. Backend: Which Path Should You Choose?', 'React JS', '2025-12-12'],
                        ['11 SEO for Developers: Optimizing Websites for Better Rankings', 'Development', '2025-12-27'],
                        ['Working Remotely as a Full Stack Developer: My Workflow & Tools', 'Freelancing', '2025-05-31'],
                    ].map(([title, tag, date], i) => (
                        <article key={title} className="overflow-hidden card">
                            <img className="object-cover w-full h-56" src={`https://picsum.photos/seed/blog-${i}/1200/800`} alt="Blog cover" />
                            <div className="p-5">
                                <div className="flex items-center gap-3 text-xs text-muted">
                                    <span className="px-2 py-1 border rounded-full bg-accent/10 text-accent border-accent/20">{tag}</span>
                                    <span>{new Date(date).toDateString()}</span>
                                </div>
                                <h3 className="mt-2 text-xl font-display">{title}</h3>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="relative py-24 text-center reveal-up">
                <div className="absolute inset-0 rounded-full bg-emerald-600/20 blur-3xl" />
                <div className="relative">
                    <h2 className="text-4xl heading-lg md:text-6xl font-display">READY TO TAKE YOUR IDEA TO THE NEXT LEVEL?</h2>
                    <a className="inline-flex px-6 py-3 mt-8 rounded-full bg-accent text-accent-fore" href="#contact">Start Project</a>
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
                        <img className="w-[420px] h-[520px] object-cover rounded" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop" alt="Stacked" />
                    </div>
                </div>
            </section>

            {/* Skills + Resume and Stats */}
            <section className="grid items-start gap-8 md:grid-cols-2 reveal-up">
                <div className="space-y-6">
                    <div>
                        <div className="text-accent">// Skills</div>
                        <div className="pt-4 mt-2 border-t border-border">
                            <div className="font-medium">Frontend</div>
                            <div className="mt-2 subtle">GSAP • Next • JavaScript • React • Tailwind CSS</div>
                        </div>
                        <div className="pt-4 mt-4 border-t border-border">
                            <div className="font-medium">Server-side development</div>
                            <div className="mt-2 subtle">Node.js • Express.js • MongoDB • PHP • Django</div>
                        </div>
                        <div className="pt-4 mt-4 border-t border-border">
                            <div className="font-medium">Tools</div>
                            <div className="mt-2 subtle">Git • GitHub • Stack Overflow • Cloudinary</div>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="max-w-xl subtle">
                        I thrive on solving real-world problems, turning ideas into clean, maintainable code, and learning through experimentation.
                    </p>
                    <a className="inline-flex px-6 py-3 mt-6 rounded-full bg-accent text-accent-fore" href="#">My Resume</a>

                    <div className="grid grid-cols-3 gap-8 mt-12">
                        {[['4+', 'Years in Experience'], ['5+', 'Clients NationalWide'], ['10+', 'Completed Projects']].map(([num, label]) => (
                            <div key={label} className="">
                                <div className="text-5xl font-display text-accent">{num}</div>
                                <div className="mt-2 subtle">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Explore Work */}
            <section id="projects" className="space-y-6 reveal-up">
                <div className="flex items-end justify-between">
                    <div>
                        <div className="text-accent">// Explore Work</div>
                        <h2 className="mt-2 heading-lg">A Showcase of My Latest Projects</h2>
                    </div>
                </div>
                <div className="grid gap-8 sm:grid-cols-2">
                    {[
                        { title: 'ASYV Election System', img: 'https://picsum.photos/seed/techzo/1200/800' },
                        { title: 'ASYV Kitchen App', img: 'https://picsum.photos/seed/lumin/1200/800' },
                        { title: 'Dreamiz', img: 'https://picsum.photos/seed/nubuilt/1200/800' },
                        { title: 'GrowthWave', img: 'https://picsum.photos/seed/design-orbit/1200/800' },
                    ].map((proj, idx) => (
                        <article key={proj.title} className="overflow-hidden card group">
                            <div className="aspect-[16/10] bg-black/40">
                                <img className="object-cover w-full h-full" src={proj.img} alt={proj.title} />
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-display">{proj.title}</h3>
                                <p className="mt-2 subtle">A brief description of the project and its purpose.</p>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {['HTML5 & CSS', 'React', 'GSAP', 'Vite'].slice(0, 2 + (idx % 2)).map((t) => (
                                        <span key={t} className="px-2 py-1 text-xs border rounded-full bg-accent/10 text-accent border-accent/20">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Services */}
            <section className="space-y-6 reveal-up">
                <div className="text-accent">// Service</div>
                <h2 className="heading-lg">End-to-End Web Development Services</h2>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="p-6 card">
                        <h3 className="text-xl font-display">Custom Web Development</h3>
                        <p className="mt-2 subtle">Build complete web applications from scratch — frontend to backend — optimized for speed, security, and scalability.</p>
                    </div>
                    {['Frontend Engineering', 'Server logic & API Development', 'Full Stack Application Development'].map((t) => (
                        <div key={t} className="p-6 card">
                            <h3 className="text-xl font-display">{t}</h3>
                            <p className="mt-2 subtle">Detailed service description.</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Process */}
            <section id="process" className="grid gap-6 md:grid-cols-3 reveal-up">
                {[
                    ['01', 'Plan & Architect', 'Before writing a single line of code, I dive deep into understanding the project goals, user needs, and technical constraints.'],
                    ['02', 'Build & Develop', 'Build pixel-perfect user interfaces and robust backend systems in parallel.'],
                    ['03', 'Launch & Support', 'Post-launch monitoring, performance optimization, and iteration support.'],
                ].map(([num, title, desc]) => (
                    <div key={title} className="p-6 card">
                        <div className="text-6xl font-display text-accent/80">{num}</div>
                        <h3 className="mt-2 text-2xl font-display">{title}</h3>
                        <p className="mt-2 subtle">{desc}</p>
                    </div>
                ))}
            </section>
        </div>
    )
}


