import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginRequest, LoginResponse, RefreshTokenRequest, RefreshTokenResponse } from 'src/app/shared-models/authentication/login';
import { RegisterRequest } from 'src/app/shared-models/authentication/signup';
import { AppCookieService } from './cookie.service';
import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUrl: string;
  logoutUrl: string; //dont have link yet
  signUpUrl: string;
  // getCurrentAccDetailsUrl: string;
  // getAccDetailsUrl: string;
  // postRegisterAccUrl: string;
  refreshTokenUrl: string;
  // verifyEmailUrl: string;
  // revokeUrl: string;
  // sendForgetPasswordUrl: string;
  // changePasswordWithVerificationKeyUrl: string;

  constructor(private http: HttpClient,
    private cookieService: AppCookieService,
    private jwtHelper: JwtHelperService

    ) 
    {
    this.loginUrl = `${environment.apiURLCPMS}/UserProfile/UserLogin`;
    this.signUpUrl = `${environment.apiURLCPMS}/UserProfile/UserSignUp`;
    // this.logoutUrl =`${environment.apiURLCPMS}/UserProfile/UserSignUp`;
    }

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    registerUser(data: any) {
      return this.http.post<RegisterRequest>(this.signUpUrl, data, this.httpOptions).pipe(map((data: any) => {
        return data;

      }),
          
        
        catchError((error) => {    // handle error
            let message = '';
            if (error.status == 400) {
              message = error.error;
            }
            return throwError(message);
          })
          
          );
    }

    userLogin(data: LoginRequest) {
      return this.http.post<LoginResponse>(this.loginUrl, data, this.httpOptions)
        .pipe(map((data: any) => {
          //handle api 200 response code here or you wanted to manipulate to response
          return data;
  
        }),
          catchError((error) => {    // handle error
            let message = '';
            if (error.status == 400) {
              message = error.error;
            }
            return throwError(message);
          })
        );
    }

    // userLogout(data: number): Observable<any> {
    userLogout(data: string){
      this.clearStorage();
      // return this.http.get<any>(this.logoutUrl + data.toString()).pipe(
      //   catchError(err => throwError(err))
      // );
    }

    clearStorage() {
      localStorage.clear();
      sessionStorage.clear();
      // this.bookingService.clearDataFormInfoPayment();
      // this.transactionService.clearAmendmentBookingFormData();
      this.cookieService.deleteAllCookies();
    }

    refreshUserToken(data: RefreshTokenRequest) {
      localStorage.setItem('jwtToken', "null");
      return this.http.post<RefreshTokenRequest>(this.refreshTokenUrl, data, this.httpOptions)
        .pipe(
          map((response: any) => {
            localStorage.setItem('jwtToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            return true;
          })
        );
    }

    setUser(response: LoginResponse) {
      localStorage.setItem('useremail', response.email);
      localStorage.setItem('fullName', response.fullName);
      localStorage.setItem('jwtToken', response.accessToken);
      // localStorage.setItem('refreshToken', response.refreshToken);
  
      sessionStorage.setItem('useremail', response.email)
    }

    isLoggedIn() {
      return localStorage.getItem('jwtToken') != null
    }
  
    getToken() {
      return localStorage.getItem('jwtToken') || '';
    }
  
    // getRefreshToken() {
    //   return localStorage.getItem('refreshToken') || '';
    // }

    //decode token to get user id
    public getUserId = (): any => {
      const token = localStorage.getItem('jwtToken');  
      const decodedToken = this.jwtHelper.decodeToken(token as string);
      const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

      // console.log("User Id: " + Id);
      
      return userId;
    };
}
