import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import img1 from '../assets/gallery/DSC07233.JPG';
import img2 from '../assets/gallery/donecalvin_76.JPG';
import img3 from '../assets/gallery/DSC01964.jpg';
import img4 from '../assets/gallery/ASYVGraduation-202518052516th-May-2025_156.JPG';
import img5 from '../assets/gallery/DSC00207.JPG';
import img6 from '../assets/gallery/DSC00197.JPG';
import img7 from '../assets/gallery/DSC08606.jpg';
import img8 from '../assets/gallery/Mentorship_22.JPG';
import img9 from '../assets/gallery/10.jpg';
import img10 from '../assets/gallery/_DSC5084 - Copy.jpg';
import certAstronomy from '../assets/certificates/International Astronomy and Astrophysics Certificate.png';
import certPioneer from '../assets/certificates/certificate_for_Pioneer_2nd Summit.png';
import certAlain from '../assets/certificates/Alain - Certificate.png';
import certGGC from '../assets/certificates/GGC Online Class Certificates Spring 2024 Alain.png';
import certWriting from '../assets/certificates/Cr R&WR-2-Cert (1)-part-2.png';
import certGeneric1 from '../assets/certificates/certificate_6761101696098439.png';
import certUdacity from '../assets/certificates/Learn the Latest Tech Skills_ Advance Your Career _ Udacity.png';
import certGeneric2 from '../assets/certificates/certificate_6767761696095279.png';
import certIXL1 from '../assets/certificates/IXL.png';
import certPioneer2 from '../assets/certificates/certificate_for_Pioneer_2nd Summit(1).png';
import certGeneric3 from '../assets/certificates/certificate.png';
import certGeneric4 from '../assets/certificates/certificate_6768321696097116.png';
import certTimeManagement from '../assets/certificates/Time Management-1-Cert-part-5.png';
import certIXL2 from '../assets/certificates/IXL2.png';
import certPublicSpeaking from '../assets/certificates/Public Speaking-6-Cert-part-9.png';
import certClimate from '../assets/certificates/certificate climate science.png';
import certAlain2 from '../assets/certificates/Alain IREBE GASHUMBA.png';
import certGashumba from '../assets/certificates/Gashumba Alain.png';

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
        img1, // Replace with your actual images
        img2,
        img3,
        img4,
        img5,
        img6,
        img7,
        img8,
        img9,
        img10,
    ]
    // Arrary for the certificates
    const certificates = [
    {
        title: "International Astronomy & Astrophysics Certification",
        description: "Awarded for completing an advanced astronomy and astrophysics program.",
        year: "2024",
        img: certAstronomy
    },
    {
        title: "Pioneer Research Program Participation",
        description: "Recognized for contributing to the Pioneer Research Summit.",
        year: "2024",
        img: certPioneer
    },
    {
        title: "Achievement Certificate – Alain",
        description: "General certificate awarded for academic or extracurricular excellence.",
        year: "2023",
        img: certAlain
    },
    {
        title: "GGC Spring 2024 Class Certificate",
        description: "Completed GGC Online Learning Program for Spring 2024.",
        year: "2024",
        img: certGGC
    },
    {
        title: "Creative Reading & Writing Certificate",
        description: "Awarded for excellence in reading, writing, and creative expression.",
        year: "2023",
        img: certWriting
    },
    {
        title: "Certificate of Completion",
        description: "Successfully completed a learning module or skill program.",
        year: "2023",
        img: certGeneric1
    },
    {
        title: "Udacity Tech Skills Certificate",
        description: "Awarded for completing a Udacity course focused on modern technology skills.",
        year: "2024",
        img: certUdacity
    },
    {
        title: "Professional Development Certificate",
        description: "Recognition for completing a specialized training curriculum.",
        year: "2023",
        img: certGeneric2
    },
    {
        title: "IXL Skills Mastery Certificate",
        description: "Awarded for achieving high proficiency in IXL learning modules.",
        year: "2022",
        img: certIXL1
    },
    {
        title: "Pioneer Summit Certificate",
        description: "Recognized for participation and contribution to the Pioneer Summit.",
        year: "2024",
        img: certPioneer2
    },
    {
        title: "General Certificate",
        description: "Acknowledgment of completion or recognition for training performance.",
        year: "2023",
        img: certGeneric3
    },
    {
        title: "Certificate of Achievement",
        description: "Recognized for outstanding progress in an academic or skill-based program.",
        year: "2023",
        img: certGeneric4
    },
    {
        title: "Time Management Course Certificate",
        description: "Completed a structured course on effective time management.",
        year: "2023",
        img: certTimeManagement
    },
    {
        title: "IXL Excellence Certificate",
        description: "Awarded for high performance across multiple IXL categories.",
        year: "2022",
        img: certIXL2
    },
    {
        title: "Public Speaking Certificate",
        description: "Awarded for completing a public speaking and communication mastery program.",
        year: "2024",
        img: certPublicSpeaking
    },
    {
        title: "Climate Science Certification",
        description: "Completed a climate science educational program focused on environmental awareness.",
        year: "2024",
        img: certClimate
    },
    {
        title: "Certificate of Recognition – Alain",
        description: "General recognition for academic or community achievements.",
        year: "2023",
        img: certAlain2
    },
    {
        title: "Gashumba Alain Certificate",
        description: "Official certificate awarded for successful program completion.",
        year: "2022",
        img: certGashumba
    }
    ];
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
                                    className="object-cover w-full h-full shadow-2xl rounded-2xl"
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
                <div className="text-accent">// Certificates & Recognition</div>
                <h2 className="heading-lg md:text-6xl">Professional Certifications</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                    {certificates.map((cert, i) => (
                    <div 
                        key={i} 
                        className="rounded-xl overflow-hidden shadow-lg bg-card border border-white/10 hover:shadow-xl transition"
                    >
                        <img 
                        src={cert.img} 
                        alt={cert.title} 
                        className="w-full h-56 object-cover"
                        />

                        <div className="p-4">
                        <h3 className="font-display text-xl">{cert.title}</h3>
                        <p className="text-sm subtle mt-1">{cert.description}</p>
                        <div className="text-xs text-accent mt-2">{cert.year}</div>
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