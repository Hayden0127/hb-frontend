import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

export class PaginationParams {
  pageNumber: number;
  pageSize: number;
}

@Component({
  selector: 'app-pagination-footer',
  templateUrl: './pagination-footer.component.html',
  styleUrls: ['./pagination-footer.component.scss']
})
export class PaginationFooterComponent implements OnInit {

  @Input() pageSize: number = 5;
  @Input() hasPrevious: boolean = false;
  @Input() hasNext: boolean = false;
  @Input() currentPage: number = 1;
  @Input() totalCount: number = 1;
  @Output() changed: EventEmitter<PaginationParams> = new EventEmitter<PaginationParams>();

  constructor() { }

  ngOnInit(): void {
  }

  onPrev() {
    this.currentPage -= 1;
    this.sendEvent();
  }

  onNext() {
    this.currentPage += 1;
    this.sendEvent();
  }

  sendEvent() {
    const data: PaginationParams = {
      pageNumber: this.currentPage,
      pageSize: this.pageSize
    }

    this.changed.emit(data);
  }
}
