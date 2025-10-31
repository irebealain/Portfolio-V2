import React from 'react'

export default function UnderConstruction() {
    return (
        <div className="fixed inset-0 flex items-center justify-center px-4 text-center bg-black/95">
            <div className="space-y-6">
                <div className="text-xl animate-pulse text-accent">//  Under Development</div>
                <h1 className="text-4xl md:text-6xl font-display">Coming Soon</h1>
                <p className="max-w-md mx-auto text-lg text-white/70">
                    We're currently crafting something amazing.
                    Our new portfolio website is under development and will be ready soon!
                </p>
                <div className="flex flex-col justify-center gap-4 mt-8 sm:flex-row">
                    <a
                        href="https://github.com/irebealain"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 transition rounded-full bg-accent text-accent-fore hover:opacity-90"
                    >
                        Visit GitHub
                    </a>
                    <a
                        href="mailto:irebalain@gmail.com"
                        className="px-6 py-3 transition border rounded-full border-accent/20 text-accent hover:bg-accent/10"
                    >
                        Contact Me
                    </a>
                </div>
                <div className="mt-12 text-sm text-white/50">
                    <p>Expected completion: This November 2025</p>
                </div>
            </div>
        </div>
    )
}