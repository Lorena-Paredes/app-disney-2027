/**
 * Sistema de almacenamiento IndexedDB y utilidades de audio para Notas de Voz
 * Diseñado para persistir audios de forma local sin límites de cuota de localStorage.
 */

export interface VoiceNote {
  id: string;
  title: string;
  category: 'rides' | 'shopping' | 'uber' | 'hotel' | 'food' | 'general';
  dayNumber?: number; // 1 a 12
  authorName: string; // "Lorena", "Renato", "Celia", "Juan", "Carolina", "Fofi", etc.
  durationSeconds: number;
  createdAt: number;
  audioBlob?: Blob;
  audioUrl?: string; // Blob URL en tiempo de ejecución
  summaryText?: string;
  isFavorite?: boolean;
}

const DB_NAME = 'Orlando2027_VoiceNotes_DB';
const DB_VERSION = 1;
const STORE_NAME = 'voice_notes';

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB no soportado'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('createdAt', 'createdAt', { unique: false });
        store.createIndex('category', 'category', { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Genera un pequeño audio sintetizado WAV usando Web Audio API para notas demo
 */
function createSampleBeepAudioBlob(frequency: number = 440, durationMs: number = 2000): Blob {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) {
      return new Blob([], { type: 'audio/webm' });
    }
    const sampleRate = 22050;
    const numSamples = Math.floor(sampleRate * (durationMs / 1000));
    const buffer = new Float32Array(numSamples);

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      // Melodía suave que imita un mensaje de audio grabado
      const env = Math.sin((Math.PI * i) / numSamples);
      const noteFreq = frequency * (1 + 0.1 * Math.sin(2 * Math.PI * 3 * t));
      buffer[i] = Math.sin(2 * Math.PI * noteFreq * t) * 0.25 * env;
    }

    // Convert to 16-bit PCM WAV
    const wavHeader = new ArrayBuffer(44 + numSamples * 2);
    const view = new DataView(wavHeader);

    const writeString = (offset: number, str: string) => {
      for (let i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + numSamples * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM
    view.setUint16(22, 1, true); // Mono
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, numSamples * 2, true);

    let offset = 44;
    for (let i = 0; i < numSamples; i++) {
      const s = Math.max(-1, Math.min(1, buffer[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      offset += 2;
    }

    return new Blob([view], { type: 'audio/wav' });
  } catch (err) {
    console.warn('No se pudo sintetizar audio de prueba:', err);
    return new Blob([], { type: 'audio/webm' });
  }
}

const DEFAULT_SAMPLE_NOTES: VoiceNote[] = [
  {
    id: 'sample-1',
    title: 'Hagrid’s: Salir 7:15 AM de Celebration Suites',
    category: 'rides',
    dayNumber: 2,
    authorName: 'Lorena',
    durationSeconds: 14,
    createdAt: Date.now() - 1000 * 60 * 60 * 12,
    summaryText: 'Pedir los 2 UberXL a las 7:15 en punto desde el lobby para llegar a la cuerda de Universal Islands of Adventure antes de la apertura.',
    isFavorite: true,
  },
  {
    id: 'sample-2',
    title: 'Talles de botines para Máximo y Renato',
    category: 'shopping',
    dayNumber: 4,
    authorName: 'Renato',
    durationSeconds: 9,
    createdAt: Date.now() - 1000 * 60 * 60 * 5,
    summaryText: 'Revisar talle US 9.5 y 10 en Nike Clearance Store de Vineland Outlets. Chequear suela FG para césped.',
    isFavorite: false,
  },
  {
    id: 'sample-3',
    title: 'Walmart Kissimmee: Desayunos y snacks',
    category: 'food',
    dayNumber: 1,
    authorName: 'Celia',
    durationSeconds: 11,
    createdAt: Date.now() - 1000 * 60 * 60 * 2,
    summaryText: 'Comprar packs de agua mineral de 40 unidades, barras de cereal, fruta fresca y protector solar antes del primer día de parque.',
    isFavorite: true,
  }
];

export async function getAllVoiceNotes(): Promise<VoiceNote[]> {
  try {
    const db = await openDatabase();
    return new Promise((resolve) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        const records: VoiceNote[] = request.result || [];
        if (records.length === 0) {
          // Inicializar con notas de ejemplo y audio real sintetizado
          seedDefaultNotes().then(seeded => resolve(seeded));
        } else {
          // Reconstruir URLs de reproducción a partir de Blobs
          const withUrls = records.map(note => {
            if (note.audioBlob) {
              try {
                return { ...note, audioUrl: URL.createObjectURL(note.audioBlob) };
              } catch {
                return note;
              }
            }
            return note;
          });
          resolve(withUrls.sort((a, b) => b.createdAt - a.createdAt));
        }
      };

      request.onerror = () => {
        resolve(DEFAULT_SAMPLE_NOTES);
      };
    });
  } catch (err) {
    console.warn('Error leyendo notas desde IndexedDB, fallback a memoria:', err);
    return DEFAULT_SAMPLE_NOTES;
  }
}

async function seedDefaultNotes(): Promise<VoiceNote[]> {
  try {
    const db = await openDatabase();
    const seededNotes: VoiceNote[] = DEFAULT_SAMPLE_NOTES.map((n, idx) => {
      const freq = idx === 0 ? 520 : idx === 1 ? 660 : 440;
      const blob = createSampleBeepAudioBlob(freq, n.durationSeconds * 1000);
      return {
        ...n,
        audioBlob: blob,
        audioUrl: URL.createObjectURL(blob),
      };
    });

    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    seededNotes.forEach(note => {
      // Guardamos sin la propiedad audioUrl que es volátil
      const { audioUrl, ...persisted } = note;
      store.put(persisted);
    });

    return seededNotes;
  } catch (err) {
    console.warn('Error inicializando notas demo:', err);
    return DEFAULT_SAMPLE_NOTES;
  }
}

export async function saveVoiceNote(note: Omit<VoiceNote, 'id' | 'createdAt'>): Promise<VoiceNote> {
  const newNote: VoiceNote = {
    ...note,
    id: 'vn_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    createdAt: Date.now(),
  };

  if (newNote.audioBlob) {
    newNote.audioUrl = URL.createObjectURL(newNote.audioBlob);
  }

  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const { audioUrl, ...persisted } = newNote;
      const request = store.add(persisted);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('Error guardando en IndexedDB:', err);
  }

  return newNote;
}

