'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import QRCode from 'react-qr-code';
import { Download, QrCode, ShareNetwork } from '@phosphor-icons/react';
import { Modal } from './ModalQr'; // 👈 importa el nuevo modal
import jsPDF from 'jspdf';

export interface CardTicketProps {
  status: 'Active' | 'Completed' | 'Expired';
  imageUrl: string;
  title: string;
  artists: string;
  date: string;
  time: string;
  location: string;
  ticketType: string;
  ticketPrice: string;
  totalPaid: string;
}

export const CardTicket: React.FC<CardTicketProps> = ({
  status,
  imageUrl,
  title,
  artists,
  date,
  time,
  location,
  ticketType,
  ticketPrice,
  totalPaid,
}) => {
  const [showQR, setShowQR] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadTicketPDF = async () => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Colores principales
      const primaryPink = [236, 72, 153];
      const primaryCyan = [6, 182, 212];

      const lightGray = [200, 200, 200];

      // === FONDO RETROWAVE OSCURO ===
      // Fondo base negro
      doc.setFillColor(0, 0, 0);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');

      // Gradiente sutil (muy oscuro)
      for (let i = 0; i < pageHeight; i++) {
        let r, g, b;

        if (i < pageHeight * 0.2) {
          // Zona superior: Negro a purple muy oscuro
          const localAlpha = i / (pageHeight * 0.2);
          r = Math.floor(0 * (1 - localAlpha) + 25 * localAlpha);
          g = Math.floor(0 * (1 - localAlpha) + 8 * localAlpha);
          b = Math.floor(0 * (1 - localAlpha) + 40 * localAlpha);
        } else if (i < pageHeight * 0.8) {
          // Zona media: Purple muy oscuro constante
          r = 25;
          g = 8;
          b = 40;
        } else {
          // Zona inferior: Purple oscuro a negro
          const localAlpha = (i - pageHeight * 0.8) / (pageHeight * 0.2);
          r = Math.floor(25 * (1 - localAlpha));
          g = Math.floor(8 * (1 - localAlpha));
          b = Math.floor(40 * (1 - localAlpha));
        }

        doc.setFillColor(r, g, b);
        doc.rect(0, i, pageWidth, 1, 'F');
      }

      // Efectos adicionales retrowave sutiles
      // Círculos de glow decorativos con menor opacidad
      doc.setFillColor(
        Math.floor(primaryCyan[0] * 0.3),
        Math.floor(primaryCyan[1] * 0.3),
        Math.floor(primaryCyan[2] * 0.3)
      );
      doc.circle(pageWidth * 0.8, pageHeight * 0.2, 2, 'F');
      doc.setFillColor(
        Math.floor(primaryPink[0] * 0.2),
        Math.floor(primaryPink[1] * 0.2),
        Math.floor(primaryPink[2] * 0.2)
      );
      doc.circle(pageWidth * 0.15, pageHeight * 0.8, 1.5, 'F');

      // === HEADER ===
      // Fondo del header con efecto sutil
      for (let i = 0; i < 45; i++) {
        const alpha = i / 45;
        const r = Math.floor(primaryPink[0] * 0.4 * (1 - alpha * 0.5));
        const g = Math.floor(primaryPink[1] * 0.4 * (1 - alpha * 0.5));
        const b = Math.floor(primaryPink[2] * 0.4 * (1 - alpha * 0.5));
        doc.setFillColor(r, g, b);
        doc.rect(0, i, pageWidth, 1, 'F');
      }

      // Texto del header
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(28);
      doc.setFont('helvetica', 'bold');
      doc.text('ENTRATIX TICKET', pageWidth / 2, 30, { align: 'center' });

      // Status Badge
      const statusX = pageWidth - 45;
      const statusY = 50;
      doc.setFillColor(primaryCyan[0], primaryCyan[1], primaryCyan[2]);
      doc.roundedRect(statusX, statusY, 35, 12, 3, 3, 'F');
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(status.toUpperCase(), statusX + 17.5, statusY + 8, {
        align: 'center',
      });

      // === INFORMACIÓN PRINCIPAL ===
      let yPos = 75;

      // Título del evento
      doc.setTextColor(primaryPink[0], primaryPink[1], primaryPink[2]);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      const titleLines = doc.splitTextToSize(title, pageWidth - 40);
      doc.text(titleLines, 20, yPos);
      yPos += titleLines.length * 10 + 5;

      // Artistas
      doc.setTextColor(primaryCyan[0], primaryCyan[1], primaryCyan[2]);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'normal');
      doc.text(`Artistas: ${artists}`, 20, yPos);
      yPos += 15;

      // Línea decorativa
      doc.setDrawColor(primaryPink[0], primaryPink[1], primaryPink[2]);
      doc.setLineWidth(3);
      doc.line(20, yPos, pageWidth - 20, yPos);
      yPos += 15;

      // === DETALLES DEL EVENTO ===
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');

      // Fecha y hora
      doc.text('FECHA Y HORA:', 20, yPos);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.text(`${date} • ${time}`, 20, yPos + 8);
      yPos += 20;

      // Ubicación
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.text('UBICACION:', 20, yPos);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
      const locationLines = doc.splitTextToSize(location, pageWidth - 40);
      doc.text(locationLines, 20, yPos + 8);
      yPos += locationLines.length * 6 + 15;

      // === INFORMACIÓN DEL TICKET ===
      // Fondo oscuro para la sección del ticket
      doc.setFillColor(15, 15, 25);
      doc.roundedRect(15, yPos, pageWidth - 30, 50, 5, 5, 'F');

      // Borde neón de la sección del ticket
      doc.setDrawColor(primaryCyan[0], primaryCyan[1], primaryCyan[2]);
      doc.setLineWidth(2);
      doc.roundedRect(15, yPos, pageWidth - 30, 50, 5, 5, 'S');

      // Efecto de glow (múltiples bordes más suaves)
      doc.setLineWidth(1);
      doc.setDrawColor(primaryCyan[0], primaryCyan[1], primaryCyan[2]);
      doc.roundedRect(14, yPos - 1, pageWidth - 28, 52, 6, 6, 'S');

      doc.setLineWidth(0.5);
      doc.roundedRect(13, yPos - 2, pageWidth - 26, 54, 7, 7, 'S');

      yPos += 12;

      doc.setTextColor(primaryCyan[0], primaryCyan[1], primaryCyan[2]);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('DETALLES DEL TICKET', 25, yPos);
      yPos += 12;

      // Tipo de ticket
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text('Tipo:', 25, yPos);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryPink[0], primaryPink[1], primaryPink[2]);
      doc.text(ticketType, 50, yPos);

      // Precio
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'normal');
      doc.text('Precio:', 25, yPos + 8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryCyan[0], primaryCyan[1], primaryCyan[2]);
      doc.text(ticketPrice, 50, yPos + 8);

      // Total pagado (destacado)
      yPos += 18;
      doc.setFontSize(14);
      doc.setTextColor(primaryPink[0], primaryPink[1], primaryPink[2]);
      doc.setFont('helvetica', 'bold');
      doc.text(`TOTAL PAGADO: ${totalPaid}`, 25, yPos);

      yPos += 25;

      // === INFORMACIÓN ADICIONAL ===
      // ID del ticket único
      const ticketId = `#${Math.random()
        .toString(36)
        .substr(2, 9)
        .toUpperCase()}`;

      // ID del ticket destacado
      doc.setTextColor(primaryCyan[0], primaryCyan[1], primaryCyan[2]);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('TICKET ID', 20, yPos);

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.text(ticketId, 20, yPos + 12);

      yPos += 30;

      // Instrucciones
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('INSTRUCCIONES DE INGRESO', 20, yPos);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.text(
        '• Presenta este ticket en el evento junto con tu identificación',
        20,
        yPos + 12
      );
      doc.text(
        '• Llega 30 minutos antes del horario del evento',
        20,
        yPos + 20
      );
      doc.text('• Conserva este ticket durante todo el evento', 20, yPos + 28);

      yPos += 45; // Espaciado adicional antes del footer

      // === FOOTER ===
      const footerY = Math.max(yPos + 15, pageHeight - 40); // Asegurar que no se superponga

      // Línea decorativa
      doc.setDrawColor(primaryCyan[0], primaryCyan[1], primaryCyan[2]);
      doc.setLineWidth(2);
      doc.line(20, footerY - 10, pageWidth - 20, footerY - 10);

      // Texto del footer
      doc.setTextColor(primaryCyan[0], primaryCyan[1], primaryCyan[2]);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('¡Gracias por elegir Entratix!', pageWidth / 2, footerY, {
        align: 'center',
      });

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.text(
        'www.entratix.com • soporte@entratix.com',
        pageWidth / 2,
        footerY + 6,
        { align: 'center' }
      );
      doc.text(
        'Conserva este ticket para el ingreso al evento',
        pageWidth / 2,
        footerY + 12,
        { align: 'center' }
      );

      // Generar nombre del archivo
      const fileName = `Entratix_Ticket_${title.replace(
        /[^a-zA-Z0-9]/g,
        '_'
      )}_${date.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;

      // Descargar el PDF
      doc.save(fileName);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      alert('Hubo un error al generar el PDF. Por favor intenta de nuevo.');
    }
  };

  return (
    <>
      <div
        ref={cardRef}
        className="flex flex-col bg-gradient-to-b from-purple-900/30 via-black/40 to-black/50 border-2 border-pink-500/40 rounded-xl w-full p-4 text-white relative backdrop-blur-sm overflow-hidden hover:from-pink-500/25 hover:via-purple-500/25 hover:to-cyan-400/25 hover:border-cyan-400 transition-all duration-300"
        style={{
          // Estilos específicos para mejorar captura PDF
          boxShadow:
            '0 0 20px rgba(236, 72, 153, 0.3), inset 0 0 20px rgba(6, 182, 212, 0.1)',
          background:
            'linear-gradient(135deg, rgba(88, 28, 135, 0.4) 0%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.7) 100%)',
        }}
      >
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/3 via-transparent to-cyan-400/3 pointer-events-none"></div>

        {/* Status */}
        <span className="absolute top-4 right-4 border border-cyan-400/30 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 text-cyan-300 text-xs px-4 font-semibold rounded-full z-20 max-[700px]:rounded-none max-[700px]:rounded-tr-lg backdrop-blur-sm">
          {status}
          <div className="absolute inset-0 text-cyan-400 blur-sm opacity-15 flex items-center justify-center">
            {status}
          </div>
        </span>

        {/* Contenido */}
        <div className="flex max-[700px]:flex-col gap-6 relative z-10">
          <div className="rounded-lg overflow-hidden min-w-[120px] h-[120px] relative border border-pink-500/15">
            <Image
              src={imageUrl}
              alt="Ticket Image"
              fill
              className="object-cover"
            />
            {/* Image overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 via-transparent to-cyan-400/5 pointer-events-none"></div>
          </div>
          <div className="flex flex-col justify-between w-full">
            <h3 className="text-lg font-bold text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text relative">
              {title}
              <div className="absolute inset-0 text-pink-500 blur-sm opacity-15">
                {title}
              </div>
            </h3>
            <div className="text-sm text-cyan-300 relative">
              {artists}
              <div className="absolute inset-0 text-purple-500/10 blur-sm">
                {artists}
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-cyan-300 mt-2 relative">
              <Image
                src="/assets/icons/cards/calendar_month.svg"
                alt="date"
                width={18}
                height={18}
                className="filter drop-shadow-[0_0_4px_rgba(6,182,212,0.2)]"
              />
              <span>{date}</span>
              <span className="mx-1 text-pink-500/70">•</span>
              <span>{time}</span>
              <div className="absolute inset-0 text-purple-500/8 blur-sm">
                {date} • {time}
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-cyan-300 mt-1 relative">
              <Image
                src="/assets/icons/cards/location.svg"
                alt="location"
                width={18}
                height={18}
                className="filter drop-shadow-[0_0_4px_rgba(6,182,212,0.2)]"
              />
              <span>{location}</span>
              <div className="absolute inset-0 text-purple-500/8 blur-sm">
                {location}
              </div>
            </div>
          </div>
        </div>

        {/* Detalles */}
        <div className="flex flex-col divide-y divide-pink-500/15 my-4 relative z-10">
          <div className="flex justify-between items-center text-sm py-2">
            <span className="text-cyan-300 relative">
              {ticketType}
              <div className="absolute inset-0 text-purple-500/8 blur-sm">
                {ticketType}
              </div>
            </span>
            <span className="font-semibold text-transparent bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text relative">
              {ticketPrice}
              <div className="absolute inset-0 text-pink-500 blur-sm opacity-15">
                {ticketPrice}
              </div>
            </span>
          </div>
          <div className="flex justify-between items-center text-base font-semibold py-2">
            <span className="text-cyan-300 relative">
              Total Paid
              <div className="absolute inset-0 text-purple-500/8 blur-sm">
                Total Paid
              </div>
            </span>
            <span className="text-transparent bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text relative">
              {totalPaid}
              <div className="absolute inset-0 text-pink-500 blur-sm opacity-20">
                {totalPaid}
              </div>
            </span>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex gap-3 mt-6 relative z-10">
          <button
            onClick={() => setShowQR(true)}
            className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-cyan-400/40 text-white px-4 py-2 rounded-lg text-sm max-[700px]:text-xs font-semibold backdrop-blur-sm border border-pink-500/20 hover:from-pink-500/60 hover:via-purple-500/60 hover:to-cyan-400/60 transition-all duration-300 relative overflow-hidden"
          >
            <QrCode
              size={16}
              className="relative z-10 drop-shadow-[0_0_4px_rgba(255,255,255,0.15)]"
            />
            <span className="relative z-10">View QR</span>
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 blur-xl opacity-30"></div>
          </button>
          <button
            onClick={downloadTicketPDF}
            className="cursor-pointer flex items-center gap-2 border border-pink-500/30 bg-gradient-to-r from-pink-500/5 to-cyan-400/5 text-cyan-300 px-4 py-2 rounded-lg text-sm max-[700px]:text-xs font-semibold backdrop-blur-sm hover:from-pink-500/10 hover:to-cyan-400/10 hover:border-pink-500/40 transition-all duration-300 relative"
          >
            <Download
              size={16}
              className="drop-shadow-[0_0_4px_rgba(6,182,212,0.2)]"
            />
            <span>Download PDF</span>
            <div className="absolute inset-0 text-pink-500/10 blur-sm flex items-center gap-2 justify-center">
              Download PDF
            </div>
          </button>
          <button className="cursor-pointer flex items-center justify-center px-3 py-2 rounded-lg border border-pink-500/20 bg-gradient-to-r from-pink-500/5 to-purple-500/5 hover:from-pink-500/10 hover:to-purple-500/10 hover:border-pink-500/30 transition-all duration-300 backdrop-blur-sm relative">
            <ShareNetwork
              size={16}
              className="text-cyan-300 drop-shadow-[0_0_4px_rgba(6,182,212,0.2)]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-purple-500/5 blur-xl opacity-15"></div>
          </button>
        </div>
      </div>

      {/* Modal QR */}
      <Modal isOpen={showQR} onClose={() => setShowQR(false)}>
        <div className="flex flex-col items-center">
          {/* QR Code with neon border effect */}
          <div className="relative p-4 rounded-xl bg-white/95 backdrop-blur-sm border-2 border-pink-500/30 shadow-xl">
            <QRCode
              value={`Ticket - ${title} - ${date} - ${time}`}
              size={180}
            />
            {/* Glow effect around QR */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 blur-xl rounded-xl opacity-30 -z-10"></div>
          </div>

          <p className="mt-6 text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text font-semibold text-sm text-center relative">
            {title} • {date} {time}
            {/* Text glow effect */}
            <div className="absolute inset-0 text-pink-500 blur-sm opacity-15 flex items-center justify-center">
              {title} • {date} {time}
            </div>
          </p>
        </div>
      </Modal>
    </>
  );
};
