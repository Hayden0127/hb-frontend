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
        loadChildren: () => import('./payment/payment.module').then(m => m.PaymentDashboardModule)
      },
    
      {
        path: 'roomtypes',
        loadChildren: () => import('./cpmonitoring/cpmonitoring.module').then(m => m.CpmonitoringModule),
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
      // {
      //   path: 'scheduleinstall',
      //   loadChildren: () => import('./scheduleinstall/scheduleinstall.module').then(m => m.ScheduleinstallModule)
      // },
      
    ],
  },
  {
    path: '**',
    redirectTo: '/welcome'
  }
];
