import { PaginatedResult } from '@model/paginated-result.model';

export class PaginationHelper {

  currentPage: number = null;

  totalPages: number;

  totalElements: number;

  itemCount: number;

  last: boolean;

  constructor(public size = 20) {

  }

  public onLoaded(response: PaginatedResult<any>) {
    this.currentPage = parseInt(response.meta.currentPage.toString(10), 10);
    this.totalPages = response.meta.totalPages;
    this.totalElements = response.meta.totalItems;
    this.size = response.meta.itemsPerPage;
    this.itemCount = response.meta.itemCount;
    this.last = this.currentPage >= this.totalPages;
  }

  get nextPage() {
    if (this.last) {
      return this.currentPage;
    }
    this.currentPage = this.currentPage !== null ? this.currentPage + 1 : 1;
    return this.currentPage;
  }

  resetPage(pageNumber = 1) {
    this.currentPage = pageNumber;
  }

}
