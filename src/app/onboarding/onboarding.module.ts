import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { FeatherModule } from 'angular-feather';
import { SuccessPageComponent } from './success-page/success-page.component';
import { AgmCoreModule } from '@agm/core';
import { CpFormComponent } from './cp-form/cp-form.component';
import { SiteFormComponent } from './site-form/site-form.component';
import { CreateFormService } from '../shared-service/onboarding/create-form.service';

const routes: Routes = [
  {
    path: 'new-site',
    loadChildren: () => import('./site-form/site-form.module').then(m => m.SiteFormModule)
  },
  {
    path: 'letsgo',
    loadChildren: () => import('./site-form/site-form.module').then(m => m.SiteFormModule)
  },
  {
    path: 'new-cp',
    loadChildren: () => import('./cp-form/cp-form.module').then(m => m.CPFormModule)
  },
  {
    path: 'success',
    component: SuccessPageComponent
  },
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

  ],
  exports: [RouterModule],
  providers: [
    TranslateService,
    CreateFormService,  
  ],
  declarations: [
    SuccessPageComponent, 
    CpFormComponent, 
    SiteFormComponent
  ]
})
export class OnboardingModule {}

