import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RefreshTokenRequest } from 'src/app/shared-models/authentication/login';
import { AuthService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  private refreshRequest = new RefreshTokenRequest;

  constructor(
    private inject: Injector,
    private authService: AuthService,
    private jwtHelper: JwtHelperService,
    private modalService: NgbModal,
    private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var currentUserId = localStorage.getItem('userid')
    var sessionUserId = sessionStorage.getItem('userid')

    // if(currentUserId != sessionUserId) {
    //   if(currentUserId != null && sessionUserId != null) {
    //     alert("Session User has changed. Will navigate to the active user account.");
    //     sessionStorage.clear();
    //     this.modalService.dismissAll();
    //     this.router.navigate(['/home']);
    //     setTimeout(() => {window.location.reload(); sessionStorage.setItem('userid', currentUserId);}, 1000)        
    //     return;
    //   }

    //   if(currentUserId == null) {
    //     alert("Login is required.");
    //     let id = localStorage.getItem('userid');
    //     this.authService.userLogout(id);
    //     localStorage.clear();
    //     sessionStorage.clear(); 
    //     this.router.navigate(['/authentication/login']);
    //     setTimeout(() => {this.modalService.dismissAll();}, 100)
    //     return;
    //   }
    // }
    let authservice = this.inject.get(AuthService);
    let jwtToken = authservice.getToken();
    const newReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`
      }
    });

    // if((jwtToken == null || jwtToken == '') && !this.router.url.includes('login')) {
    //   alert("Login is required.");
    //   let id = localStorage.getItem('userid');
    //   this.authService.userLogout(id);
    //   localStorage.clear();
    //   sessionStorage.clear(); 
    //   this.router.navigate(['/authentication/login']);
    //   setTimeout(() => {this.modalService.dismissAll();}, 100)
    //   return;
    // }

    return next.handle(newReq).pipe(
      tap(() => { },
        (e: any) => {
          if (e instanceof HttpErrorResponse) {
            if (e.status == 401) {
              alert("Login is required.");
              let id =localStorage.getItem('userid');
              this.authService.userLogout(id);
              localStorage.clear();
              sessionStorage.clear();              
              this.router.navigate(['/authentication/login']);
              setTimeout(() => {this.modalService.dismissAll();}, 100)
            }
          }
          return e;
        }
      )
    );    
  }
}
