import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FileText, Calendar, Clock, Download, ExternalLink, BookOpen } from 'lucide-react'
import myPaper from '../assets/papers/Alain_Research writing.pdf'
gsap.registerPlugin(ScrollTrigger)

export default function Blog() {
    const rootRef = useRef(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Hero animations
            gsap.from('.blog-hero-title', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' })
            gsap.from('.blog-hero-subtitle', { y: 20, opacity: 0, duration: 0.6, delay: 0.1, ease: 'power2.out' })

            // Paper card animation
            gsap.from('.paper-card', {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.paper-card',
                    start: 'top 85%'
                }
            })

            // Abstract sections
            gsap.from('.abstract-section', {
                y: 30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.abstract-content',
                    start: 'top 85%'
                }
            })
        }, rootRef)
        return () => ctx.revert()
    }, [])

    // Your research paper details - UPDATE THESE WITH YOUR ACTUAL PAPER INFO
    const researchPaper = {
        title: 'HOW HAS CORRUPTION IN KENYA INFLUENCED THE ECONOMY AND POLITICAL STABILITY IN KENYA OVER THE LAST 20 YEARS',
        subtitle: 'A comprehensive study on [your research topic]',
        author: 'Alain Irebe Gashumba',
        date: 'August 2025',
        readTime: '15 min read',
        category: 'Research',
        tags: ['Corruption', 'Economy', 'Politics'],
        abstract: `This research paper explores [brief description of your research]. 
        
        The study focuses on [main focus areas], presenting findings that demonstrate [key findings]. 
        
        Through comprehensive analysis and research methodology, this paper contributes to [contribution to the field].`,
        
        keyFindings: [
            'Key finding or contribution #1',
            'Key finding or contribution #2',
            'Key finding or contribution #3',
            'Key finding or contribution #4'
        ],
        
        pdfUrl: myPaper, // Update with your actual PDF path
        externalUrl: myPaper, // Open in a new window
        image: 'https://images.unsplash.com/photo-1751358017764-1466ffc118aa?q=80&w=1633&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' // Update with your paper cover image
    }

    return (
        <div ref={rootRef} className="min-h-screen py-16 space-y-16">
            {/* Hero Section */}
            <section className="px-4 mx-auto max-w-7xl">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="blog-hero-title">
                        <div className="text-accent">// Research & Publications</div>
                        <h1 className="mt-4 heading-xxl">My Research Work</h1>
                    </div>
                    <p className="max-w-2xl mx-auto mt-6 text-lg blog-hero-subtitle subtle">
                        Exploring innovative solutions through research and documentation. Here's my published research paper and findings.
                    </p>
                </div>
            </section>

            {/* Research Paper Card */}
            <section className="px-4 mx-auto max-w-7xl">
                <div className="max-w-5xl mx-auto overflow-hidden paper-card card">
                    {/* Paper Cover Image */}
                    <div className="relative h-64 overflow-hidden md:h-96 bg-gradient-to-br from-emerald-900/20 to-emerald-950/40">
                        <img 
                            src={researchPaper.image} 
                            alt="Research paper cover"
                            className="object-cover w-full h-full opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        
                        {/* Category Badge */}
                        <div className="absolute px-4 py-2 text-xs font-medium border rounded-full top-6 left-6 bg-accent/10 text-accent border-accent/20 backdrop-blur-sm">
                            {researchPaper.category}
                        </div>
                    </div>

                    {/* Paper Content */}
                    <div className="p-8 md:p-12">
                        {/* Title & Metadata */}
                        <div className="pb-6 mb-6 border-b border-border">
                            <h2 className="text-3xl md:text-4xl font-display">{researchPaper.title}</h2>
                            <p className="mt-3 text-xl text-white/70">{researchPaper.subtitle}</p>
                            
                            {/* Metadata */}
                            <div className="flex flex-wrap gap-4 mt-6 text-sm text-white/60">
                                <div className="flex items-center gap-2">
                                    <BookOpen className="w-4 h-4 text-accent" />
                                    <span>{researchPaper.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-accent" />
                                    <span>{researchPaper.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-accent" />
                                    <span>{researchPaper.readTime}</span>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {researchPaper.tags.map((tag) => (
                                    <span key={tag} className="px-3 py-1 text-xs border rounded-full bg-accent/5 text-accent border-accent/20">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Abstract */}
                        <div className="mb-8 abstract-content">
                            <div className="abstract-section">
                                <h3 className="flex items-center gap-2 mb-4 text-xl font-display text-accent">
                                    <FileText className="w-5 h-5" />
                                    Abstract
                                </h3>
                                <div className="space-y-4 text-lg leading-relaxed text-white/80">
                                    {researchPaper.abstract.split('\n\n').map((paragraph, index) => (
                                        <p key={index}>{paragraph.trim()}</p>
                                    ))}
                                </div>
                            </div>

                            {/* Key Findings */}
                            <div className="mt-8 abstract-section">
                                <h3 className="mb-4 text-xl font-display text-accent">Key Findings & Contributions</h3>
                                <ul className="space-y-3">
                                    {researchPaper.keyFindings.map((finding, index) => (
                                        <li key={index} className="flex items-start gap-3 text-white/80">
                                            <span className="flex-shrink-0 w-6 h-6 mt-1 text-sm font-bold rounded-full bg-accent/10 text-accent flex items-center justify-center">
                                                {index + 1}
                                            </span>
                                            <span>{finding}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-4 pt-6 border-t sm:flex-row border-border">
                            <a
                                href={researchPaper.pdfUrl}
                                download
                                className="flex items-center justify-center gap-2 px-6 py-3 transition-transform rounded-full bg-accent text-accent-fore hover:scale-105"
                            >
                                <Download className="w-5 h-5" />
                                Download PDF
                            </a>
                            {researchPaper.externalUrl && (
                                <a
                                    href={researchPaper.externalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-6 py-3 transition-colors border rounded-full border-accent/20 text-accent hover:bg-accent/10"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                    Open In New Window
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* About the Research Section */}
            <section className="px-4 mx-auto max-w-7xl">
                <div className="max-w-4xl p-8 mx-auto md:p-12 card">
                    <div className="text-center">
                        <h3 className="mb-4 text-2xl font-display">Interested in My Research?</h3>
                        <p className="mb-6 text-lg text-white/70">
                            I'm passionate about conducting research that creates real-world impact. 
                            If you'd like to discuss this research or explore collaboration opportunities, feel free to reach out.
                        </p>
                        <a 
                            href="mailto:irebalain@gmail.com"
                            className="inline-flex px-6 py-3 transition-transform rounded-full bg-accent text-accent-fore hover:scale-105"
                        >
                            Get in Touch
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}