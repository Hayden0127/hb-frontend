import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleinstallComponent } from './scheduleinstall.component';
import { Routes, RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Schedule Install',
      description: 'Description'
    },
    component: ScheduleinstallComponent
  }
];

@NgModule({
  imports: [
    FormsModule, 
    CommonModule, 
    RouterModule.forChild(routes),
    TranslateModule,
    NgbModule,
    NgbDatepickerModule, 
    NgbAlertModule
  ],
  providers: [
    TranslateService
  ],
  declarations: [
    ScheduleinstallComponent
  ]
})
export class ScheduleinstallModule {

}
