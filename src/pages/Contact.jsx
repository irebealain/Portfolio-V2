import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, CheckCircle } from 'lucide-react'
import FinalCV from '../assets/papers/Final CV.pdf'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
    const rootRef = useRef(null)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Hero animations
            gsap.from('.contact-hero-title', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' })
            gsap.from('.contact-hero-subtitle', { y: 20, opacity: 0, duration: 0.6, delay: 0.1, ease: 'power2.out' })

            // Contact cards animation
            gsap.from('.contact-card', {
                y: 30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.contact-cards',
                    start: 'top 85%'
                }
            })

            // Form animation
            gsap.from('.contact-form', {
                y: 40,
                opacity: 0,
                duration: 0.7,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.contact-form',
                    start: 'top 85%'
                }
            })

            // Social links animation
            gsap.from('.social-link', {
                scale: 0,
                opacity: 0,
                stagger: 0.08,
                duration: 0.4,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '.social-links',
                    start: 'top 85%'
                }
            })
        }, rootRef)
        return () => ctx.revert()
    }, [])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Create mailto link with form data
        const mailtoLink = `mailto:irebalain@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        )}`
        
        window.location.href = mailtoLink
        
        setTimeout(() => {
            setIsSubmitting(false)
            setIsSubmitted(true)
            setFormData({ name: '', email: '', subject: '', message: '' })
            
            setTimeout(() => setIsSubmitted(false), 5000)
        }, 1000)
    }

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email',
            value: 'irebalain@gmail.com',
            link: 'mailto:irebalain@gmail.com'
        },
        {
            icon: Phone,
            title: 'Phone',
            value: '+250 795 294 958',
            link: 'tel:+250795294958'
        },
        {
            icon: MapPin,
            title: 'Location',
            value: 'Kigali, Rwanda',
            link: null
        }
    ]

    const socialLinks = [
        {
            icon: Github,
            name: 'GitHub',
            url: 'https://github.com/irebealain',
            color: 'hover:text-white'
        },
        {
            icon: Linkedin,
            name: 'LinkedIn',
            url: 'https://linkedin.com/in/alain-gashumba',
            color: 'hover:text-blue-400'
        },
        {
            icon: Mail,
            name: 'Email',
            url: 'mailto:irebalain@gmail.com',
            color: 'hover:text-emerald-400'
        }
    ]

    return (
        <div ref={rootRef} className="min-h-screen py-16 space-y-16">
            {/* Hero Section */}
            <section className="px-4 mx-auto max-w-7xl">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="contact-hero-title">
                        <div className="text-accent">// Get in Touch</div>
                        <h1 className="mt-4 heading-xxl">Let's Work Together</h1>
                    </div>
                    <p className="max-w-2xl mx-auto mt-6 text-lg contact-hero-subtitle subtle">
                        Have a project in mind or just want to chat? I'd love to hear from you. 
                        Feel free to reach out through any of the channels below.
                    </p>
                </div>
            </section>

            {/* Contact Cards */}
            <section className="px-4 mx-auto max-w-7xl">
                <div className="grid max-w-5xl gap-6 mx-auto contact-cards md:grid-cols-3">
                    {contactInfo.map((info) => (
                        <div key={info.title} className="p-6 text-center transition-transform cursor-pointer contact-card card hover:scale-105">
                            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10">
                                <info.icon className="w-8 h-8 text-accent" />
                            </div>
                            <h3 className="mb-2 text-lg font-medium font-display">{info.title}</h3>
                            {info.link ? (
                                <a 
                                    href={info.link}
                                    className="text-white/70 hover:text-accent transition-colors"
                                >
                                    {info.value}
                                </a>
                            ) : (
                                <p className="text-white/70">{info.value}</p>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Form */}
            <section className="px-4 mx-auto max-w-7xl">
                <div className="max-w-3xl mx-auto">
                    <div className="p-8 contact-form card md:p-12">
                        <h2 className="mb-2 text-3xl text-center font-display">Send Me a Message</h2>
                        <p className="mb-8 text-center text-white/70">
                            Fill out the form below and I'll get back to you as soon as possible.
                        </p>

                        {isSubmitted && (
                            <div className="flex items-center gap-3 p-4 mb-6 border rounded-lg bg-emerald-500/10 border-emerald-500/30 text-emerald-400 animate-fade-in">
                                <CheckCircle className="w-5 h-5" />
                                <span>Opening your email client...</span>
                            </div>
                        )}

                        <div className="space-y-6">
                            {/* Name */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-white/90">
                                    Your Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 transition-colors border rounded-lg bg-white/5 border-white/10 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                                    placeholder="John Doe"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-white/90">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 transition-colors border rounded-lg bg-white/5 border-white/10 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                                    placeholder="john@example.com"
                                />
                            </div>

                            {/* Subject */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-white/90">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 transition-colors border rounded-lg bg-white/5 border-white/10 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                                    placeholder="Project Collaboration"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-white/90">
                                    Message *
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={6}
                                    className="w-full px-4 py-3 transition-colors border rounded-lg resize-none bg-white/5 border-white/10 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                                    placeholder="Tell me about your project or inquiry..."
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting || !formData.name || !formData.email || !formData.subject || !formData.message}
                                className="flex items-center justify-center w-full gap-2 px-6 py-3 transition-transform rounded-full bg-accent text-accent-fore hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Opening Email...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="px-4 mx-auto max-w-7xl">
                <div className="max-w-4xl p-12 mx-auto text-center card bg-gradient-to-br from-emerald-900/20 to-emerald-950/40">
                    <h3 className="mb-4 text-3xl font-display">Ready to Start a Project?</h3>
                    <p className="max-w-2xl mx-auto mb-6 text-lg text-white/70">
                        Whether you need a full-stack developer, a technical mentor, or a collaborator for your next big idea, 
                        I'm here to help bring your vision to life.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <a
                            href="mailto:irebalain@gmail.com"
                            className="px-6 py-3 transition-transform rounded-full bg-accent text-accent-fore hover:scale-105"
                        >
                            Email Me Directly
                        </a>
                        <a
                            href= {FinalCV}
                            target="_blank"
                            className="px-6 py-3 transition-colors border rounded-full border-accent/20 text-accent hover:bg-accent/10"
                        >
                            Download My CV
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}