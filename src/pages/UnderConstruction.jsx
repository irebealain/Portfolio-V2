import React, { useEffect, useState } from 'react'

export default function LoadingPage({ onLoadComplete }) {
    const [progress, setProgress] = useState(0)
    const [showWelcome, setShowWelcome] = useState(true)
    const [animationStage, setAnimationStage] = useState('running') // running, hugging, complete

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
                        if (onLoadComplete) onLoadComplete()
                    }, 1000)
                    return 100
                }
                return prev + 2
            })
        }, 50)

        return () => clearInterval(interval)
    }, [onLoadComplete])

    if (!showWelcome) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-hidden bg-black">
            <div className="relative w-full text-center">
                {/* Animated glow background */}
                <div className="absolute inset-0 -m-20 rounded-full opacity-30 bg-emerald-500/20 blur-3xl animate-pulse" />
                
                {/* Running/Hugging Boy Character */}
                <div className="relative z-10 mb-8">
                    <div className={`inline-block ${animationStage === 'running' ? 'animate-run-forward' : ''} ${animationStage === 'hugging' ? 'animate-hug-user' : ''}`}>
                        <div className="relative w-40 h-48 mx-auto md:w-48 md:h-56">
                            {/* Character Body */}
                            <div className="absolute inset-0">
                                {/* Head */}
                                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full ${animationStage === 'running' ? 'animate-bob' : ''}`}>
                                    {/* Happy face */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {/* Eyes */}
                                        <div className="absolute flex gap-3 top-7">
                                            <div className={`w-2 h-3 bg-black rounded-full ${animationStage === 'running' ? 'animate-blink' : ''}`} />
                                            <div className={`w-2 h-3 bg-black rounded-full ${animationStage === 'running' ? 'animate-blink' : ''}`} />
                                        </div>
                                        {/* Big smile */}
                                        <div className="absolute w-8 h-4 border-b-2 border-black rounded-b-full top-12" />
                                        {/* Rosy cheeks */}
                                        <div className="absolute w-4 h-3 rounded-full opacity-40 bg-rose-400 left-2 top-10" />
                                        <div className="absolute w-4 h-3 rounded-full opacity-40 bg-rose-400 right-2 top-10" />
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="absolute w-16 h-20 transform -translate-x-1/2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl top-20 left-1/2 md:w-20 md:h-24">
                                    {/* Shirt detail */}
                                    <div className="absolute w-2 h-2 bg-white rounded-full top-2 left-1/2 -translate-x-1/2" />
                                </div>

                                {/* Arms - Different positions for running/hugging */}
                                {animationStage === 'running' ? (
                                    <>
                                        <div className="absolute w-4 h-16 origin-top transform bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full top-22 left-4 md:h-20 animate-arm-swing-left" />
                                        <div className="absolute w-4 h-16 origin-top transform bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full top-22 right-4 md:h-20 animate-arm-swing-right" />
                                    </>
                                ) : (
                                    <>
                                        <div className="absolute w-4 h-16 origin-top bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full top-22 left-2 md:h-20 animate-hug-arm-left" />
                                        <div className="absolute w-4 h-16 origin-top bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full top-22 right-2 md:h-20 animate-hug-arm-right" />
                                    </>
                                )}

                                {/* Legs */}
                                <div className={`absolute left-1/2 -translate-x-8 top-36 md:top-40 w-4 h-12 md:h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full ${animationStage === 'running' ? 'animate-leg-left' : ''}`} />
                                <div className={`absolute left-1/2 translate-x-4 top-36 md:top-40 w-4 h-12 md:h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full ${animationStage === 'running' ? 'animate-leg-right' : ''}`} />

                                {/* Shoes */}
                                <div className={`absolute left-1/2 -translate-x-10 bottom-0 w-6 h-3 bg-gray-800 rounded-full ${animationStage === 'running' ? 'animate-foot-left' : ''}`} />
                                <div className={`absolute left-1/2 translate-x-4 bottom-0 w-6 h-3 bg-gray-800 rounded-full ${animationStage === 'running' ? 'animate-foot-right' : ''}`} />
                            </div>

                            {/* Heart particles when hugging */}
                            {animationStage === 'hugging' && (
                                <>
                                    <div className="absolute text-2xl animate-heart-float-1">❤️</div>
                                    <div className="absolute text-xl animate-heart-float-2">💚</div>
                                    <div className="absolute text-lg animate-heart-float-3">💙</div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

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