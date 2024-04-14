import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { RoomTypesComponent } from './room-types.component';
import { FeatherModule } from 'angular-feather';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: RoomTypesComponent,
   
  }
  
];

@NgModule({
 
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    FeatherModule,
    NotifierModule,
    NgbDropdownModule
  ],
  providers: [
    NotifierService
  ],
  declarations: [
    RoomTypesComponent
  ],
})
export class RoomTypesModule { }
