import React, { useState } from 'react';
import { 
  Mic, Square, Check, RotateCcw, Pause, Play, 
  MessageCircle, Sparkles, X, ChevronRight, Share2 
} from 'lucide-react';
import { useVoiceRecorder } from '../hooks/useVoiceRecorder';
import { saveVoiceNote, formatVoiceNoteForWhatsApp } from '../utils/voiceNotesDb';
import { TRAVELERS } from '../data/tripData';

interface QuickVoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved?: () => void;
  onOpenNotesView?: () => void;
}

export const QuickVoiceModal: React.FC<QuickVoiceModalProps> = ({
  isOpen,
  onClose,
  onSaved,
  onOpenNotesView,
}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('Lorena');
  const [category, setCategory] = useState<'rides' | 'shopping' | 'uber' | 'hotel' | 'food' | 'general'>('general');
  const [summary, setSummary] = useState('');
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);
  const [lastSavedNote, setLastSavedNote] = useState<any>(null);

  const {
    state,
    durationSeconds,
    audioBlob,
    audioUrl,
    volumeLevel,
    error,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    cancelRecording,
    resetRecorder,
  } = useVoiceRecorder();

  if (!isOpen) return null;

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleStopAndPreview = async () => {
    const blob = await stopRecording();
    if (blob && !title) {
      const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setTitle(`Nota rápida (${nowStr})`);
    }
  };

  const handleSave = async (shareDirectToWhatsApp = false) => {
    if (!audioBlob && !audioUrl) return;

    const saved = await saveVoiceNote({
      title: title.trim() || 'Recordatorio de viaje rápido',
      category,
      authorName: author,
      durationSeconds: Math.max(1, durationSeconds),
      audioBlob: audioBlob || undefined,
      summaryText: summary.trim() || undefined,
      isFavorite: false,
    });

    setLastSavedNote(saved);
    setIsSavedSuccess(true);
    if (onSaved) onSaved();

    if (shareDirectToWhatsApp) {
      const currentUrl = window.location.href.split('#')[0];
      const encoded = formatVoiceNoteForWhatsApp(saved, currentUrl);
      window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
    }
  };

  const handleCloseAndReset = () => {
    cancelRecording();
    resetRecorder();
    setTitle('');
    setSummary('');
    setIsSavedSuccess(false);
    setLastSavedNote(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-2 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Nota de Voz Rápida</h3>
              <p className="text-xs text-slate-500">Para no olvidar detalles en el momento</p>
            </div>
          </div>
          <button
            onClick={handleCloseAndReset}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Saved Success State */}
        {isSavedSuccess ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">¡Nota guardada con éxito!</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Quedó guardada en el dispositivo y podés consultarla cuando quieras en el módulo de Notas de Voz.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => {
                  if (lastSavedNote) {
                    const currentUrl = window.location.href.split('#')[0];
                    const encoded = formatVoiceNoteForWhatsApp(lastSavedNote, currentUrl);
                    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
                  }
                }}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enviar al Grupo por WhatsApp</span>
              </button>

              {onOpenNotesView && (
                <button
                  onClick={() => {
                    handleCloseAndReset();
                    onOpenNotesView();
                  }}
                  className="w-full py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Ver todas las notas de voz</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                onClick={handleCloseAndReset}
                className="text-xs text-slate-400 hover:text-slate-600 py-1 transition-colors"
              >
                Listo, cerrar
              </button>
            </div>
          </div>
        ) : (
          /* Active Recording Form */
          <div className="py-4 space-y-4">
            {/* Recorder Center Stage */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="text-xs uppercase tracking-wider text-slate-400 mb-1 font-semibold">
                {state === 'recording' ? 'Grabando audio' : state === 'paused' ? 'Pausado' : 'Listo para grabar'}
              </div>

              <div className="text-3xl font-mono font-bold text-white tracking-tight mb-3">
                {formatSeconds(durationSeconds)}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {state === 'idle' && !audioUrl && (
                  <button
                    onClick={startRecording}
                    className="w-14 h-14 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-600/50 active:scale-95 transition-all"
                    title="Empezar grabación"
                  >
                    <Mic className="w-6 h-6" />
                  </button>
                )}

                {state === 'recording' && (
                  <>
                    <button
                      onClick={pauseRecording}
                      className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors"
                      title="Pausar"
                    >
                      <Pause className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleStopAndPreview}
                      className="w-14 h-14 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-lg animate-pulse transition-all"
                      title="Detener y revisar"
                    >
                      <Square className="w-5 h-5 fill-white" />
                    </button>
                    <button
                      onClick={cancelRecording}
                      className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400 rounded-xl transition-colors"
                      title="Descartar"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </>
                )}

                {state === 'paused' && (
                  <>
                    <button
                      onClick={resumeRecording}
                      className="p-3 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl transition-colors"
                      title="Continuar"
                    >
                      <Play className="w-4 h-4 fill-current" />
                    </button>
                    <button
                      onClick={handleStopAndPreview}
                      className="px-4 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold transition-all"
                    >
                      Listo
                    </button>
                    <button
                      onClick={cancelRecording}
                      className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400 rounded-xl transition-colors"
                      title="Descartar"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </>
                )}

                {state === 'idle' && audioUrl && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={startRecording}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Grabar de nuevo</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Audio preview when stopped */}
              {audioUrl && state === 'idle' && (
                <div className="mt-3 w-full">
                  <audio controls src={audioUrl} className="w-full h-8" />
                </div>
              )}
            </div>

            {error && (
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                {error}
              </div>
            )}

            {/* Note details */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Título de la nota
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Ej: Salida UberXL 7:30 / Botines Nike"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Categoría
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="rides">🎢 Parques</option>
                    <option value="shopping">🛍️ Compras</option>
                    <option value="uber">🚗 UberXL</option>
                    <option value="hotel">🏨 Hotel</option>
                    <option value="food">🍔 Comida</option>
                    <option value="general">💡 General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Autor
                  </label>
                  <select
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                  >
                    {TRAVELERS.map(t => (
                      <option key={t.id} value={t.name}>{t.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Texto o detalle rápido (Opcional)
                </label>
                <textarea
                  value={summary}
                  onChange={e => setSummary(e.target.value)}
                  rows={2}
                  placeholder="Escribí notas rápidas..."
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500 resize-none"
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center gap-2 pt-2">
              <button
                disabled={!audioUrl && state === 'idle' && durationSeconds === 0}
                onClick={() => handleSave(false)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Guardar Nota</span>
              </button>

              <button
                disabled={!audioUrl && state === 'idle' && durationSeconds === 0}
                onClick={() => handleSave(true)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                title="Guardar y abrir WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Guardar y WhatsApp</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
