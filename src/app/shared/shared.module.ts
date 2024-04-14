import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationFooterComponent } from './pagination-footer/pagination-footer.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule } from 'angular-feather';
import { ToastComponent } from './toast/toast.component';
import { TableSorterComponent } from './table-sorter/table-sorter.component';


@NgModule({
  declarations: [
    PaginationFooterComponent,
    ToastComponent,
    TableSorterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    FeatherModule
  ],
  exports: [
    PaginationFooterComponent,
    ToastComponent,
    TableSorterComponent
  ]
})
export class SharedModule { }
