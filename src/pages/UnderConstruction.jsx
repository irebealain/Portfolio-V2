import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoadingPage() {
    const [progress, setProgress] = useState(0)
    const [showWelcome, setShowWelcome] = useState(true)
    const [animationStage, setAnimationStage] = useState('running') // running, hugging, complete
    const navigate = useNavigate()

    useEffect(() => {
        // Animation stages timing
        setTimeout(() => setAnimationStage('hugging'), 1500) // Start hugging after 1.5s
        setTimeout(() => setAnimationStage('complete'), 3000) // Complete after 3s

        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setTimeout(() => {
                        setShowWelcome(false)
                        // Navigate to home page after animation completes
                        navigate('/home')
                    }, 1000)
                    return 100
                }
                return prev + 2
            })
        }, 50)

        return () => clearInterval(interval)
    }, [navigate])

    if (!showWelcome) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-hidden bg-black">
            <div className="relative w-full text-center">
                {/* Animated glow background */}
                <div className="absolute inset-0 -m-20 rounded-full opacity-30 bg-emerald-500/20 blur-3xl animate-pulse" />

                {/* Welcome text */}
                <div className="space-y-4 animate-fade-in">
                    <div className="text-sm tracking-widest uppercase text-accent animate-pulse">
                        // {animationStage === 'running' ? 'Coming to meet you' : animationStage === 'hugging' ? 'Welcome!' : 'Let\'s get started'}
                    </div>
                    <h1 className="text-4xl font-bold md:text-6xl font-display bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
                        {animationStage === 'running' ? 'Hello There!' : animationStage === 'hugging' ? 'Great to See You!' : 'Welcome to My Portfolio!'}
                    </h1>
                    <p className="max-w-md mx-auto text-lg text-white/70 animate-fade-in-delay">
                        {animationStage === 'running' ? 'Running to greet you...' : animationStage === 'hugging' ? 'Sending you a warm hug! 🤗' : 'Let\'s explore amazing projects together!'}
                    </p>
                </div>

                {/* Progress bar */}
                <div className="max-w-xs mx-auto mt-12 space-y-2">
                    <div className="w-full h-2 overflow-hidden rounded-full bg-white/10">
                        <div 
                            className="h-full transition-all duration-300 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="text-sm text-emerald-400">
                        {progress}%
                    </div>
                </div>

                {/* Loading dots */}
                <div className="flex justify-center gap-2 mt-6">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes run-forward {
                    0% { transform: translateX(-200vw) scale(0.3); }
                    100% { transform: translateX(0) scale(1); }
                }
                
                @keyframes bob {
                    0%, 100% { transform: translateX(-50%) translateY(0); }
                    50% { transform: translateX(-50%) translateY(-8px); }
                }
                
                @keyframes arm-swing-left {
                    0%, 100% { transform: rotate(-45deg); }
                    50% { transform: rotate(45deg); }
                }
                
                @keyframes arm-swing-right {
                    0%, 100% { transform: rotate(45deg); }
                    50% { transform: rotate(-45deg); }
                }
                
                @keyframes leg-left {
                    0%, 100% { transform: translateX(-8px) rotate(-20deg); }
                    50% { transform: translateX(-8px) rotate(20deg); }
                }
                
                @keyframes leg-right {
                    0%, 100% { transform: translateX(4px) rotate(20deg); }
                    50% { transform: translateX(4px) rotate(-20deg); }
                }
                
                @keyframes foot-left {
                    0%, 100% { transform: translateX(-10px) translateY(0); }
                    50% { transform: translateX(-10px) translateY(-4px); }
                }
                
                @keyframes foot-right {
                    0%, 100% { transform: translateX(4px) translateY(-4px); }
                    50% { transform: translateX(4px) translateY(0); }
                }
                
                @keyframes hug-arm-left {
                    0% { transform: rotate(-45deg); }
                    100% { transform: rotate(-120deg); }
                }
                
                @keyframes hug-arm-right {
                    0% { transform: rotate(45deg); }
                    100% { transform: rotate(120deg); }
                }
                
                @keyframes hug-user {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
                
                @keyframes heart-float-1 {
                    0% { transform: translate(-20px, 0) scale(0); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translate(-40px, -60px) scale(1); opacity: 0; }
                }
                
                @keyframes heart-float-2 {
                    0% { transform: translate(0, 0) scale(0); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translate(10px, -80px) scale(1); opacity: 0; }
                }
                
                @keyframes heart-float-3 {
                    0% { transform: translate(20px, 0) scale(0); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translate(50px, -70px) scale(1); opacity: 0; }
                }
                
                @keyframes blink {
                    0%, 90%, 100% { transform: scaleY(1); }
                    95% { transform: scaleY(0.1); }
                }
                
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-run-forward {
                    animation: run-forward 1.5s ease-out forwards;
                }
                
                .animate-bob {
                    animation: bob 0.4s ease-in-out infinite;
                }
                
                .animate-arm-swing-left {
                    animation: arm-swing-left 0.4s ease-in-out infinite;
                }
                
                .animate-arm-swing-right {
                    animation: arm-swing-right 0.4s ease-in-out infinite;
                }
                
                .animate-leg-left {
                    animation: leg-left 0.4s ease-in-out infinite;
                }
                
                .animate-leg-right {
                    animation: leg-right 0.4s ease-in-out infinite;
                }
                
                .animate-foot-left {
                    animation: foot-left 0.4s ease-in-out infinite;
                }
                
                .animate-foot-right {
                    animation: foot-right 0.4s ease-in-out infinite;
                }
                
                .animate-hug-arm-left {
                    animation: hug-arm-left 0.6s ease-out forwards;
                }
                
                .animate-hug-arm-right {
                    animation: hug-arm-right 0.6s ease-out forwards;
                }
                
                .animate-hug-user {
                    animation: hug-user 1s ease-in-out infinite;
                }
                
                .animate-heart-float-1 {
                    animation: heart-float-1 2s ease-out infinite;
                }
                
                .animate-heart-float-2 {
                    animation: heart-float-2 2.5s ease-out infinite;
                    animation-delay: 0.3s;
                }
                
                .animate-heart-float-3 {
                    animation: heart-float-3 2.2s ease-out infinite;
                    animation-delay: 0.6s;
                }
                
                .animate-blink {
                    animation: blink 3s ease-in-out infinite;
                }
                
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out;
                }
                
                .animate-fade-in-delay {
                    animation: fade-in 0.8s ease-out 0.3s backwards;
                }
            `}</style>
        </div>
    )
}