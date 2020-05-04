import { PaginationFilter } from '@model/pagination-filter.model';

export class FilterHelper {
  static clearFilters(filters: PaginationFilter[]) {
    if (!filters) {
      return null;
    }
    return filters.filter(f => {
      return !!f.attribute && !!f.operator && (!!f.value || (!!f.values && f.values.length > 0));
    });
  }

  static setFilterValues(filters: PaginationFilter[], values: {}): PaginationFilter[] {
    filters.map(f => {
      f.value = null;
      f.values = null;
    });
    // tslint:disable-next-line:forin
    for (const attribute in values) {
      const value = values[attribute];
      const filter = filters.find(f => f.attribute === attribute);
      if (!filter || !value || (Array.isArray(value) && value.length < 1)) {
        continue;
      }
      if (Array.isArray(value)) {
        filter.values = value;
      } else {
        filter.value = value;
      }
    }
    return filters;
  }
}
