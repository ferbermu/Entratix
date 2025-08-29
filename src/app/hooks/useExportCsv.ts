"use client";

export interface CsvColumn<T> {
  key: keyof T;
  header: string;
}

export function useExportCsv() {
  function exportToCsv<T>(filename: string, rows: T[], columns: CsvColumn<T>[]) {
    if (!rows || rows.length === 0) return;

    // Header
    const header = columns.map(c => c.header).join(",") + "\n";

    // Body
    const body = rows
      .map(row =>
        columns
          .map(col => {
            const val = row[col.key];
            return `"${val ?? ""}"`; // escapamos valores
          })
          .join(",")
      )
      .join("\n");

    // Descargar
    const csv = header + body;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return { exportToCsv };
}
