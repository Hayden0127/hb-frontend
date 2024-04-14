import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { GetstartedComponent } from './getstarted.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Get Started',
      description: '',
      body: 'white',
      hideNav: 'true'
    },
    component: GetstartedComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    TranslateService
  ],
  declarations: [GetstartedComponent]
})
export class GetstartedModule { }