export async function deleteVoiceNote(id: string): Promise<void> {
  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('Error eliminando de IndexedDB:', err);
  }
}

export async function toggleFavoriteVoiceNote(id: string, isFav: boolean): Promise<void> {
  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const getReq = store.get(id);
      getReq.onsuccess = () => {
        const item = getReq.result;
        if (item) {
          item.isFavorite = isFav;
          store.put(item);
        }
        resolve();
      };
      getReq.onerror = () => reject(getReq.error);
    });
  } catch (err) {
    console.warn('Error actualizando favorito en IndexedDB:', err);
  }
}

/**
 * Genera el texto con enlace listo para enviar a WhatsApp
 */
export function formatVoiceNoteForWhatsApp(note: VoiceNote, appUrl: string): string {
  const categoryLabels: Record<string, string> = {
    rides: '🎢 Parques y Montañas Rusas',
    shopping: '🛍️ Compras & Botines',
    uber: '🚗 UberXL & Traslados',
    hotel: '🏨 Celebration Suites',
    food: '🍔 Almuerzos & Comida Rápida',
    general: '💡 Recordatorio General',
  };

  const cat = categoryLabels[note.category] || '💡 Recordatorio';
  const day = note.dayNumber ? `Día ${note.dayNumber}` : 'General';
  const author = note.authorName || 'Coordinador del grupo';
  const duration = `${Math.floor(note.durationSeconds / 60)}:${(note.durationSeconds % 60).toString().padStart(2, '0')}`;

  const message = [
    `🎙️ *NOTA DE VIAJE - ORLANDO 2027*`,
    `📌 *Título:* ${note.title}`,
    `👤 *Por:* ${author} (${day})`,
    `🏷️ *Categoría:* ${cat}`,
    `⏱️ *Duración:* ${duration} min`,
    note.summaryText ? `📝 *Detalle:* ${note.summaryText}` : '',
    ``,
    `📲 Abrir la Web App del viaje:`,
    `${appUrl}`,
  ].filter(Boolean).join('\n');

  return encodeURIComponent(message);
}
