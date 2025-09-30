import powerbi from "powerbi-visuals-api";

export function extractAppliedFilters(filters: any[]): any[] {
    return filters.map((filter) => {
        const targetColumn = filter.target?.column?.displayName ?? "Coluna desconhecida...";
        const targetTable = filter.target?.table ?? "Tabela desconhecida...";
        const operator = filter.operator ?? "Operador desconhecido...";
        const values = filter.values ?? [];

        return {
            filterType: filter.filterType ?? "Tipo de Filtro desconhecido...",
            target: {
                table: targetTable,
                column: targetColumn
            },
            operator: operator,
            values: values
        };
    });
}
