import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { AuthGuard } from './shared-service/authentication/auth.guard';

export const Approutes: Routes = [
  {
    path: '',
    canActivate : [AuthGuard],
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/viewmybooking', pathMatch: 'full' },
      // {
      //   path: 'overview/onboarding',
      //   loadChildren: () => import('./onboarding/onboarding.module').then(m => m.OnboardingModule)
      // },
     
      {
        path: 'viewmybooking',
        loadChildren: () => import('./view-my-booking/view-my-booking.module').then(m => m.ViewMyBookingModule)
      },
      {
        path: 'roomtypes',
        loadChildren: () => import('./room-types/room-types.module').then(m => m.RoomTypesModule),
      },
      {
        path: 'getstarted',
        loadChildren: () => import('./getstarted/getstarted.module').then(m => m.GetstartedModule)
      },
      {
        path: 'bookaroom',
        loadChildren: () => import('./pricing/pricing.module').then(m => m.PricingModule)
      },
    ]
  },
  {
    path: "",
    component: BlankComponent,
    children: [
      {
        path: 'welcome',
        loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule)
      },
      {
        path: "authentication",
        loadChildren: () =>
          import("./authentication/authentication.module").then(
            (m) => m.AuthenticationModule
          ),
      },
      {
        path: 'aboutus',
        loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule)
      },
      {
        path: 'overview',
        loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule),
      },

      
    ],
  },
  {
    path: '**',
    redirectTo: '/welcome'
  }
];
