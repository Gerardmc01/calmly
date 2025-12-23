'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, Moon, Volume2, Shield } from 'lucide-react'

export default function Home() {
    return (
        <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white px-8 select-none">
            {/* Hypnotic Background Layout */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-10" />

                {/* Animated Background Orbs */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.15, 0.25, 0.15],
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/4 left-1/4 w-full h-full bg-accent/5 rounded-full blur-[120px]"
                    />
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.05, 0.1, 0.05],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        className="absolute bottom-1/4 right-1/4 w-[80%] h-[80%] bg-white/5 rounded-full blur-[100px]"
                    />
                </div>
            </div>

            {/* Content Container */}
            <div className="relative z-20 w-full max-w-sm flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.03] border border-white/5 mb-10 backdrop-blur-xl"
                    >
                        <Moon size={12} className="text-accent" />
                        <span className="text-[9px] font-black tracking-[0.3em] uppercase text-gray-400">Ritual IA de Calma</span>
                    </motion.div>

                    <h1 className="text-[5.5rem] font-light tracking-tighter mb-4 leading-none">
                        calm<span className="text-accent font-medium">ly</span>
                    </h1>
                    <p className="text-lg text-gray-500 font-light leading-relaxed max-w-[280px] mx-auto">
                        Tu espacio sagrado para <br />
                        <span className="text-white/80">desconectar y descansar.</span>
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="w-full flex flex-col gap-6"
                >
                    <Link href="/player" className="w-full px-4">
                        <button className="w-full py-6 rounded-[32px] bg-white text-black text-xs font-black shadow-2xl shadow-white/5 hover:scale-[1.02] transition-all active:scale-[0.97] uppercase tracking-[0.3em]">
                            Entrar en Calma
                        </button>
                    </Link>

                    <div className="flex justify-center gap-8 mt-4 opacity-30">
                        <div className="flex flex-col items-center gap-2">
                            <Volume2 size={16} />
                            <span className="text-[7px] uppercase font-black tracking-widest">Hi-Fi</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Shield size={16} />
                            <span className="text-[7px] uppercase font-black tracking-widest">Seguro</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Sparkles size={16} />
                            <span className="text-[7px] uppercase font-black tracking-widest">IA Loops</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Premium Badge */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12 left-0 w-full text-center px-10"
            >
                <div className="inline-block px-4 py-1.5 rounded-lg border border-white/5 bg-white/[0.02] mb-4">
                    <p className="text-[7px] text-accent font-black tracking-[0.5em] uppercase">
                        Premium Tranquility Engine v2.0
                    </p>
                </div>
                <p className="text-[9px] text-gray-700 font-medium leading-relaxed">
                    Experiencia nocturna sin distracciones, <br />
                    cuidadosamente diseñada para tu bienestar mental.
                </p>
            </motion.div>
        </main>
    )
}
