'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, Moon, Timer, X, CheckCircle2, Play, Pause, SkipForward, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useApp } from '@/context/AppContext'

// Define types for strictly indexed objects
type Mode = 'Dormir' | 'Relajar' | 'Enfoque'

interface Track {
    id: string
    name: string
}

const RITUAL_PLAYLISTS: Record<Mode, Track[]> = {
    'Relajar': [
        { id: '1u77vAt32yY', name: 'Zen Profundo Infinito (10h)' },
        { id: 'fE0Xv_87mXo', name: 'Paz Interior & Cuencos (12h)' },
        { id: 'lFzVJEkscDY', name: 'Meditación Trascendental (8h)' },
    ],
    'Dormir': [
        { id: 'n_L78_1H-P8', name: 'Lluvia en Ventana (10h)' },
        { id: 'nMfPqeZjc2c', name: 'Noche en la Jungla (10h)' },
        { id: '00X4D_2WJ58', name: 'Ruido Blanco Puro (12h)' },
    ],
    'Enfoque': [
        { id: 'WPni755-Krg', name: 'Ondas Alpha para Estudiar (10h)' },
        { id: '5qap5aO4i9A', name: 'Lofi Santuario Radio (24/7)' },
        { id: 'VpS-o93dF_A', name: 'Deep Focus Brainwaves (8h)' },
    ]
}

declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
        YT: any;
    }
}

