'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function Home() {
    return (
        <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white px-6">
            {/* Background Video Mock/Overlay */}
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
                {/* En un entorno real, aquí iría el video ASMR en loop */}
                <div className="w-full h-full bg-[#111] flex items-center justify-center">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="w-96 h-96 bg-accent/20 rounded-full blur-[100px]"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-md text-center flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="text-5xl font-extralight tracking-tighter mb-4">
                        calm<span className="font-semibold">ly</span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-12 font-light leading-relaxed">
                        ¿Te relajó este video?<br />
                        Úsalo para dormir esta noche.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="w-full"
                >
                    <Link href="/player">
                        <button className="w-full py-5 px-8 rounded-full bg-white text-black text-xl font-medium shadow-2xl hover:bg-gray-200 transition-all active:scale-95">
                            Empezar a relajarme
                        </button>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="mt-12 flex items-center gap-2 text-sm text-accent opacity-80"
                >
                    <Sparkles size={16} />
                    <span>Ritual nocturno premium</span>
                </motion.div>
            </div>

            {/* Footer Branding */}
            <div className="absolute bottom-8 left-0 w-full text-center text-xs text-gray-600 tracking-widest uppercase">
                Diseñado para el descanso profundo
            </div>
        </main>
    )
}
