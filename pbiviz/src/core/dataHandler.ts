export function extractData(dataView: powerbi.DataView | undefined, log: (msg: string) => void): any[] {
  if (!dataView) {
    log("DataView ausente.");
    return [];
  }

  if (dataView.table) {
    log("Tipo detectado: TABLE");
    const columns = dataView.table.columns.map(col => col.displayName);
    return dataView.table.rows.map(row => {
      const obj: { [key: string]: any } = {};
      row.forEach((value, index) => {
        obj[columns[index]] = value;
      });
      return obj;
    });
  }

  if (dataView.categorical) {
    log("Tipo detectado: CATEGORICAL");
    return [];
  }

  if (dataView.matrix) {
    log("Tipo detectado: MATRIX");
    return [];
  }

  log("Tipo de DataView desconhecido.");
  return [];
}
