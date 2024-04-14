import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError } from 'rxjs';
import { catchError, first, map } from "rxjs/operators";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private authService: AuthService,
    private modalService: NgbModal,
    private jwtHelper: JwtHelperService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    try {
      // var currentUserEmail = localStorage.getItem('useremail')
      // var sessionUserEmail = sessionStorage.getItem('useremail')

      // if((currentUserEmail != sessionUserEmail) || currentUserEmail == null || sessionUserEmail == null ) {
      //   // if(sessionUserEmail == null) {
      //     alert("Login is required.");          
      //     // let id = Number(localStorage.getItem('email'));
      //     let email = localStorage.getItem('useremail');
      //     this.authService.userLogout(email);
      //     localStorage.clear();
      //     sessionStorage.clear();
      //     this.router.navigate(['/authentication/login']);
      //     setTimeout(() => {this.modalService.dismissAll();}, 100)
      //     return;
      //   // }
      // }

      console.log("state.url: "+state.url)
      if (state.url.includes('/overview')) {
        return true;
      }
      
      var userToken = this.authService.getToken();

      if (userToken != "") {
        var expired = this.jwtHelper.isTokenExpired(userToken);
        // this.refreshRequest.AccessToken = userToken;
        // this.refreshRequest.RefreshToken = this.authService.getRefreshToken();
        if (expired == true) {
          console.log("here 1")
          alert("Token expired. Login is required.");          
          // let id = Number(localStorage.getItem('email'));
          let email = localStorage.getItem('useremail');
          this.authService.userLogout(email);
          localStorage.clear();
          sessionStorage.clear();
          // this.router.navigate(['/authentication/login']);
          this.router.navigate(['/welcome']);
          setTimeout(() => {this.modalService.dismissAll();}, 100)
          return;
          // return this.authService.refreshUserToken(this.refreshRequest)
          //   .pipe(
          //     map(
          //       (response: boolean) => {
          //         return true;
          //       }
          //     ),
          //     catchError((error) => {
          //       this.handleError(error)
          //       throw (error)
          //     })
          //   );
        }
        return true;
      }

      if (userToken == "") {
        // alert("Login is required.");          
        // let id = Number(localStorage.getItem('email'));
        let email = localStorage.getItem('useremail');
        this.authService.userLogout(email);
        localStorage.clear();
        sessionStorage.clear();
        // this.router.navigate(['/authentication/login']);
        this.router.navigate(['/welcome']);
        setTimeout(() => {this.modalService.dismissAll();}, 100)
        return;
      }

      return false;
    }
    catch (error) {
      return false;
    }
  }

  canLoad(route: Route): Observable<boolean> | boolean {
    try {
      
      // var currentUserEmail = localStorage.getItem('useremail')
      // var sessionUserEmail = sessionStorage.getItem('useremail')      

      // if(currentUserEmail != sessionUserEmail ) {
      //   if(currentUserEmail == null) {
      //     alert("Login is required.");
      //     // let id = Number(localStorage.getItem('userid'));
      //     let email = localStorage.getItem('useremail');
      //     this.authService.userLogout(email);
      //     localStorage.clear();
      //     sessionStorage.clear();
      //     this.router.navigate(['/authentication/login']);
      //     setTimeout(() => {this.modalService.dismissAll();}, 100)
      //     return;
      //   }
      // }
      // else{
      //   return true;
      // }

      // var token = this.authService.getToken();
      // // var memberToken = this.memberAuthService.getToken();
      
      // if (token != "") {
      //   var expired = this.jwtHelper.isTokenExpired(token);
      //   // this.refreshRequest.AccessToken = token;
      //   // this.refreshRequest.RefreshToken = this.authService.getRefreshToken();
      //   if (expired = true ) {

          //return this.authService.refreshUserToken(this.refreshRequest).pipe(catchError(this.logout));

        //   return this.authService.refreshUserToken(this.refreshRequest)
        //     .pipe(
        //       map(
        //         (response: boolean) => {
        //           return true;
        //         }
        //       ),
        //       catchError((error) => {
        //         this.handleError(error)
        //         throw (error)
        //       })
        //     );
        // }
      //   return true;
      // }

      // if (memberToken != "") {
      //   //TODO: add-in refresh token logic
      //   return true;
      // }

      return false;
    }
    catch (error) {
      return false;
    }
  }

}