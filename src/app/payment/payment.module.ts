import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgApexchartsModule } from "ng-apexcharts";

import { PaymentDashboardComponent } from './payment-dashboard/payment-dashboard.component';
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
      title: 'Payment Dashboard',
      description: 'Description'
    },
    component: PaymentDashboardComponent
  }
];

@NgModule({
  imports: [
    FormsModule, 
    CommonModule, 
    RouterModule.forChild(routes),
    TranslateModule,
    NgApexchartsModule,
    NgbDropdownModule,
    NumberFormatter,
    DecimalTimeFormatter,
    FeatherModule
  ],
  providers: [
    TranslateService
  ],
  declarations: [PaymentDashboardComponent]
})
export class PaymentDashboardModule {}
