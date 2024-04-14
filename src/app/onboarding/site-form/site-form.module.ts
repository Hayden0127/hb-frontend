import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FeatherModule } from 'angular-feather';
import { LocationComponent } from './location/location.component';
import { DetailsComponent } from './details/details.component';
import { ProgramComponent } from './program/program.component';
import { ReviewComponent } from './review/review.component';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { CreateFormService } from 'src/app/shared-service/onboarding/create-form.service';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SiteFormComponent } from './site-form.component';

const routes: Routes = [
  {
    path: '',    
    component: SiteFormComponent,
    children: [
        {
            path: 'location',
            data: {
                title: 'Location',
            },
            component: LocationComponent
        },
        {
            path: 'details',
            data: {
                title: 'Details',
            },
            component: DetailsComponent
        },
        {
            path: 'program',
            data: {
                title: 'Program',
            },
            component: ProgramComponent
        },
        {
            path: 'review',
            data: {
                title: 'Review',
            },
            component: ReviewComponent
        },
      ]
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
    NotifierModule,
    NgbModule,
  ],
  providers: [
    TranslateService,
    CreateFormService,
    NotifierService
  ],
  declarations: [  
    LocationComponent, 
    DetailsComponent, 
    ProgramComponent, 
    ReviewComponent, 
  ]
})
export class SiteFormModule {}
