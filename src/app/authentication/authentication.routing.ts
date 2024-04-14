import { Routes } from '@angular/router';

import { NotfoundComponent } from './404/not-found.component';
import { LockComponent } from './lock/lock.component';
import { LoginComponent } from './login/login.component';
import { Login2Component } from './login2/login2.component';
import { SignupComponent } from './signup/signup.component';
import { Signup2Component } from './signup2/signup2.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthenticationComponent } from './authentication.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      {
        path: '404',
        component: NotfoundComponent
      },
      {
        path: 'lock',
        component: LockComponent
      },
      {
        path: 'login',
        data: {
          title: 'Login',
          description: ''
        },
        component: LoginComponent
      },
      {
        path: 'login2',
        component: Login2Component
      },
      {
        path: 'signup',
        data: {
          title: 'Signup',
          description: ''
        },
        component: SignupComponent
      },
      {
        path: 'signup2',
        component: Signup2Component
      },
      {
        path: 'forgotpassword',
        data: {
          title: 'Forgot Password',
          description: ''
        },
        component: ForgotPasswordComponent
      }
    ]
  }
];
