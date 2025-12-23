'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, Crown, Award, Clock, Calendar, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
    const stats = [
        { label: 'Racha actual', value: '5 días', icon: <Calendar size={16} /> },
        { label: 'Minutos totales', value: '120 min', icon: <Clock size={16} /> },
        { label: 'Sesiones', value: '12', icon: <Award size={16} /> },
    ]

    return (
        <main className="min-h-screen bg-black text-white p-8">
            <nav className="mb-8 flex justify-between items-center">
                <Link href="/player">
                    <ChevronLeft size={24} className="text-gray-500 hover:text-white" />
                </Link>
                <h1 className="text-sm font-light tracking-[0.2em] uppercase text-gray-500">Mi Perfil</h1>
                <div className="w-6" />
            </nav>

            {/* User Header */}
            <div className="flex flex-col items-center mb-12">
                <div className="w-20 h-20 rounded-full bg-accent-soft border border-accent/20 flex items-center justify-center text-accent text-2xl font-light mb-4">
                    GC
                </div>
                <h2 className="text-2xl font-light">Gerardo C.</h2>
                <span className="text-xs text-gray-500 mt-1">Usuario Free</span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-12">
                {stats.map((stat, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={stat.label}
                        className="glass-card p-4 flex flex-col items-center text-center"
                    >
                        <div className="text-accent mb-2 opacity-50">{stat.icon}</div>
                        <span className="text-lg font-medium">{stat.value}</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-tighter mt-1">{stat.label}</span>
                    </motion.div>
                ))}
            </div>

            {/* Premium CTA */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="relative overflow-hidden rounded-[32px] p-8 border border-accent/30 bg-gradient-to-br from-accent/10 to-transparent"
            >
                <div className="relative z-10">
                    <div className="flex items-center gap-2 text-accent mb-4">
                        <Crown size={20} />
                        <span className="text-xs font-bold tracking-widest uppercase">Calmly Premium</span>
                    </div>
                    <h3 className="text-2xl font-medium mb-2">Desbloquea calma ilimitada</h3>
                    <p className="text-sm text-gray-400 mb-8 leading-relaxed max-w-[200px]">
                        Sin anuncios, loops infinitos premium y modos avanzados por solo 3,99€/mes.
                    </p>
                    <button className="w-full py-4 rounded-2xl bg-accent text-black font-semibold text-sm hover:opacity-90 transition-all active:scale-95">
                        Probar 7 días gratis
                    </button>
                </div>
                {/* Decorative Glow */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent/20 blur-[60px]" />
            </motion.div>

            {/* Settings List */}
            <div className="mt-12 space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <ShieldCheck size={18} className="text-gray-500" />
                        <span className="text-sm">Privacidad y Datos</span>
                    </div>
                    <ChevronLeft size={16} className="text-gray-700 rotate-180" />
                </div>
            </div>

            <div className="mt-auto pt-12 text-center">
                <button className="text-xs text-gray-700 hover:text-white transition-colors">Cerrar sesión</button>
            </div>
        </main>
    )
}
