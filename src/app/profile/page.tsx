'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, Crown, Award, Clock, Calendar, ShieldCheck, Heart, Sparkles, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { useApp } from '@/context/AppContext'

export default function ProfilePage() {
    const {
        isPremium, setIsPremium, streak, minutesTotal, sessions,
        xp, level, levelProgress, challenges
    } = useApp()

    const stats = [
        { label: 'Racha actual', value: `${streak} días`, icon: <Calendar size={16} /> },
        { label: 'Minutos total', value: `${Math.round(minutesTotal)} min`, icon: <Clock size={16} /> },
        { label: 'Sesiones', value: sessions.length.toString(), icon: <Award size={16} /> },
    ]

    return (
        <main className="min-h-screen bg-black text-white p-8 flex flex-col select-none">
            <nav className="mb-8 flex justify-between items-center bg-black/50 backdrop-blur-lg -mx-8 px-8 py-4 sticky top-0 z-50">
                <Link href="/player">
                    <div className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-white transition-colors">
                        <ChevronLeft size={24} />
                    </div>
                </Link>
                <h1 className="text-[10px] font-bold tracking-[0.4em] uppercase text-gray-500">Mi Perfil</h1>
                <div className="w-10" />
            </nav>

            {/* User Header & Levels */}
            <div className="flex flex-col items-center mb-8 mt-4">
                <div className="relative mb-6">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-x-[-12px] inset-y-[-12px] border border-dashed border-accent/20 rounded-full"
                    />
                    <div className="w-24 h-24 rounded-full bg-accent/5 border border-accent/20 flex items-center justify-center text-accent text-3xl font-light overflow-hidden">
                        GC
                    </div>
                </div>
                <h2 className="text-3xl font-light tracking-tight">Gerardo C.</h2>
                <div className="flex items-center gap-3 mt-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-soft px-3 py-1 bg-accent/5 rounded-lg border border-accent/10">
                        Nivel • {level}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg ${isPremium ? 'bg-accent/20 text-accent border border-accent/30' : 'bg-white/5 text-gray-500'}`}>
                        {isPremium ? 'Premium' : 'Free User'}
                    </span>
                </div>

                {/* Level Progress Bar */}
                <div className="w-full max-w-[280px] mt-8 bg-white/5 h-1.5 rounded-full overflow-hidden relative">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${levelProgress}%` }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent/50 to-accent rounded-full"
                    />
                </div>
                <div className="flex justify-between w-full max-w-[280px] mt-2 opacity-30">
                    <span className="text-[8px] font-black uppercase tracking-wider">{xp} XP</span>
                    <span className="text-[8px] font-black uppercase tracking-wider">Próximo Nivel</span>
                </div>
            </div>

            {/* Stats List (Matching Image Reference) */}
            <div className="flex flex-col mb-16 -mx-8">
                {stats.map((stat, i) => (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        key={stat.label}
                        className="py-16 border-b border-white/5 flex flex-col items-center text-center first:border-t"
                    >
                        <span className="text-[6rem] font-light leading-none tracking-tighter mb-4 text-white">
                            {stat.value.split(' ')[0]}
                        </span>
                        <span className="text-[11px] text-gray-700 uppercase tracking-[0.5em] font-black">
                            {stat.label}
                        </span>
                    </motion.div>
                ))}
            </div>

            {/* Daily Challenges */}
            <div className="mb-12">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-700 ml-4 mb-4 block">Retos Diarios</span>
                <div className="space-y-3">
                    {challenges.map((challenge, i) => (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + (i * 0.1) }}
                            key={challenge.id}
                            className={`flex items-center gap-4 p-5 rounded-3xl border ${challenge.completed ? 'bg-accent/5 border-accent/20' : 'bg-white/[0.03] border-white/5'}`}
                        >
                            <div className={challenge.completed ? 'text-accent' : 'text-gray-800'}>
                                {challenge.completed ? <CheckCircle2 size={20} /> : <Sparkles size={20} />}
                            </div>
                            <div className="flex-1">
                                <p className={`text-sm font-medium ${challenge.completed ? 'text-gray-400 line-through' : 'text-gray-300'}`}>{challenge.text}</p>
                                <span className="text-[9px] font-bold text-accent uppercase tracking-wider">+{challenge.xpReward} XP</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Premium CTA */}
            {!isPremium && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="relative overflow-hidden rounded-[40px] p-8 bg-gradient-to-br from-[#1a1a1a] to-black border border-accent/20"
                >
                    <div className="relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 text-accent mb-6 px-4 py-1 rounded-full bg-accent/10">
                            <Crown size={14} />
                            <span className="text-[9px] font-bold tracking-[0.2em] uppercase">Membresía Vitalicia</span>
                        </div>
                        <h3 className="text-2xl font-medium mb-3 tracking-tight">Acceso Total</h3>
                        <p className="text-sm text-gray-500 mb-8 leading-relaxed mx-auto max-w-[240px]">
                            Loops exclusivos de alta resolución y retos ilimitados.
                        </p>
                        <button
                            onClick={() => setIsPremium(true)}
                            className="w-full py-5 rounded-3xl bg-accent text-black font-bold text-sm transition-all active:scale-95 shadow-2xl shadow-accent/20 uppercase tracking-widest"
                        >
                            Pasar a Premium • 3,99€
                        </button>
                    </div>
                    {/* Decorative Gfx */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 blur-[60px]" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/5 blur-[40px]" />
                </motion.div>
            )}

            {/* Settings List */}
            <div className="mt-12 space-y-3 pb-12">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-700 ml-4 mb-2 block">Ajustes</span>
                <div className="flex items-center justify-between p-6 bg-white/[0.03] rounded-3xl border border-white/5 group active:bg-white/5 transition-all">
                    <div className="flex items-center gap-4 text-gray-400 group-active:text-white">
                        <Heart size={20} />
                        <span className="text-sm font-medium">Favoritos</span>
                    </div>
                    <ChevronLeft size={18} className="text-gray-800 rotate-180" />
                </div>
                <div className="flex items-center justify-between p-6 bg-white/[0.03] rounded-3xl border border-white/5 group active:bg-white/5 transition-all">
                    <div className="flex items-center gap-4 text-gray-400 group-active:text-white">
                        <ShieldCheck size={20} />
                        <span className="text-sm font-medium">Privacidad</span>
                    </div>
                    <ChevronLeft size={18} className="text-gray-800 rotate-180" />
                </div>
            </div>

            <div className="mt-auto py-8 text-center">
                <button className="text-[10px] text-gray-800 font-black uppercase tracking-[0.4em] hover:text-white transition-colors">Cerrar sesión</button>
            </div>
        </main>
    )
}
