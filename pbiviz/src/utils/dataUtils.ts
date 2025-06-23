export function extractData(dataView: powerbi.DataView): any[] {
  if (!dataView || !dataView.table) return [];

  const rows = dataView.table.rows || [];
  const columns = dataView.table.columns || [];

  return rows.map(row => {
    const obj: Record<string, any> = {};
    columns.forEach((col, i) => {
      const colName = col.displayName || `col${i}`;
      obj[colName] = row[i];
    });
    return obj;
  });
}
