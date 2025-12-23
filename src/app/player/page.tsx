'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, Moon, Sun, Timer, X, ChevronUp, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

type Mode = 'Dormir' | 'Relajar' | 'Concentración'

export default function PlayerPage() {
    const [mode, setMode] = useState<Mode>('Relajar')
    const [isScreenOff, setIsScreenOff] = useState(false)
    const [showControls, setShowControls] = useState(true)
    const [timeLeft, setTimeLeft] = useState<number | null>(null)
    const [isFinished, setIsFinished] = useState(false)

    // Simulation of timer
    useEffect(() => {
        if (timeLeft === null || timeLeft <= 0) {
            if (timeLeft === 0) setIsFinished(true)
            return
        }
        const timer = setInterval(() => setTimeLeft(prev => prev! - 1), 1000)
        return () => clearInterval(timer)
    }, [timeLeft])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`
    }

    return (
        <main className="relative min-h-screen bg-black overflow-hidden flex flex-col">
            {/* Seamless Video Loop Simulation */}
            <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isScreenOff ? 'opacity-0' : 'opacity-100'}`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
                {/* Hypnotic Background Layer */}
                <div className="w-full h-full flex items-center justify-center opacity-30">
                    <motion.div
                        animate={{
                            rotate: [0, 360],
                            scale: mode === 'Dormir' ? [1, 1.2, 1] : [1, 1.05, 1],
                            borderRadius: ["40%", "50%", "40%"]
                        }}
                        transition={{ duration: mode === 'Dormir' ? 20 : mode === 'Relajar' ? 10 : 5, repeat: Infinity, ease: "linear" }}
                        className="w-[150vw] h-[150vw] bg-accent/10 blur-[80px]"
                    />
                </div>
            </div>

            {/* Screen Off Overlay */}
            <AnimatePresence>
                {isScreenOff && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsScreenOff(false)}
                        className="absolute inset-0 z-[100] bg-black cursor-pointer flex flex-col items-center justify-center"
                    >
                        <p className="text-gray-800 text-sm tracking-widest uppercase">Modo pantalla apagada</p>
                        <p className="text-gray-900 text-xs mt-2">Toca para volver</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Top Header */}
            <nav className="relative z-50 p-6 flex justify-between items-center">
                <Link href="/">
                    <X className="text-gray-500 hover:text-white transition-colors" />
                </Link>
                <div className="flex flex-col items-center">
                    <span className="text-xs tracking-widest uppercase text-gray-500 font-medium">Modo actual</span>
                    <span className="text-sm font-semibold text-accent">{mode}</span>
                </div>
                <Link href="/profile">
                    <div className="w-8 h-8 rounded-full border border-gray-800 flex items-center justify-center text-xs text-gray-500">
                        GC
                    </div>
                </Link>
            </nav>

            {/* Main Visualizer / Center */}
            <div className="flex-1 flex items-center justify-center relative z-10 px-12 text-center" onClick={() => setShowControls(!showControls)}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center"
                >
                    {timeLeft !== null && !isFinished && (
                        <div className="text-6xl font-light mb-4 text-white/50">{formatTime(timeLeft)}</div>
                    )}
                    {isFinished && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                            <CheckCircle2 size={48} className="text-accent mb-4" />
                            <p className="text-xl font-light">Calma completada</p>
                            <Link href="/check-in" className="mt-6 text-accent underline underline-offset-8">Evaluar mi calma</Link>
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* Bottom Controls Panel */}
            <AnimatePresence>
                {showControls && !isFinished && (
                    <motion.div
                        initial={{ y: 200, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 200, opacity: 0 }}
                        className="relative z-50 p-8 pb-12 glass-card mx-4 mb-4"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <button onClick={() => setIsScreenOff(true)} className="flex flex-col items-center gap-1">
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400">
                                    <Moon size={20} />
                                </div>
                                <span className="text-[10px] uppercase tracking-tighter text-gray-500">Apagar</span>
                            </button>

                            <div className="flex-1 px-8">
                                <div className="flex items-center gap-4 text-gray-400">
                                    <Volume2 size={18} />
                                    <div className="h-[2px] flex-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full w-2/3 bg-white/40" />
                                    </div>
                                </div>
                            </div>

                            <button onClick={() => setTimeLeft(1200)} className="flex flex-col items-center gap-1">
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400">
                                    <Timer size={20} />
                                </div>
                                <span className="text-[10px] uppercase tracking-tighter text-gray-500">20 min</span>
                            </button>
                        </div>

                        <div className="flex justify-center gap-4">
                            {(['Dormir', 'Relajar', 'Concentración'] as Mode[]).map((m) => (
                                <button
                                    key={m}
                                    onClick={() => setMode(m)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${mode === m ? 'bg-accent text-black' : 'text-gray-400 hover:text-white bg-white/5'}`}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-20 text-[10px] tracking-widest uppercase pointer-events-none">
                Calmly Loop System v1
            </div>
        </main>
    )
}
