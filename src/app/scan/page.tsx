'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import { validateTicketCode } from '../actions/orders';
import { ValidateTicketResult } from './interfaces/ValidateTicket/ValidateTicketResult';

interface BarcodeDetectorDetection {
  rawValue?: string;
}

interface BarcodeDetectorInstance {
  detect: (source: ImageBitmapSource) => Promise<BarcodeDetectorDetection[]>;
}

interface BarcodeDetectorConstructor {
  new (options: { formats: string[] }): BarcodeDetectorInstance;
}

interface WindowWithBarcodeDetector extends Window {
  BarcodeDetector?: BarcodeDetectorConstructor;
}

interface JsQrOptions {
  inversionAttempts?: 'dontInvert' | 'onlyInvert' | 'attemptBoth' | 'invertFirst';
}

interface JsQrResult {
  data: string;
}

type JsQrFn = (
  data: Uint8ClampedArray,
  width: number,
  height: number,
  options?: JsQrOptions
) => JsQrResult | null;

interface ScanResult {
  value: string;
  scannedAtMs: number;
}

const CANVAS_WIDTH = 720;
const CANVAS_HEIGHT = 480;

function isBarcodeDetectorAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  return typeof (window as WindowWithBarcodeDetector).BarcodeDetector === 'function';
}

