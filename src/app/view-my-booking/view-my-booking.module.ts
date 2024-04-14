import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { ViewMyBookingComponent } from './view-my-booking.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NumberFormatter} from '../shared-utilities/numberFormatter/numberFormatter.module';
import { DecimalTimeFormatter} from '../shared-utilities/decimalTimeFormatter/decimalTimeFormatter.module'
import { FeatherModule } from 'angular-feather';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'View My Booking',
      description: ''
    },
    component: ViewMyBookingComponent
  }
];

@NgModule({
  imports: [
    FormsModule, 
    CommonModule, 
    TranslateModule,
    NgbDropdownModule,
    NumberFormatter,
    DecimalTimeFormatter,
    FeatherModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    TranslateService
  ],
  declarations: [
    ViewMyBookingComponent
  ]
})
export class ViewMyBookingModule { }
