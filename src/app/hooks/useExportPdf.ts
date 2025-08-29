"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export interface PdfColumn<T> {
  key: keyof T;
  header: string;
}

export function useExportPdf() {
  function exportToPdf<T>(
    filename: string,
    title: string,
    rows: T[],
    columns: PdfColumn<T>[],
    extraInfo?: { [label: string]: string | number } // opcional para mostrar totales u otra data
  ) {
    if (!rows || rows.length === 0) return;

    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.text(title, 14, 20);

    // Extra info (ej: Totales)
    if (extraInfo) {
      let y = 30;
      doc.setFontSize(12);
      for (const [label, value] of Object.entries(extraInfo)) {
        doc.text(`${label}: ${value}`, 14, y);
        y += 8;
      }
    }

    // Tabla
    autoTable(doc, {
      startY: extraInfo ? 50 : 30,
      head: [columns.map(c => c.header)],
      body: rows.map(r => columns.map(c => String(r[c.key] ?? ""))),
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [59, 175, 187] }, // celeste de tu UI
    });

    doc.save(filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
  }

  return { exportToPdf };
}
