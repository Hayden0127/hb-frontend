import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FeatherModule } from 'angular-feather';
import { LocationComponent } from '../site-form/location/location.component';
import { DetailsComponent } from '../site-form/details/details.component';
import { ProgramComponent } from '../site-form/program/program.component';
import { ReviewComponent } from '../cp-form/review/review.component';
import { AgmCoreModule } from '@agm/core';
import { CreateFormService } from 'src/app/shared-service/onboarding/create-form.service';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { ConnectorComponent } from '../cp-form/connector/connector.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CpFormComponent } from './cp-form.component';

const routes: Routes = [
  {
    path: '',    
    component: CpFormComponent,
    children: [        
        {
            path: 'connector',
            data: {
                title: 'Connector',
            },
            component: ConnectorComponent
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
    ConnectorComponent,
    ReviewComponent
  ]
})
export class CPFormModule {}
