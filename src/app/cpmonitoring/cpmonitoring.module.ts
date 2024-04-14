import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { CpmonitoringComponent } from './cpmonitoring.component';
import { CpmonitoringMapComponent } from './cpmonitoring-map/cpmonitoring-map.component';
import { CpmonitoringDetailsComponent } from './cpmonitoring-details/cpmonitoring-details.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { NgApexchartsModule } from "ng-apexcharts";
import { CpmonitoringChartComponent } from './cpmonitoring-chart/cpmonitoring-chart.component';
import { FeatherModule } from 'angular-feather';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
  {
    path: '',
    component: CpmonitoringComponent,
    // children:[
    //   {
    //     path: 'map',
    //     data: {
    //         title: 'Map',
    //     },
    //     component: CpmonitoringMapComponent
    //   },
    //   {
    //     path: 'chart',
    //     data: {
    //         title: 'Chart',
    //         body: 'white'
    //     },
    //     component: CpmonitoringChartComponent
    //   },
    //   {
    //     path: '**',
    //     redirectTo: '/cpmonitoring/map',        
    //   }
    // ]
     
  }
  
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAGEA1cPm17Fg_FEabt3ItoF9lm-Ty-yAs',
      libraries: ['places']
    }),
    NgApexchartsModule,
    FeatherModule,
    NotifierModule,
    NgbDropdownModule
  ],
  providers: [
    TranslateService,
    NotifierService
  ],
  declarations: [
    CpmonitoringComponent,
    CpmonitoringMapComponent,
    CpmonitoringDetailsComponent,
    CpmonitoringChartComponent
  ]
})
export class CpmonitoringModule { }
