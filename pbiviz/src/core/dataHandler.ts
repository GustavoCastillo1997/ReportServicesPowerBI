import powerbi from "powerbi-visuals-api";
import DataView = powerbi.DataView;


export function extractTableData(dataView: DataView): any[] {
  const table = dataView?.table;
  if (!table || !table.rows || !table.columns) return [];

  const columns = table.columns.map(col => col.displayName);
  return table.rows.map(row => {
    const obj: { [key: string]: any } = {};
    row.forEach((value, index) => {
      obj[columns[index]] = value;
    });
    return obj;
  });
}
