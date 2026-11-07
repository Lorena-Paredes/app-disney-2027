import { useState, useRef, useEffect, useCallback } from 'react';

export type RecorderState = 'idle' | 'recording' | 'paused';

interface UseVoiceRecorderReturn {
  state: RecorderState;
  durationSeconds: number;
  audioBlob: Blob | null;
  audioUrl: string | null;
  volumeLevel: number; // 0 to 1 for visualizer
  error: string | null;
  startRecording: () => Promise<void>;
  pauseRecording: () => void;
  resumeRecording: () => void;
  stopRecording: () => Promise<Blob | null>;
  cancelRecording: () => void;
  resetRecorder: () => void;
}

export function useVoiceRecorder(): UseVoiceRecorderReturn {
  const [state, setState] = useState<RecorderState>('idle');
  const [durationSeconds, setDurationSeconds] = useState<number>(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [volumeLevel, setVolumeLevel] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Clean up timer and animation frame
  const cleanupVisualizer = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
  }, []);

  const cleanupStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
  }, []);

  const cleanupTimer = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      cleanupVisualizer();
      cleanupStream();
      cleanupTimer();
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [cleanupVisualizer, cleanupStream, cleanupTimer, audioUrl]);

  const startRecording = useCallback(async () => {
    setError(null);
    audioChunksRef.current = [];
    setAudioBlob(null);
    setAudioUrl(null);
    setDurationSeconds(0);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Tu navegador no soporta grabación de voz directa. Asegurate de dar permisos de micrófono.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      streamRef.current = stream;

      // Determine mime type supported
      let mimeType = 'audio/webm';
      if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
        mimeType = 'audio/webm;codecs=opus';
      } else if (MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')) {
        mimeType = 'audio/ogg;codecs=opus';
      } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
        mimeType = 'audio/mp4';
      }

      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      // Set up simple audio visualizer level
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          const audioCtx = new AudioContextClass();
          audioContextRef.current = audioCtx;
          const source = audioCtx.createMediaStreamSource(stream);
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 64;
          source.connect(analyser);
          analyserRef.current = analyser;

          const dataArray = new Uint8Array(analyser.frequencyBinCount);
          const updateLevel = () => {
            if (analyserRef.current) {
              analyserRef.current.getByteFrequencyData(dataArray);
              let sum = 0;
              for (let i = 0; i < dataArray.length; i++) {
                sum += dataArray[i];
              }
              const avg = sum / dataArray.length;
              setVolumeLevel(Math.min(1, avg / 128));
              animFrameRef.current = requestAnimationFrame(updateLevel);
            }
          };
          updateLevel();
        }
      } catch (visErr) {
        console.warn('Visualizador no disponible:', visErr);
      }

      recorder.start(250); // timeslice 250ms
      setState('recording');

      // Start duration counter
      cleanupTimer();
      timerIntervalRef.current = window.setInterval(() => {
        setDurationSeconds(prev => prev + 1);
      }, 1000);
    } catch (err: unknown) {
      console.error('Error al iniciar grabación:', err);
      const msg = err instanceof Error ? err.message : 'No se pudo acceder al micrófono.';
      setError(msg);
      setState('idle');
      cleanupStream();
      cleanupVisualizer();
    }
  }, [cleanupTimer, cleanupStream, cleanupVisualizer]);

  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current && state === 'recording') {
      try {
        mediaRecorderRef.current.pause();
        setState('paused');
        cleanupTimer();
      } catch (err) {
        console.warn(err);
      }
    }
  }, [state, cleanupTimer]);

  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && state === 'paused') {
      try {
        mediaRecorderRef.current.resume();
        setState('recording');
        cleanupTimer();
        timerIntervalRef.current = window.setInterval(() => {
          setDurationSeconds(prev => prev + 1);
        }, 1000);
      } catch (err) {
        console.warn(err);
      }
    }
  }, [state, cleanupTimer]);

  const stopRecording = useCallback((): Promise<Blob | null> => {
    return new Promise((resolve) => {
      cleanupTimer();
      cleanupVisualizer();

      if (!mediaRecorderRef.current) {
        setState('idle');
        resolve(null);
        return;
      }

      const recorder = mediaRecorderRef.current;

      recorder.onstop = () => {
        const mime = recorder.mimeType || 'audio/webm';
        const finalBlob = new Blob(audioChunksRef.current, { type: mime });
        const url = URL.createObjectURL(finalBlob);
        setAudioBlob(finalBlob);
        setAudioUrl(url);
        setState('idle');
        cleanupStream();
        resolve(finalBlob);
      };

      try {
        if (recorder.state !== 'inactive') {
          recorder.stop();
        } else {
          setState('idle');
          cleanupStream();
          resolve(null);
        }
      } catch {
        setState('idle');
        cleanupStream();
        resolve(null);
      }
    });
  }, [cleanupTimer, cleanupVisualizer, cleanupStream]);

  const cancelRecording = useCallback(() => {
    cleanupTimer();
    cleanupVisualizer();
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch {}
    }
    cleanupStream();
    audioChunksRef.current = [];
    setAudioBlob(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setState('idle');
    setDurationSeconds(0);
    setVolumeLevel(0);
  }, [cleanupTimer, cleanupVisualizer, cleanupStream, audioUrl]);

  const resetRecorder = useCallback(() => {
    cancelRecording();
    setError(null);
  }, [cancelRecording]);

  return {
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
  };
}
