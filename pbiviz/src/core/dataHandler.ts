import powerbi from "powerbi-visuals-api";

export function extractAppliedFilters(filters: powerbi.Filter[]): any[] {
  return filters.map(filter => {
    return {
      filterType: filter.filterType,
      target: filter.target?.column?.displayName,
      operator: filter.operator,
      values: filter.values
    };
  });
}
