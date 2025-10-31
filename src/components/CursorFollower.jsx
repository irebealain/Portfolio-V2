import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function CursorFollower() {
    const dotRef = useRef(null)
    const arrowRef = useRef(null)
    const [enabled, setEnabled] = useState(true)

    useEffect(() => {
        const dot = dotRef.current
        const arrow = arrowRef.current
        if (!dot || !arrow) return

        const move = (e) => {
            if (!enabled) return
            gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.15, ease: 'power3.out' })
            gsap.to(arrow, { x: e.clientX, y: e.clientY, duration: 0.15, ease: 'power3.out' })
        }

        const handleEnter = () => {
            gsap.to(dot, { scale: 3.2, duration: 0.2, backgroundColor: 'rgba(16,185,129,0.25)' })
            gsap.to(arrow, { opacity: 1, scale: 1, duration: 0.2 })
        }
        const handleLeave = () => {
            gsap.to(dot, { scale: 1, duration: 0.2, backgroundColor: 'rgba(34,197,94,1)' })
            gsap.to(arrow, { opacity: 0, scale: 0.6, duration: 0.2 })
        }

        window.addEventListener('mousemove', move)
        // Grow on link hover
        const links = Array.from(document.querySelectorAll('a, button, [data-cursor-link=true]'))
        links.forEach((el) => {
            el.addEventListener('mouseenter', handleEnter)
            el.addEventListener('mouseleave', handleLeave)
        })

        return () => {
            window.removeEventListener('mousemove', move)
            links.forEach((el) => {
                el.removeEventListener('mouseenter', handleEnter)
                el.removeEventListener('mouseleave', handleLeave)
            })
        }
    }, [enabled])

    // Hide follower when leaving window
    useEffect(() => {
        const dot = dotRef.current
        const arrow = arrowRef.current
        const hide = () => gsap.to([dot, arrow], { opacity: 0, duration: 0.2 })
        const show = () => gsap.to([dot, arrow], { opacity: 1, duration: 0.2 })
        window.addEventListener('mouseout', hide)
        window.addEventListener('mouseover', show)
        return () => {
            window.removeEventListener('mouseout', hide)
            window.removeEventListener('mouseover', show)
        }
    }, [])

    if (!enabled) return null

    return (
        <>
            <div
                ref={dotRef}
                className="pointer-events-none fixed left-0 top-0 z-[100] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent mix-blend-screen"
            />
            <div
                ref={arrowRef}
                className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 opacity-0"
            >
                <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </div>
            </div>
        </>
    )
}


