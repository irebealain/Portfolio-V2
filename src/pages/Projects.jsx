// ProjectsVideosCentered.jsx
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { title: 'Omnifood', desc: 'A modern website food suggesting website built for health purposes', tags: ['HTML5','CSS3'], videoId: 'GsCMvjqXGlQ' },
  { title: 'ASYV Election System', desc: 'Modern ', tags: ['HTML5','Tailwind CSS','React'], videoId: 'wmeuwbAaH9w' },
  { title: 'Jumping Shell in Py3', desc: 'Sleek architecture template...', tags: ['HTML5','CSS','GSAP'], videoId: 'zGvHMHVRVZ8' },
  { title: 'Career Connect Hub', desc: 'Conversion-focused portfolio template...', tags: ['HTML5','GSAP','Vite'], videoId: 'e-ukJAwb48gJo' },
  { title: 'Moody IO', desc: 'Consultant website template...', tags: ['HTML5','Tailwind CSS','Alpine.js'], videoId: 'dVD2CbG_-oM' },
]

export default function ProjectsVideosCentered() {
  const rootRef = useRef(null)
  const cardsRef = useRef([])
  const overlayRef = useRef(null)
  const modalRef = useRef(null)
  const iframeRef = useRef(null)
  const lastActiveRef = useRef(null)

  const [isOpen, setIsOpen] = useState(false)
  const [index, setIndex] = useState(0)

  // GSAP entrance for cards
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.projects-title', { y: 24, opacity: 0, duration: 0.7, ease: 'power2.out' })
      cardsRef.current.forEach((el, i) => {
        if (!el) return
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 85%' },
          y: 30,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.05,
          ease: 'power2.out'
        })
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  // open modal centered
  function openModal(i, originEl) {
    lastActiveRef.current = originEl || document.activeElement
    setIndex(i)
    setIsOpen(true)
    document.body.style.overflow = 'hidden'
    // animate in
    setTimeout(() => {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' })
      gsap.fromTo(modalRef.current, { scale: 0.98, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: 'power3.out' })
      // focus close
      modalRef.current?.querySelector('[data-close]')?.focus()
    }, 30)
  }

  // close modal and stop playback
  function closeModal() {
    gsap.to(modalRef.current, { scale: 0.99, opacity: 0, duration: 0.22, ease: 'power2.in' })
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.18, ease: 'power2.in', onComplete: () => {
      setIsOpen(false)
      document.body.style.overflow = ''
      if (iframeRef.current) iframeRef.current.src = ''
      lastActiveRef.current?.focus?.()
    }})
  }

  function prev() { setIndex(i => (i - 1 + projects.length) % projects.length) }
  function next() { setIndex(i => (i + 1) % projects.length) }

  // set iframe src when modal opens or index changes (autoplay + show YouTube controls)
  useEffect(() => {
    if (!isOpen) return
    const vid = projects[index]?.videoId
    if (!vid) return
    // controls=1 ensures native YouTube controls are visible
    const src = `https://www.youtube.com/embed/${vid}?autoplay=1&controls=1&rel=0&modestbranding=1`
    const frame = iframeRef.current
    if (!frame) return
    // fade transition between videos
    gsap.to(frame, { opacity: 0, duration: 0.16, ease: 'power2.out', onComplete: () => {
      frame.src = src
      gsap.to(frame, { opacity: 1, duration: 0.25, ease: 'power2.out' })
    }})
  }, [index, isOpen])

  // keyboard handling (Esc / arrows) and focus trap
  useEffect(() => {
    function onKey(e) {
      if (!isOpen) return
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Tab') {
        const focusable = modalRef.current?.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), iframe')
        if (!focusable || focusable.length === 0) return
        const first = focusable[0], last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  // close when clicking overlay (outside centered modal)
  function onOverlayClick(e) {
    if (e.target === overlayRef.current) closeModal()
  }

  // simple swipe support for mobile
  useEffect(() => {
    let startX = null
    function onTouchStart(e) { startX = e.touches?.[0]?.clientX ?? null }
    function onTouchEnd(e) {
      if (startX == null) return
      const endX = e.changedTouches?.[0]?.clientX ?? null
      const dx = endX - startX
      if (Math.abs(dx) > 50) { if (dx < 0) next(); else prev() }
      startX = null
    }
    const el = modalRef.current
    if (!el) return
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [isOpen, index])

  // render
  return (
    <div ref={rootRef} className="space-y-10">
      <header className="flex items-end justify-between">
        <div>
          <div className="text-accent">// Explore Work</div>
          <h1 className="projects-title heading-xl">A Showcase of My Best Projects — Videos</h1>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-10">
        {projects.map((p, i) => {
          const thumb = p.videoId ? `https://img.youtube.com/vi/${p.videoId}/hqdefault.jpg` : `https://picsum.photos/seed/${encodeURIComponent(p.title)}/1600/900`
          return (
            <article key={p.title} ref={el => (cardsRef.current[i] = el)} className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur">
              <div className="relative">
                <div className="aspect-[16/9] bg-black/5">
                  <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src={thumb} alt={`${p.title} thumbnail`} loading="lazy" />
                </div>

                <button
                  onClick={(e) => openModal(i, e.currentTarget)}
                  className="absolute left-6 top-6 h-12 w-12 rounded-full bg-gradient-to-br from-accent/90 to-accent/60 text-black flex items-center justify-center shadow-lg border border-white/10 hover:scale-105 transition-transform"
                  aria-label={`Open video for ${p.title}`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M5 3v18l15-9L5 3z" />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                <h3 className="font-display text-2xl">{p.title}</h3>
                <p className="subtle mt-2 line-clamp-3">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map(t => <span key={t} className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">{t}</span>)}
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {/* Centered Modal */}
      {isOpen && (
        <div ref={overlayRef} className="fixed inset-0 z-60 flex items-center justify-center p-4" onClick={onOverlayClick} aria-modal="true" role="dialog" aria-label={`${projects[index].title} video`}>
          {/* dark overlay */}
          <div aria-hidden className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

          {/* centered container */}
          <div ref={modalRef} className="relative z-10 max-w-[1200px] w-full mx-auto" style={{ maxHeight: '90vh' }}>
            {/* video wrapper: responsive 16:9 centered */}
            <div className="bg-black rounded-xl overflow-hidden shadow-2xl" style={{ aspectRatio: '16/9', width: '100%' }}>
              <iframe
                ref={iframeRef}
                title={projects[index].title}
                className="w-full h-full block"
                src={''} // set via effect to enable autoplay
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* subtle controls outside the video, small and unobtrusive */}
            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="flex gap-2">
                <button onClick={prev} aria-label="Previous video" className="h-10 w-10 rounded-full bg-white/6 text-white hover:bg-white/10 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
                <button onClick={next} aria-label="Next video" className="h-10 w-10 rounded-full bg-white/6 text-white hover:bg-white/10 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <a href={`https://www.youtube.com/watch?v=${projects[index].videoId}`} target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-full bg-accent text-black">Watch on YouTube</a>
                <button data-close onClick={closeModal} className="h-10 px-3 rounded-full border border-white/8">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
