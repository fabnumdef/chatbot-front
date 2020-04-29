import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationHelper } from '@model/pagination-helper.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() pagination: PaginationHelper;
  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  pagesToShow() {
    const pagesToShow = [
      this.pagination.currentPage - 2,
      this.pagination.currentPage - 1,
      this.pagination.currentPage,
      this.pagination.currentPage + 1,
      this.pagination.currentPage + 2
    ];
    return pagesToShow.filter(n => n > 0 && n <= this.pagination.totalPages);
  }

  onChangePage(pageNumber: number) {
    if (pageNumber === this.pagination.currentPage || pageNumber < 1 || pageNumber > this.pagination.totalPages) {
      return;
    }
    this.changePage.next(pageNumber);
  }

}
