# Implementation Plan: Calmly - The ASMR Ritual App

## 1. Vision & Strategy (The "Team")

- **Senior Full-Stack Developer**: Light React/Next.js architecture with optimized video loops and PWA support. Focus on zero-latency transitions and "Dark Mode First" performance.
- **UX/UI Designer**: Minimalist interface. Typography-driven. Smooth animations using Framer Motion. One-hand usability (bottom navigation/controls).
- **Product Manager**: Freemium model (3-5€/mo). Strategic CTAs. No medical jargon. Gamification via "Streaks" rather than medical stats.
- **Growth Marketer**: TikTok-first landing page. Viral loop hooks. Copy focused on immediate relief ("¿Te relajó este video?").

## 2. Design System
- **Background**: `#050505` (True Black for OLED/Amos screens).
- **Primary Text**: Soft White (`#F5F5F5`).
- **Accent**: Muted Gold (`#C5A059`) for Premium features.
- **Typography**: `Outfit` (Headings) & `Inter` (UI). Large 1.5rem+ base size.

## 3. App Architecture (Next.js App Router)
- `/`: Landing (TikTok traffic). High-impact visual, clear "Start" button.
- `/play`: The Machine. Infinite ASMR loops, volume wheel, screen-off mode.
- `/modes`: Sleep (Soft), Relax (Medium), Focus (Steady).
- `/check-in`: Pre & Post session 1-5 scale.
- `/profile`: Streak, Minutes of Calm, Premium Toggle.

## 4. Technical Features
- **Loop Engine**: Handled via `<video>` with `onEnded` seamless transition or `loop` attribute for textures.
- **Screen-Off Mode**: CSS overlay (pure black) that keeps audio playing.
- **PWA**: `manifest.json` and service workers for "Add to Home Screen".
- **Subscription**: Stripe Checkout integration.

## 5. Roadmap (30 Days)
- **Week 1**: Core Loop Player & Basic UI.
- **Week 2**: Modes (Dormir, Relajar, Concentración) & Flow transition.
- **Week 3**: Profile, Streaks & Manual Evaluation.
- **Week 4**: Stripe, PWA, TikTok Landing & Polish.
