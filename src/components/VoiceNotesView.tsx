import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, Square, Play, Pause, Trash2, Share2, 
  Sparkles, Clock, Check, Volume2, 
  RotateCcw, Download, Calendar, User, Tag,
  Search, ShieldAlert, MessageCircle, Send, Star
} from 'lucide-react';
import { useVoiceRecorder } from '../hooks/useVoiceRecorder';
import { 
  VoiceNote, getAllVoiceNotes, saveVoiceNote, 
  deleteVoiceNote, toggleFavoriteVoiceNote, formatVoiceNoteForWhatsApp 
} from '../utils/voiceNotesDb';
import { TRAVELERS, ITINERARY } from '../data/tripData';

interface VoiceNotesViewProps {
  onOpenShareModal?: () => void;
}

export const VoiceNotesView: React.FC<VoiceNotesViewProps> = ({ onOpenShareModal }) => {
  const [notes, setNotes] = useState<VoiceNote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSaveModal, setShowSaveModal] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New Note form state
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<VoiceNote['category']>('rides');
  const [newDayNumber, setNewDayNumber] = useState<number>(2);
  const [newAuthor, setNewAuthor] = useState<string>('Lorena');
  const [newSummaryText, setNewSummaryText] = useState<string>('');

  // Audio Playback state for cards
  const [playingNoteId, setPlayingNoteId] = useState<string | null>(null);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState<Record<string, number>>({});
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const audioElementsRef = useRef<Record<string, HTMLAudioElement>>({});

  const {
    state: recorderState,
    durationSeconds,
    audioBlob,
    audioUrl,
    volumeLevel,
    error: recorderError,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    cancelRecording,
    resetRecorder,
  } = useVoiceRecorder();

  // Load existing notes
  const fetchNotes = async () => {
    setLoading(true);
    const data = await getAllVoiceNotes();
    setNotes(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // When recorder stops, prepare save modal
  const handleStopAndPrepareSave = async () => {
    const blob = await stopRecording();
    if (blob) {
      // Auto-suggest title based on active day or time
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setNewTitle(`Nota de voz (${timeStr})`);
      setShowSaveModal(true);
    }
  };

  const handleSaveNote = async () => {
    if (!audioBlob && !audioUrl) return;

    await saveVoiceNote({
      title: newTitle.trim() || 'Recordatorio de viaje',
      category: newCategory,
      dayNumber: newDayNumber,
      authorName: newAuthor,
      durationSeconds: Math.max(1, durationSeconds),
      audioBlob: audioBlob || undefined,
      summaryText: newSummaryText.trim() || undefined,
      isFavorite: false,
    });

    setShowSaveModal(false);
    resetRecorder();
    setNewTitle('');
    setNewSummaryText('');
    await fetchNotes();
  };

  // Playback handlers
  const handleTogglePlay = (note: VoiceNote) => {
    if (!note.audioUrl) return;

    let audio = audioElementsRef.current[note.id];
    if (!audio) {
      audio = new Audio(note.audioUrl);
      audioElementsRef.current[note.id] = audio;

      audio.ontimeupdate = () => {
        setCurrentPlaybackTime(prev => ({ ...prev, [note.id]: audio.currentTime }));
      };

      audio.onended = () => {
        setPlayingNoteId(null);
        setCurrentPlaybackTime(prev => ({ ...prev, [note.id]: 0 }));
      };
    }

    audio.playbackRate = playbackSpeed;

    if (playingNoteId === note.id) {
      audio.pause();
      setPlayingNoteId(null);
    } else {
      // Pause any other playing audio
      Object.entries(audioElementsRef.current).forEach(([id, a]) => {
        if (id !== note.id) {
          a.pause();
        }
      });
      audio.play().then(() => {
        setPlayingNoteId(note.id);
      }).catch(err => console.warn('Audio play error:', err));
    }
  };

  const handleSeek = (noteId: string, time: number) => {
    const audio = audioElementsRef.current[noteId];
    if (audio) {
      audio.currentTime = time;
      setCurrentPlaybackTime(prev => ({ ...prev, [noteId]: time }));
    }
  };

  const handleCycleSpeed = (noteId: string) => {
    const speeds = [1.0, 1.25, 1.5, 2.0];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackSpeed(nextSpeed);

    const audio = audioElementsRef.current[noteId];
    if (audio) {
      audio.playbackRate = nextSpeed;
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Querés eliminar esta nota de voz?')) {
      const audio = audioElementsRef.current[id];
      if (audio) {
        audio.pause();
        delete audioElementsRef.current[id];
      }
      await deleteVoiceNote(id);
      setNotes(prev => prev.filter(n => n.id !== id));
    }
  };

  const handleToggleFavorite = async (note: VoiceNote) => {
    const newFav = !note.isFavorite;
    await toggleFavoriteVoiceNote(note.id, newFav);
    setNotes(prev => prev.map(n => n.id === note.id ? { ...n, isFavorite: newFav } : n));
  };

  const handleShareToWhatsApp = (note: VoiceNote) => {
    const currentUrl = window.location.href.split('#')[0];
    const encoded = formatVoiceNoteForWhatsApp(note, currentUrl);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  const handleCopyNoteText = (note: VoiceNote) => {
    const currentUrl = window.location.href.split('#')[0];
    const decoded = decodeURIComponent(formatVoiceNoteForWhatsApp(note, currentUrl));
    navigator.clipboard.writeText(decoded);
    setCopiedId(note.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Filter notes
  const filteredNotes = notes.filter(n => {
    if (activeCategory === 'favorites' && !n.isFavorite) return false;
    if (activeCategory !== 'all' && activeCategory !== 'favorites' && n.category !== activeCategory) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = n.title.toLowerCase().includes(q);
      const matchSummary = n.summaryText?.toLowerCase().includes(q) || false;
      const matchAuthor = n.authorName.toLowerCase().includes(q);
      if (!matchTitle && !matchSummary && !matchAuthor) return false;
    }
    return true;
  });

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const categoryLabels: Record<string, { label: string; icon: string; bg: string; text: string }> = {
    rides: { label: 'Atracciones & Parques', icon: '🎢', bg: 'bg-amber-50 border-amber-200', text: 'text-amber-800' },
    shopping: { label: 'Compras & Botines', icon: '🛍️', bg: 'bg-purple-50 border-purple-200', text: 'text-purple-800' },
    uber: { label: 'UberXL & Traslados', icon: '🚗', bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-800' },
    hotel: { label: 'Celebration Suites', icon: '🏨', bg: 'bg-blue-50 border-blue-200', text: 'text-blue-800' },
    food: { label: 'Comida & Snacks', icon: '🍔', bg: 'bg-orange-50 border-orange-200', text: 'text-orange-800' },
    general: { label: 'General / Ideas', icon: '💡', bg: 'bg-slate-100 border-slate-200', text: 'text-slate-800' },
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Hero */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 uppercase tracking-wider mb-1">
              <Mic className="w-3.5 h-3.5" />
              <span>Módulo de Notas de Voz · Coordinación Rápida</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Grabadora de Voz & Recordatorios del Viaje
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Grabá notas de voz al instante mientras caminan por los parques, revisan talles de botines en los outlets o coordinan la salida en UberXL. Se guardan en el dispositivo y podés compartirlas por WhatsApp con los demás adultos del grupo con 1 solo toque.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-center">
            {onOpenShareModal && (
              <button
                onClick={onOpenShareModal}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition-colors shadow-xs"
              >
                <Share2 className="w-4 h-4 text-emerald-600" />
                <span>Compartir App x WhatsApp</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Audio Recorder Console */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white shadow-md border border-slate-700/60">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            {/* Left: Recorder Status & Waveform */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              {/* Record / Mic Trigger Button */}
              {recorderState === 'idle' ? (
                <button
                  onClick={startRecording}
                  className="relative group shrink-0 w-16 h-16 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-600/40 transition-all transform active:scale-95"
                  title="Presionar para empezar a grabar"
                >
                  <Mic className="w-7 h-7" />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900" />
                </button>
              ) : (
                <button
                  onClick={handleStopAndPrepareSave}
                  className="relative shrink-0 w-16 h-16 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/50 animate-pulse transition-all"
                  title="Detener y guardar grabación"
                >
                  <Square className="w-6 h-6 fill-white" />
                </button>
              )}

              {/* Status Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`inline-block w-2.5 h-2.5 rounded-full ${
                    recorderState === 'recording' ? 'bg-rose-500 animate-ping' :
                    recorderState === 'paused' ? 'bg-amber-400' : 'bg-slate-400'
                  }`} />
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    {recorderState === 'recording' ? 'Grabando audio en vivo...' :
                     recorderState === 'paused' ? 'Grabación pausada' : 'Grabadora lista'}
                  </span>
                </div>

                <div className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-white mt-0.5">
                  {formatSeconds(durationSeconds)}
                </div>

                <p className="text-xs text-slate-400 truncate">
                  {recorderState === 'idle'
                    ? 'Tocá el botón rojo del micrófono para empezar a grabar'
                    : 'Hablale claro al celular o computadora'}
                </p>
              </div>
            </div>

            {/* Center / Right: Dynamic Audio Waveform Simulation */}
            <div className="flex items-center gap-1.5 h-10 w-full sm:w-48 justify-center bg-slate-800/80 rounded-xl px-3 border border-slate-700/50">
              {Array.from({ length: 16 }).map((_, i) => {
                const isRecording = recorderState === 'recording';
                const heightPercent = isRecording 
                  ? Math.max(15, Math.min(100, Math.sin((i + Date.now() / 150)) * 40 + volumeLevel * 80 + 30))
                  : 12;
                return (
                  <div
                    key={i}
                    className={`w-1.5 rounded-full transition-all duration-75 ${
                      isRecording ? 'bg-rose-400' : 'bg-slate-600'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                );
              })}
            </div>

            {/* Right: Controls when recording */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              {recorderState === 'recording' && (
                <>
                  <button
                    onClick={pauseRecording}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-slate-700/90 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors"
                  >
                    <Pause className="w-4 h-4" />
                    <span className="hidden sm:inline">Pausar</span>
                  </button>
                  <button
                    onClick={handleStopAndPrepareSave}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white rounded-xl shadow-md transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    <span>Guardar</span>
                  </button>
                  <button
                    onClick={cancelRecording}
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition-colors"
                    title="Cancelar grabación"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </>
              )}

              {recorderState === 'paused' && (
                <>
                  <button
                    onClick={resumeRecording}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl transition-colors"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Reanudar</span>
                  </button>
                  <button
                    onClick={handleStopAndPrepareSave}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white rounded-xl shadow-md transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    <span>Listo</span>
                  </button>
                  <button
                    onClick={cancelRecording}
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition-colors"
                    title="Cancelar grabación"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </>
              )}

              {recorderState === 'idle' && (
                <button
                  onClick={startRecording}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold bg-white text-slate-900 rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <Mic className="w-4 h-4 text-rose-600" />
                  <span>Grabar Nueva Nota</span>
                </button>
              )}
            </div>
          </div>

          {recorderError && (
            <div className="mt-3 p-2.5 bg-rose-950/80 border border-rose-800 rounded-xl text-xs text-rose-200 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{recorderError}</span>
            </div>
          )}
        </div>
      </div>

      {/* Save Modal Dialog */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Guardar Nota de Voz</h3>
                  <p className="text-xs text-slate-500">Duración: {formatSeconds(durationSeconds)}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowSaveModal(false);
                  resetRecorder();
                }}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {/* Audio preview */}
              {audioUrl && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs font-medium text-slate-600 mb-1.5">Escuchar antes de guardar:</div>
                  <audio controls src={audioUrl} className="w-full h-8" />
                </div>
              )}

              {/* Title Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Título del Recordatorio *
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="Ej: Hagrid's: llegar 7:30 / Botines Nike en Vineland"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                />
              </div>

              {/* Category & Day Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Categoría
                  </label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value as VoiceNote['category'])}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="rides">🎢 Atracciones & Parques</option>
                    <option value="shopping">🛍️ Compras & Botines</option>
                    <option value="uber">🚗 UberXL & Traslados</option>
                    <option value="hotel">🏨 Celebration Suites</option>
                    <option value="food">🍔 Comida & Snacks</option>
                    <option value="general">💡 General / Ideas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Día del Itinerario
                  </label>
                  <select
                    value={newDayNumber}
                    onChange={e => setNewDayNumber(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                  >
                    {ITINERARY.map(day => (
                      <option key={day.dayNumber} value={day.dayNumber}>
                        Día {day.dayNumber}: {day.dateStr} ({day.parkName || day.title.slice(0, 20)})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Author selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Quién grabó la nota
                </label>
                <select
                  value={newAuthor}
                  onChange={e => setNewAuthor(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                >
                  <optgroup label="Adultos Coordinadores">
                    {TRAVELERS.filter(t => t.role === 'adult').map(t => (
                      <option key={t.id} value={t.name}>{t.name} ({t.relation})</option>
                    ))}
                  </optgroup>
                  <optgroup label="Adolescentes">
                    {TRAVELERS.filter(t => t.role === 'teen').map(t => (
                      <option key={t.id} value={t.name}>{t.name} ({t.age} años)</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Summary / Notes text */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Resumen de texto / Detalles (Opcional)
                </label>
                <textarea
                  value={newSummaryText}
                  onChange={e => setNewSummaryText(e.target.value)}
                  rows={2}
                  placeholder="Escribí puntos clave para que se lean rápido en WhatsApp..."
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-rose-500 resize-none"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  setShowSaveModal(false);
                  resetRecorder();
                }}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveNote}
                className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Guardar Nota</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 md:pb-0">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors shrink-0 ${
              activeCategory === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todas ({notes.length})
          </button>
          <button
            onClick={() => setActiveCategory('favorites')}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors shrink-0 ${
              activeCategory === 'favorites'
                ? 'bg-amber-500 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            Favoritas ({notes.filter(n => n.isFavorite).length})
          </button>
          <button
            onClick={() => setActiveCategory('rides')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors shrink-0 ${
              activeCategory === 'rides'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🎢 Parques
          </button>
          <button
            onClick={() => setActiveCategory('shopping')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors shrink-0 ${
              activeCategory === 'shopping'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🛍️ Compras
          </button>
          <button
            onClick={() => setActiveCategory('uber')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors shrink-0 ${
              activeCategory === 'uber'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🚗 Uber
          </button>
          <button
            onClick={() => setActiveCategory('food')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors shrink-0 ${
              activeCategory === 'food'
                ? 'bg-orange-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🍔 Comidas
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar nota o autor..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-rose-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Voice Notes Grid */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 text-xs">Cargando notas de voz...</div>
      ) : filteredNotes.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Mic className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">No hay notas en esta categoría</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Probá tocando el botón rojo de arriba para grabar tu primera nota de audio o cambiá el filtro.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map(note => {
            const cat = categoryLabels[note.category] || categoryLabels.general;
            const isPlaying = playingNoteId === note.id;
            const currentTime = currentPlaybackTime[note.id] || 0;
            const progress = note.durationSeconds > 0 ? (currentTime / note.durationSeconds) * 100 : 0;
            const dateStr = new Date(note.createdAt).toLocaleDateString([], {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div 
                key={note.id}
                className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all duration-200 flex flex-col justify-between ${
                  note.isFavorite ? 'border-amber-300 shadow-sm bg-gradient-to-b from-amber-50/20 to-white' : 'border-slate-200 shadow-xs'
                }`}
              >
                <div>
                  {/* Top Note Badges & Actions */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${cat.bg} ${cat.text}`}>
                        <span>{cat.icon}</span>
                        <span>{cat.label}</span>
                      </span>

                      {note.dayNumber && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-700">
                          <Calendar className="w-2.5 h-2.5 text-slate-500" />
                          <span>Día {note.dayNumber}</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleToggleFavorite(note)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          note.isFavorite ? 'text-amber-500 hover:bg-amber-50' : 'text-slate-300 hover:text-slate-500 hover:bg-slate-100'
                        }`}
                        title={note.isFavorite ? 'Quitar de favoritos' : 'Marcar favorito'}
                      >
                        <Star className={`w-4 h-4 ${note.isFavorite ? 'fill-current' : ''}`} />
                      </button>

                      <button
                        onClick={() => handleDelete(note.id)}
                        className="p-1.5 rounded-lg text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Eliminar nota"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Author */}
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                    {note.title}
                  </h3>

                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                      <User className="w-3 h-3 text-blue-500" />
                      {note.authorName}
                    </span>
                    <span>·</span>
                    <span>{dateStr}</span>
                  </div>

                  {/* Optional Text Summary */}
                  {note.summaryText && (
                    <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed">
                      {note.summaryText}
                    </div>
                  )}
                </div>

                {/* Audio Player Component */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center gap-3">
                    {/* Play / Pause button */}
                    <button
                      onClick={() => handleTogglePlay(note)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform active:scale-95 ${
                        isPlaying
                          ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/30'
                          : 'bg-slate-900 text-white hover:bg-slate-800'
                      }`}
                      title={isPlaying ? 'Pausar' : 'Reproducir audio'}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current translate-x-0.5" />
                      )}
                    </button>

                    {/* Progress Bar & Seek */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mb-1">
                        <span>{formatSeconds(currentTime)}</span>
                        <span>{formatSeconds(note.durationSeconds)}</span>
                      </div>
                      <div 
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const clickX = e.clientX - rect.left;
                          const ratio = clickX / rect.width;
                          handleSeek(note.id, ratio * note.durationSeconds);
                        }}
                        className="h-2 w-full bg-slate-100 rounded-full overflow-hidden cursor-pointer relative"
                      >
                        <div 
                          className="h-full bg-rose-500 rounded-full transition-all duration-100"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Speed Switcher */}
                    <button
                      onClick={() => handleCycleSpeed(note.id)}
                      className="px-1.5 py-1 text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md shrink-0 transition-colors"
                      title="Cambiar velocidad de reproducción"
                    >
                      {playbackSpeed}x
                    </button>
                  </div>

                  {/* Bottom Share Row */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    {/* WhatsApp Action Button */}
                    <button
                      onClick={() => handleShareToWhatsApp(note)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
                      title="Enviar nota formateada al grupo de WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>

                    <button
                      onClick={() => handleCopyNoteText(note)}
                      className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 text-xs transition-colors shrink-0"
                      title="Copiar texto de la nota al portapapeles"
                    >
                      {copiedId === note.id ? (
                        <span className="text-emerald-600 flex items-center gap-1 px-1 text-[11px] font-bold">
                          <Check className="w-3.5 h-3.5" /> Copiado
                        </span>
                      ) : (
                        <Share2 className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {note.audioUrl && (
                      <a
                        href={note.audioUrl}
                        download={`${note.title.replace(/\s+/g, '_')}.webm`}
                        className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 text-xs transition-colors shrink-0"
                        title="Descargar archivo de audio"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
