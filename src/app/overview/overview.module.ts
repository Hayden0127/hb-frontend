import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { FeatherModule } from 'angular-feather';
import { AgmCoreModule } from '@agm/core';
import { CreateFormService } from '../shared-service/onboarding/create-form.service';
import { OverviewComponent } from './overview.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DurationCustomPipe } from '../shared-utilities/durationPipe';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Overview',
    },
    component: OverviewComponent
  }
];

@NgModule({
  imports: [
    FormsModule, 
    CommonModule, 
    RouterModule.forChild(routes),
    TranslateModule,
    FeatherModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAGEA1cPm17Fg_FEabt3ItoF9lm-Ty-yAs',
      libraries: ['places']
    }),
    NgApexchartsModule,
    NgbDropdownModule    
  ],
  exports: [RouterModule],
  providers: [
    TranslateService,
    CreateFormService,  
  ],
  declarations: [
    OverviewComponent,
    DurationCustomPipe
  ]
})
export class OverviewModule {}

