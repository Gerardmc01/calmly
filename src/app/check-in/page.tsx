'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useApp } from '@/context/AppContext'

export default function CheckInPage() {
    const { sessions } = useApp()
    const [rating, setRating] = useState<number | null>(null)
    const [step, setStep] = useState(1) // 1: Before, 2: After
    const router = useRouter()

    const handleFinish = () => {
        // En una implementación real, actualizaríamos la última sesión en el context
        // Por ahora, simplemente navegamos al perfil ya que la sesión básica se guardó al terminar el timer
        router.push('/profile')
    }

    return (
        <main className="min-h-screen bg-[#050505] text-white flex flex-col p-8 select-none">
            <nav className="mb-8">
                <Link href="/player">
                    <div className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-white transition-colors">
                        <ChevronLeft size={24} />
                    </div>
                </Link>
            </nav>

            <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={step}
                    className="text-center"
                >
                    <div className="flex justify-center mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-accent-soft flex items-center justify-center text-accent">
                            <Sparkles size={20} />
                        </div>
                    </div>
                    <span className="text-accent text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">Evaluación de calma</span>
                    <h1 className="text-3xl font-light mb-12 leading-tight tracking-tight px-4">
                        {step === 1 ? '¿Cómo entras en tu momento de calma?' : '¿Cómo se siente tu mente ahora?'}
                    </h1>

                    <div className="flex justify-between items-end gap-3 px-2 h-32 mb-16">
                        {[1, 2, 3, 4, 5].map((val) => (
                            <button
                                key={val}
                                onClick={() => setRating(val)}
                                className="flex-1 flex flex-col items-center gap-4 group"
                            >
                                <motion.div
                                    animate={{
                                        height: val * 18 + 12,
                                        backgroundColor: rating === val ? '#c5a059' : 'rgba(255,255,255,0.05)',
                                        boxShadow: rating === val ? '0 0 20px rgba(197,160,89,0.3)' : 'none'
                                    }}
                                    className="w-full rounded-2xl transition-all"
                                />
                                <span className={`text-[10px] font-bold tracking-widest ${rating === val ? 'text-accent' : 'text-gray-700'}`}>
                                    {val}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-between text-[9px] text-gray-600 uppercase tracking-[0.2em] px-2 mb-20 font-bold">
                        <span>Inquieto</span>
                        <span>En paz</span>
                    </div>

                    <button
                        disabled={rating === null}
                        onClick={step === 1 ? () => { setStep(2); setRating(null); } : handleFinish}
                        className={`w-full py-5 rounded-[24px] flex items-center justify-center gap-3 transition-all font-bold text-sm tracking-widest uppercase ${rating !== null ? 'bg-white text-black shadow-xl' : 'bg-white/5 text-gray-700 pointer-events-none'}`}
                    >
                        {step === 1 ? 'Continuar' : 'Guardar sesión'}
                        <ArrowRight size={16} />
                    </button>
                </motion.div>
            </div>

            <div className="py-8 text-center text-[10px] text-gray-800 font-bold tracking-[0.3em] uppercase">
                Calmly • Tu Ritual Nocturno
            </div>
        </main>
    )
}