export default function ScanPage() {
  const { isAuthenticated } = useAuth();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const jsQrRef = useRef<JsQrFn | null>(null);

  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<ScanResult | null>(null);
  const [validation, setValidation] = useState<ValidateTicketResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  // Important: keep initial value deterministic for SSR to avoid hydration mismatch.
  const [isSecureContextValue, setIsSecureContextValue] = useState(false);

  const extractTicketCode = useCallback((raw: string): string | null => {
    const trimmed = raw.trim();
    if (!trimmed) return null;
    const prefix = 'ENTRATIX:TICKET:';
    if (trimmed.startsWith(prefix)) {
      const code = trimmed.slice(prefix.length).trim();
      return code || null;
    }

    const match = trimmed.match(/TCK-[A-Z0-9-]+/);
    return match ? match[0] : null;
  }, []);

  const runValidation = useCallback(
    async (rawValue: string) => {
      setValidation(null);
      setIsValidating(true);
      setError('');
      try {
        const code = extractTicketCode(rawValue);
        if (!code) {
          setValidation({ success: false, message: 'QR inválido (no contiene ticketCode)' });
          return;
        }
        const res = await validateTicketCode(code);
        setValidation(res);
      } catch {
        setValidation({ success: false, message: 'Failed to validate ticket' });
      } finally {
        setIsValidating(false);
      }
    },
    [extractTicketCode]
  );

  const stopScan = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (streamRef.current) {
      for (const track of streamRef.current.getTracks()) {
        track.stop();
      }
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsScanning(false);
  }, []);

  const startScan = useCallback(async () => {
    setError('');
    setResult(null);
    setValidation(null);

    if (!navigator.mediaDevices?.getUserMedia) {
      setError('No se pudo acceder a la cámara (getUserMedia no disponible).');
      return;
    }

    try {
      const canUseBarcodeDetector = isBarcodeDetectorAvailable();
      if (!canUseBarcodeDetector) {
        // Fallback: jsQR (software decode)
        try {
          const mod = (await import('jsqr')) as { default: JsQrFn };
          jsQrRef.current = mod.default;
        } catch {
          setError(
            'Tu navegador no expone BarcodeDetector y no se pudo cargar el fallback (jsQR). Abrí la app en `http://localhost:3000/scan` o habilitá HTTPS.'
          );
          return;
        }
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } },
        audio: false,
      });

      streamRef.current = stream;
      if (!videoRef.current) {
        setError('No se pudo inicializar el video.');
        return;
      }

      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setIsScanning(true);

      const DetectorCtor = (window as WindowWithBarcodeDetector).BarcodeDetector;
      const detector = DetectorCtor ? new DetectorCtor({ formats: ['qr_code'] }) : null;

      const tick = async () => {
        if (!videoRef.current || !canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        const vw = videoRef.current.videoWidth || CANVAS_WIDTH;
        const vh = videoRef.current.videoHeight || CANVAS_HEIGHT;

        canvasRef.current.width = vw;
        canvasRef.current.height = vh;
        ctx.drawImage(videoRef.current, 0, 0, vw, vh);

        try {
          if (detector) {
            const detections = await detector.detect(canvasRef.current);
            const first = detections.find(
              d => typeof d.rawValue === 'string' && d.rawValue.trim() !== ''
            );
            if (first?.rawValue) {
              setResult({ value: first.rawValue, scannedAtMs: Date.now() });
              stopScan();
              await runValidation(first.rawValue);
              return;
            }
          } else if (jsQrRef.current) {
            const img = ctx.getImageData(0, 0, vw, vh);
            const decoded = jsQrRef.current(img.data, vw, vh, {
              inversionAttempts: 'attemptBoth',
            });
            if (decoded?.data) {
              setResult({ value: decoded.data, scannedAtMs: Date.now() });
              stopScan();
              await runValidation(decoded.data);
              return;
            }
          }
        } catch {
          // ignore individual frame errors
        }

        rafRef.current = requestAnimationFrame(() => {
          void tick();
        });
      };

      void tick();
    } catch (e: unknown) {
      stopScan();
      const message =
        e instanceof Error ? e.message : 'No se pudo acceder a la cámara.';
      setError(message);
    }
  }, [runValidation, stopScan]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsSecureContextValue(window.isSecureContext);
    }
    return () => stopScan();
  }, [stopScan]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-pink-500/15 via-purple-900/30 to-black relative overflow-hidden text-white">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-pink-500/20 via-purple-900/40 to-black/80 pointer-events-none opacity-100 z-0"></div>
      <div className="fixed inset-0 bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent pointer-events-none opacity-100 z-0"></div>

      <div className="relative z-10 px-6 md:px-10 lg:px-24 pt-28 pb-16">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-gray-900/60 via-black/50 to-gray-800/60 backdrop-blur-md border border-gray-600/40 rounded-lg p-6 shadow-2xl">
          <h1 className="text-3xl font-condensed font-bold text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text">
            Scan
          </h1>
          <p className="text-gray-300 mt-2">
            Escaneá códigos QR para validar tickets.
          </p>

          {!isSecureContextValue && (
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-200">
              Estás en un contexto no-seguro (por ejemplo `http://192.168.x.x`). En Chrome,
              algunas APIs (como `BarcodeDetector`) pueden no estar disponibles. Si podés,
              abrí `http://localhost:3000/scan` o usá HTTPS.
            </div>
          )}

          {!isAuthenticated && (
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-200">
              Necesitás estar logueado para operar como scanner.{' '}
              <Link href="/login" className="underline text-cyan-300">
                Ir a login
              </Link>
              .
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300">
              {error}
            </div>
          )}

          {result && (
            <div className="mt-4 p-4 bg-black/30 rounded-lg border border-cyan-400/20">
              <div className="text-cyan-300 font-semibold">Último QR</div>
              <div className="mt-2 break-all text-white">{result.value}</div>
              <div className="mt-2 text-sm text-gray-400">
                {new Date(result.scannedAtMs).toLocaleString()}
              </div>
            </div>
          )}

          {isValidating && (
            <div className="mt-4 p-3 bg-black/30 rounded-lg border border-cyan-400/20 text-cyan-300">
              Validando ticket…
            </div>
          )}

          {validation && (
            <div
              className={`mt-4 p-4 rounded-lg border ${
                validation.success
                  ? 'bg-green-500/10 border-green-500/30 text-green-200'
                  : 'bg-red-500/10 border-red-500/30 text-red-200'
              }`}
            >
              <div className="font-semibold">
                {validation.success ? 'VALID' : 'INVALID'} — {validation.message}
              </div>
              {validation.ticket && (
                <div className="mt-3 text-sm text-gray-200 space-y-1">
                  <div>
                    <span className="text-gray-400">Event:</span>{' '}
                    {validation.ticket.eventTitle}
                  </div>
                  <div>
                    <span className="text-gray-400">Ticket:</span>{' '}
                    {validation.ticket.ticketType}
                  </div>
                  <div>
                    <span className="text-gray-400">Owner:</span>{' '}
                    {validation.ticket.ownerName} ({validation.ticket.ownerEmail})
                  </div>
                  <div>
                    <span className="text-gray-400">Code:</span>{' '}
                    {validation.ticket.ticketCode}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void startScan()}
              disabled={!isAuthenticated || isScanning}
              className="px-5 py-3 rounded-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-pink-500/20"
            >
              {isScanning ? 'Escaneando…' : 'Iniciar escaneo'}
            </button>
            <button
              type="button"
              onClick={stopScan}
              disabled={!isScanning}
              className="px-5 py-3 rounded-lg font-semibold border border-cyan-400/40 bg-gradient-to-r from-black/30 via-purple-900/15 to-black/30 hover:border-cyan-400/70 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Detener
            </button>
          </div>

          <div className="mt-6 rounded-lg overflow-hidden border border-pink-500/30">
            <video
              ref={videoRef}
              className="w-full bg-black"
              playsInline
              muted
            />
          </div>

          {/* hidden canvas used for detection */}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </div>
  );
}


