import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgApexchartsModule } from "ng-apexcharts";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PricingPlanListComponent } from './pricing-plan-list/pricing-plan-list.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NumberFormatter} from '../shared-utilities/numberFormatter/numberFormatter.module';
import { DecimalTimeFormatter} from '../shared-utilities/decimalTimeFormatter/decimalTimeFormatter.module'
import { FeatherModule } from 'angular-feather';
import { CpPricingListComponent } from './cp-pricing-list/cp-pricing-list.component';
import { SharedModule } from '../shared/shared.module';
import { PricingPlanFormComponent } from './pricing-plan-form/pricing-plan-form.component';
import { AddNewComponent } from './add-new/add-new.component';
import { NotifierModule } from 'angular-notifier';
import { AssignPlanComponent } from './cp-pricing-list/assign-plan/assign-plan.component';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Pricing',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus dolor non consectetur rutrum. Donec non tempor lacus, ac varius augue.'
    },
    component: CpPricingListComponent,
  },
  {
    path: 'list',
    data: {
      title: 'Pricing Plan List',
      description: '',
      body: 'white'
    },
    component: PricingPlanListComponent
  },
  {
    path: 'add',
    data: {
      title: 'Add New Pricing Plan',
      description: '',
      body: 'white'
    },
    component: AddNewComponent
  },
  {
    path: 'assign',
    data: {
      title: 'Choose Pricing Plan',
      description: '',
      body: 'white'
    },
    component: AssignPlanComponent
  },
];

@NgModule({
    providers: [
        TranslateService,
        DatePipe
    ],
    declarations: [
        PricingPlanListComponent,
        CpPricingListComponent,
        PricingPlanFormComponent,
        AddNewComponent,
        AssignPlanComponent,
    ],
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild(routes),
        TranslateModule,
        NgApexchartsModule,
        NgbDropdownModule,
        NumberFormatter,
        DecimalTimeFormatter,
        FeatherModule,
        NgbModule,
        SharedModule,
        NotifierModule,
        NgbDatepickerModule
    ]
})
export class PricingModule {}
