'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface Session {
    id: string
    date: string
    duration: number
    mode: string
    ratingBefore: number | null
    ratingAfter: number | null
}

export interface Challenge {
    id: string
    text: string
    completed: boolean
    xpReward: number
}

interface AppContextType {
    isPremium: boolean
    setIsPremium: (v: boolean) => void
    sessions: Session[]
    addSession: (s: Omit<Session, 'id' | 'date'>) => void
    streak: number
    minutesTotal: number
    xp: number
    level: string
    levelProgress: number // 0 to 100
    challenges: Challenge[]
    completeChallenge: (id: string) => void
    addXP: (amount: number) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [isPremium, setIsPremium] = useState(false)
    const [sessions, setSessions] = useState<Session[]>([])
    const [streak, setStreak] = useState(0)
    const [minutesTotal, setMinutesTotal] = useState(0)
    const [xp, setXp] = useState(0)
    const [challenges, setChallenges] = useState<Challenge[]>([
        { id: '1', text: '5 min de calma hoy', completed: false, xpReward: 50 },
        { id: '2', text: 'Usa el modo Dormir', completed: false, xpReward: 50 },
        { id: '3', text: 'Completa tu primer ritual', completed: false, xpReward: 100 },
    ])

    // Level Calculation Logic
    const getLevelInfo = (xpVal: number) => {
        if (xpVal < 200) return { name: 'Novato', nextLevelXp: 200, prevLevelXp: 0 }
        if (xpVal < 600) return { name: 'Iniciado', nextLevelXp: 600, prevLevelXp: 200 }
        if (xpVal < 1500) return { name: 'Buscador de Paz', nextLevelXp: 1500, prevLevelXp: 600 }
        if (xpVal < 3500) return { name: 'Maestro Zen', nextLevelXp: 3500, prevLevelXp: 1500 }
        return { name: 'Leyenda de la Calma', nextLevelXp: 10000, prevLevelXp: 3500 }
    }

    const { name: levelName, nextLevelXp, prevLevelXp } = getLevelInfo(xp)
    const levelProgress = Math.min(100, Math.max(0, ((xp - prevLevelXp) / (nextLevelXp - prevLevelXp)) * 100))

    // Load from localStorage (Client-only)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('calmly_data_v2')
            if (saved) {
                try {
                    const data = JSON.parse(saved)
                    if (data.sessions) setSessions(data.sessions)
                    if (data.isPremium !== undefined) setIsPremium(data.isPremium)
                    if (data.xp !== undefined) setXp(data.xp)
                    if (data.challenges) setChallenges(data.challenges)
                } catch (e) {
                    console.error("Error loading Calmly data", e)
                }
            }
        }
    }, [])

    // Save to localStorage & Calculate Stats
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('calmly_data_v2', JSON.stringify({ sessions, isPremium, xp, challenges }))
        }

        const total = sessions.reduce((acc: number, s: Session) => acc + (s.duration / 60), 0)
        setMinutesTotal(total)

        if (sessions.length > 0) {
            const dates = sessions.map(s => s.date.split('T')[0])
            const uniqueDates = Array.from(new Set(dates)).sort() as string[]

            let currentStreak = 1
            const today = new Date().toISOString().split('T')[0]
            const lastSessionDate = uniqueDates[uniqueDates.length - 1]

            const lastDate = new Date(lastSessionDate)
            const todayDate = new Date(today)
            const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24))

            if (diffDays <= 1) {
                for (let i = uniqueDates.length - 1; i > 0; i--) {
                    const d1 = new Date(uniqueDates[i] as string)
                    const d2 = new Date(uniqueDates[i - 1] as string)
                    const diff = Math.floor((d1.getTime() - d2.getTime()) / (1000 * 3600 * 24))
                    if (diff === 1) currentStreak++
                    else break
                }
                setStreak(currentStreak)
            } else {
                setStreak(0)
            }
        } else {
            setStreak(0)
        }
    }, [sessions, isPremium, xp, challenges])

    const addXP = (amount: number) => {
        setXp(prev => prev + amount)
    }

    const completeChallenge = (id: string) => {
        setChallenges(prev => prev.map((c: Challenge) => {
            if (c.id === id && !c.completed) {
                addXP(c.xpReward)
                return { ...c, completed: true }
            }
            return c
        }))
    }

    const addSession = (sessionData: Omit<Session, 'id' | 'date'>) => {
        const newSession: Session = {
            ...sessionData,
            id: Math.random().toString(36).substring(2, 11),
            date: new Date().toISOString()
        }
        setSessions((prev: Session[]) => [newSession, ...prev])

        // Auto XP for session: ~10 XP per minute + 20 flat
        const earnedXP = Math.round(sessionData.duration / 6) + 20
        addXP(earnedXP)

        // Check for specific mode challenges
        if (sessionData.mode === 'Dormir') {
            const dormiChallenge = challenges.find((c: Challenge) => c.id === '2')
            if (dormiChallenge && !dormiChallenge.completed) completeChallenge('2')
        }

        // General completed challenge
        const firstChallenge = challenges.find((c: Challenge) => c.id === '3')
        if (firstChallenge && !firstChallenge.completed) completeChallenge('3')

        if (sessionData.duration >= 300) { // 5 minutes
            const fiveMinChallenge = challenges.find((c: Challenge) => c.id === '1')
            if (fiveMinChallenge && !fiveMinChallenge.completed) completeChallenge('1')
        }
    }

    return (
        <AppContext.Provider value={{
            isPremium, setIsPremium, sessions, addSession, streak, minutesTotal,
            xp, level: levelName, levelProgress, challenges, completeChallenge, addXP
        }}>
            {children}
        </AppContext.Provider>
    )
}

export function useApp() {
    const context = useContext(AppContext)
    if (!context) throw new Error('useApp must be used within AppProvider')
    return context
}
