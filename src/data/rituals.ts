export type RitualMode = 'Dormir' | 'Relajar' | 'Enfoque';

export interface RitualTrack {
    id: string; // YouTube Video ID
    name: string;
}

export const RITUAL_DATA: Record<RitualMode, RitualTrack[]> = {
    'Dormir': [
        { id: 'n_L78_1H-P8', name: 'Lluvia Suave en Ventana (10h)' },
        { id: 'MkyKIVzYq7E', name: 'Ruido Marrón Profundo (12h)' },
        { id: 'eKFTSSKCzWA', name: 'Cabina de Nave Espacial (10h)' },
        { id: 'nMfPqeZjc2c', name: 'Noche en la Jungla (10h)' },
        { id: '00X4D_2WJ58', name: 'Ruido Blanco Puro TV (12h)' },
        { id: 'c9pQYOGIWM8', name: 'Tormenta Distante (10h)' },
        { id: 'L_LUpnjgPso', name: 'Chimenea Crepitante 4K (8h)' },
        { id: 'nepQI-d8Uq4', name: 'Ondas Delta Sueño Profundo (10h)' },
        { id: 'xQ6xgDI7Whc', name: 'Universo Profundo 432Hz (10h)' },
        { id: '9HuqL7U7rV0', name: 'Viento Ártico Suave (10h)' },
        { id: '2OEL4P1Rz04', name: 'Lluvia sobre Tienda Camping (10h)' },
        { id: 'h71qWl_bJNY', name: 'Sonido de Ventilador (10h)' }
    ],
    'Relajar': [
        { id: '1u77vAt32yY', name: 'Zen Profundo Infinito (10h)' },
        { id: 'fE0Xv_87mXo', name: 'Paz Interior & Cuencos (12h)' },
        { id: 'lFzVJEkscDY', name: 'Meditación Trascendental (8h)' },
        { id: 'L_XJ_s5IsQc', name: 'Acuario de Arrecife 4K (12h)' },
        { id: 'ysz5S6PUM-U', name: 'Spa de Lujo Ambiente (8h)' },
        { id: 'gnLuL_r3V8g', name: 'Piano Suave & Lluvia (10h)' },
        { id: 'tNkZsRW7h2c', name: 'Odisea Espacial Chillout (12h)' },
        { id: 'V1rpK38pCvw', name: 'Jardín Japonés de Agua (10h)' },
        { id: 'K3QG-lV8fsg', name: 'Frecuencia de Sanación 528Hz (9h)' },
        { id: 'q76bMs-NwRk', name: 'Atardecer en la Playa (10h)' },
        { id: '77ZozIWOswk', name: 'Flauta Nativa Americana (8h)' }
    ],
    'Enfoque': [
        { id: 'jfKfPfyJRdk', name: 'Lofi Girl Radio (24/7)' },
        { id: 'WPni755-Krg', name: 'Ondas Alpha Estudio (10h)' },
        { id: '5qap5aO4i9A', name: 'Lofi Santuario (24/7)' },
        { id: '4xDzrJKXOOY', name: 'Synthwave para Programar (10h)' },
        { id: 'VpS-o93dF_A', name: 'Deep Focus Brainwaves (8h)' },
        { id: 'mIYzp5rcTvU', name: 'Música Clásica Dark Academia (4h)' },
        { id: 'Ptk_1Dc2iPY', name: 'Hans Zimmer Soundtracks (3h)' },
        { id: '0GKd5K3BwN4', name: 'Binaural Focus 40Hz (10h)' },
        { id: 'TURbeWK2wwg', name: 'Cyberpunk Ambient (10h)' },
        { id: '9FvvbVI5rYA', name: 'Deep House Study (10h)' },
        { id: 'bm_pG52n53A', name: 'Cafetería Jazz Ambiente (8h)' }
    ]
};
