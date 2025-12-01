import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Menu() {
    const [open, setOpen] = useState(false)
    const containerRef = useRef(null)

    useEffect(() => {
        const onClickAway = (e) => {
            if (!containerRef.current) return
            if (!containerRef.current.contains(e.target)) setOpen(false)
        }
        const onKey = (e) => e.key === 'Escape' && setOpen(false)
        window.addEventListener('mousedown', onClickAway)
        window.addEventListener('keydown', onKey)
        return () => {
            window.removeEventListener('mousedown', onClickAway)
            window.removeEventListener('keydown', onKey)
        }
    }, [])

    return (
        <div ref={containerRef} className="relative">
            <button
                aria-haspopup="true"
                aria-expanded={open}
                className="px-4 py-2 bg-white text-black rounded-full text-sm shadow-soft"
                onClick={() => setOpen((v) => !v)}
                data-cursor-link
            >
                Menu
            </button>
            <div
                className={`absolute right-0 top-full mt-2 origin-top-right transform transition-all duration-200 ${open ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-0 pointer-events-none'
                    }`}
            >
                <div className="min-w-[12rem] rounded-xl border border-black/10 bg-white text-black shadow-xl p-2">
                    <div className="flex items-center justify-between px-3 py-2 text-sm font-medium text-black/70">
                        <span>Menu</span>
                        <span className="inline-flex items-center gap-1 text-black/60">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6" /></svg>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                        </span>
                    </div>
                    <MenuItem to="/home" label="Home" onNavigate={() => setOpen(false)} />
                    <MenuItem to="/about" label="About" onNavigate={() => setOpen(false)} />
                    <MenuItem to="/projects" label="Project" onNavigate={() => setOpen(false)} />
                    <MenuItem to="/blog" label="Blog" onNavigate={() => setOpen(false)} />
                    <MenuItem to="/contact" label="Contact" onNavigate={() => setOpen(false)} />
                </div>
            </div>
        </div>
    )
}

function MenuItem({ to, label, onNavigate }) {
    return (
        <NavLink
            to={to}
            onClick={onNavigate}
            className={({ isActive }) => `block w-full text-left px-3 py-2 rounded-lg transition ${isActive ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-black/5'}`}
            data-cursor-link
        >
            {label}
        </NavLink>
    )
}


