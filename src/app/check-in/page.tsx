'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function CheckInPage() {
    const [rating, setRating] = useState<number | null>(null)
    const [step, setStep] = useState(1) // 1: Before, 2: After
    const router = useRouter()

    const handleFinish = () => {
        // Aquí se guardaría en el backend/localStorage
        router.push('/profile')
    }

    return (
        <main className="min-h-screen bg-[#050505] text-white flex flex-col p-8">
            <nav className="mb-12">
                <Link href="/player">
                    <ChevronLeft size={24} className="text-gray-500" />
                </Link>
            </nav>

            <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={step}
                    className="text-center"
                >
                    <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Evaluación de calma</span>
                    <h1 className="text-3xl font-light mb-12 leading-tight">
                        {step === 1 ? '¿Cómo entras en tu momento de calma?' : '¿Cómo se siente tu mente ahora?'}
                    </h1>

                    <div className="flex justify-between items-end gap-2 px-4 h-32 mb-16">
                        {[1, 2, 3, 4, 5].map((val) => (
                            <button
                                key={val}
                                onClick={() => setRating(val)}
                                className="flex-1 flex flex-col items-center gap-4 group"
                            >
                                <motion.div
                                    animate={{
                                        height: val * 15 + 10,
                                        opacity: rating === val ? 1 : 0.2,
                                        backgroundColor: rating === val ? '#c5a059' : '#fff'
                                    }}
                                    className="w-full rounded-t-lg transition-all"
                                />
                                <span className={`text-xs font-medium ${rating === val ? 'text-accent' : 'text-gray-600'}`}>
                                    {val}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-between text-[10px] text-gray-500 uppercase tracking-widest px-4 mb-20">
                        <span>Inquieto</span>
                        <span>En paz</span>
                    </div>

                    <button
                        disabled={rating === null}
                        onClick={step === 1 ? () => { setStep(2); setRating(null); } : handleFinish}
                        className={`w-full py-5 rounded-3xl flex items-center justify-center gap-3 transition-all ${rating !== null ? 'bg-white text-black' : 'bg-white/5 text-gray-700 pointer-events-none'}`}
                    >
                        {step === 1 ? 'Continuar' : 'Guardar sesión'}
                        <ArrowRight size={18} />
                    </button>
                </motion.div>
            </div>

            <div className="py-8 text-center text-xs text-gray-700 font-light">
                Calmly • No es medición médica, es tu ritual
            </div>
        </main>
    )
}