export default function PlayerPage() {
    const { addSession, level, xp } = useApp()
    const [mode, setMode] = useState<Mode>('Relajar')
    const [isScreenOff, setIsScreenOff] = useState(false)
    const [showControls, setShowControls] = useState(true)
    const [timeLeft, setTimeLeft] = useState<number | null>(null)
    const [initialTime, setInitialTime] = useState<number>(1200)
    const [isFinished, setIsFinished] = useState(false)
    const [volume, setVolume] = useState(60)
    const [trackIndex, setTrackIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [apiReady, setApiReady] = useState(false)

    const playerRef = useRef<any>(null)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    // Load YouTube API
    useEffect(() => {
        const loadYT = () => {
            if (!window.YT) {
                const tag = document.createElement('script');
                tag.src = "https://www.youtube.com/iframe_api";
                const firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

                window.onYouTubeIframeAPIReady = () => {
                    initPlayer(RITUAL_PLAYLISTS[mode][trackIndex].id);
                };
            } else if (window.YT.Player) {
                initPlayer(RITUAL_PLAYLISTS[mode][trackIndex].id);
            }
        };

        loadYT();

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }
    }, [])

    const initPlayer = (videoId: string) => {
        if (playerRef.current) return;
        playerRef.current = new window.YT.Player('yt-player', {
            height: '1',
            width: '1',
            videoId: videoId,
            playerVars: { 'controls': 0, 'disablekb': 1, 'modestbranding': 1, 'rel': 0, 'loop': 1 },
            events: {
                'onReady': () => setApiReady(true),
                'onStateChange': (e: { data: number }) => {
                    if (e.data === window.YT.PlayerState.ENDED) nextRitual()
                }
            }
        });
    }

    const resetControlsTimeout = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setShowControls(true)
        if (isPlaying && !isFinished) {
            timeoutRef.current = setTimeout(() => setShowControls(false), 5000)
        }
    }

    useEffect(() => {
        if (playerRef.current && apiReady && typeof playerRef.current.setVolume === 'function') {
            playerRef.current.setVolume(volume);
        }
    }, [volume, apiReady])

    // Timer logic
    useEffect(() => {
        if (timeLeft === null || timeLeft <= 0 || !isPlaying) {
            if (timeLeft === 0 && !isFinished) handleFinish()
            return
        }
        const timer = setInterval(() => {
            const pState = playerRef.current?.getPlayerState?.()
            // 1 = playing, 3 = buffering
            if (pState === 1 || pState === 3) {
                setTimeLeft(prev => (prev !== null ? prev - 1 : null))
            }
        }, 1000)
        return () => clearInterval(timer)
    }, [timeLeft, isFinished, isPlaying, apiReady])

    const loadRitual = (m: Mode, idx: number) => {
        if (!playerRef.current || !apiReady) return
        const playlist = RITUAL_PLAYLISTS[m];
        if (!playlist || !playlist[idx]) return;

        const track = playlist[idx];
        playerRef.current.loadVideoById(track.id)
        playerRef.current.playVideo()
        setIsPlaying(true)
    }

    const startRitual = () => {
        setIsFinished(false)
        setTimeLeft(initialTime)
        setIsPlaying(true)
        loadRitual(mode, trackIndex)
        resetControlsTimeout()
    }

    const toggleRitual = () => {
        if (!playerRef.current || !apiReady) return
        const pState = playerRef.current.getPlayerState()
        if (pState === 1) {
            playerRef.current.pauseVideo()
            setIsPlaying(false)
        } else {
            playerRef.current.playVideo()
            setIsPlaying(true)
        }
        setShowControls(true)
    }

    const nextRitual = () => {
        const nextIdx = (trackIndex + 1) % RITUAL_PLAYLISTS[mode].length
        setTrackIndex(nextIdx)
        loadRitual(mode, nextIdx)
        setShowControls(true)
    }

    const changeMode = (m: Mode) => {
        setMode(m)
        setTrackIndex(0)
        if (isPlaying) {
            loadRitual(m, 0)
        }
    }

    const handleFinish = () => {
        setIsFinished(true)
        setIsPlaying(false)
        addSession({ duration: initialTime, mode, ratingBefore: null, ratingAfter: null })
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`
    }

    const getAuraColor = () => {
        if (mode === 'Dormir') return 'rgba(147, 112, 219, 0.15)'
        if (mode === 'Relajar') return 'rgba(212, 175, 55, 0.15)'
        return 'rgba(70, 130, 180, 0.15)'
    }

    return (
        <main className="relative h-screen w-screen bg-black overflow-hidden flex flex-col select-none"
            onClick={resetControlsTimeout}
            onMouseMove={resetControlsTimeout}
        >
            <div id="yt-player" className="absolute opacity-0 pointer-events-none" />

            {/* Visualizer Aura */}
            <div className={`absolute inset-0 z-0 transition-opacity duration-[2000ms] ${isScreenOff ? 'opacity-0' : 'opacity-100'}`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10" />
                <div className="w-full h-full flex items-center justify-center">
                    <motion.div
                        animate={{
                            scale: isPlaying ? [1, 1.1, 1] : 1,
                            opacity: isPlaying ? [0.2, 0.4, 0.2] : 0.1,
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="w-[120vw] h-[120vw] rounded-full blur-[120px]"
                        style={{ background: `radial-gradient(circle, ${getAuraColor()} 0%, transparent 70%)` }}
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
                        onClick={(e) => { e.stopPropagation(); setIsScreenOff(false); }}
                        className="absolute inset-0 z-[100] bg-black cursor-pointer flex flex-col items-center justify-center p-12 text-center"
                    >
                        <motion.div
                            animate={{ opacity: [0.1, 0.3, 0.1] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className="flex flex-col items-center"
                        >
                            <Moon size={32} className="text-gray-900 mb-4" />
                            <p className="text-gray-900 text-[10px] tracking-[0.4em] uppercase font-bold">Modo OLED Activo • Toca para volver</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Top Navigation */}
            <motion.nav
                animate={{ y: showControls ? 0 : -100, opacity: showControls ? 1 : 0 }}
                className="relative z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent"
            >
                <Link href="/">
                    <div className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-white transition-colors bg-white/5 rounded-2xl backdrop-blur-xl border border-white/5">
                        <X size={20} />
                    </div>
                </Link>
                <div className="flex flex-col items-center">
                    <span className="text-[9px] tracking-[0.4em] uppercase text-accent font-black mb-1">{level} • {xp} XP</span>
                    <span className="text-xs font-medium text-gray-400">{RITUAL_PLAYLISTS[mode][trackIndex].name}</span>
                </div>
                <Link href="/profile">
                    <div className="w-12 h-12 rounded-2xl border border-white/5 flex items-center justify-center bg-white/5 backdrop-blur-xl overflow-hidden">
                        <span className="text-[10px] font-black text-white/50 tracking-tighter">GC</span>
                    </div>
                </Link>
            </motion.nav>

            {/* Central Display */}
            <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-12 text-center">
                <AnimatePresence mode="wait">
                    {timeLeft !== null && !isFinished ? (
                        <motion.div
                            key="timer"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            className="flex flex-col items-center"
                        >
                            <div className="text-[8rem] font-extralight tracking-tighter text-white tabular-nums leading-none mb-6">
                                {formatTime(timeLeft)}
                            </div>
                            <div className="track-info text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 mb-10">
                                {RITUAL_PLAYLISTS[mode][trackIndex].name}
                            </div>
                            <div className="flex items-center gap-8">
                                <button onClick={toggleRitual} className="w-20 h-20 rounded-[28px] bg-white/5 border border-white/10 flex items-center justify-center text-white transition-transform active:scale-90">
                                    {isPlaying ? <Pause size={28} fill="white" /> : <Play size={28} fill="white" className="ml-1" />}
                                </button>
                                <button onClick={nextRitual} className="w-16 h-16 rounded-[22px] bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 transition-transform active:scale-90">
                                    <SkipForward size={20} />
                                </button>
                            </div>
                        </motion.div>
                    ) : isFinished ? (
                        <motion.div
                            key="finished"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center"
                        >
                            <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center text-accent mb-8">
                                <Sparkles size={40} />
                            </div>
                            <h2 className="text-4xl font-light mb-4 tracking-tighter">Calma Profunda</h2>
                            <p className="text-accent text-[11px] font-black uppercase tracking-[0.4em] mb-12">+{Math.round(initialTime / 12)} XP Conseguidos</p>
                            <Link href="/check-in" className="w-full max-w-[260px] py-6 bg-white text-black rounded-[32px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-white/10 transition-transform active:scale-95">
                                Guardar Ritual
                            </Link>
                            <button onClick={() => setTimeLeft(null)} className="mt-8 text-gray-800 text-[10px] font-black uppercase tracking-[0.4em] hover:text-white">
                                Volver
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={startRitual}
                                className="w-36 h-36 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-3xl flex items-center justify-center mb-10 relative group"
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="absolute inset-0 bg-accent rounded-full blur-2xl group-hover:opacity-50 transition-opacity"
                                />
                                <Play size={40} className="text-white relative z-10 fill-white ml-2" />
                            </motion.button>
                            <p className="text-gray-700 text-[10px] font-bold tracking-[0.5em] uppercase">Iniciar Ritual {formatTime(initialTime)}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Control Panel */}
            <AnimatePresence>
                {showControls && !isFinished && (
                    <motion.div
                        initial={{ y: 200, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 200, opacity: 0 }}
                        className="relative z-50 p-8 glass-card mx-6 mb-8 safe-area-bottom border border-white/5"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-10">
                            <button onClick={() => setIsScreenOff(true)} className="flex flex-col items-center gap-3 group">
                                <div className="w-14 h-14 rounded-2xl border border-white/5 flex items-center justify-center text-gray-500 group-active:scale-90 transition-all bg-white/5">
                                    <Moon size={20} />
                                </div>
                                <span className="text-[8px] font-black uppercase tracking-widest text-gray-700">OLED</span>
                            </button>

                            <div className="flex-1 px-10">
                                <div className="flex flex-col gap-4">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-600">Volumen Ritual</span>
                                        <Volume2 size={12} className="text-gray-600" />
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={volume}
                                        onChange={(e) => setVolume(parseInt(e.target.value))}
                                        className="relative w-full h-1 bg-white/5 rounded-full accent-accent appearance-none cursor-pointer"
                                    />
                                </div>
                            </div>

                            <button onClick={() => setInitialTime(initialTime === 1200 ? 2400 : initialTime === 2400 ? 600 : 1200)} className="flex flex-col items-center gap-3 group">
                                <div className="w-14 h-14 rounded-2xl border border-white/5 flex items-center justify-center text-accent group-active:scale-90 transition-all bg-accent/5">
                                    <Timer size={20} />
                                </div>
                                <span className="text-[8px] font-black uppercase tracking-widest text-gray-700">
                                    {formatTime(timeLeft || initialTime)}
                                </span>
                            </button>
                        </div>

                        <div className="flex justify-between gap-2 p-1 bg-white/5 rounded-[40px] border border-white/5 overflow-hidden">
                            {(['Dormir', 'Relajar', 'Enfoque'] as Mode[]).map((m) => (
                                <button
                                    key={m}
                                    onClick={() => changeMode(m)}
                                    className={`relative flex-1 py-5 rounded-[36px] text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${mode === m ? 'text-black z-10' : 'text-gray-600'}`}
                                >
                                    {mode === m && (
                                        <motion.div
                                            layoutId="activeMode"
                                            className="absolute inset-0 bg-white rounded-[36px] -z-10"
                                            transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                                        />
                                    )}
                                    {m}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-10 text-[8px] font-black tracking-[0.6em] uppercase pointer-events-none whitespace-nowrap">
                Ritual Engine • v2.0.1 • Infinite Playlists
            </div>
        </main>
    )
}
