import { Component, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, map, mergeMap } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { AuthService } from 'src/app/shared-service/authentication/authentication.service';
import { LoginRequest } from 'src/app/shared-models/authentication/login';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppCookieService } from 'src/app/shared-service/authentication/cookie.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  loginRequest = new LoginRequest;
  isAgree: boolean = false;
  isSelect: boolean = false;
  errormsg = null;
  hide = true;
  
  public selectedLanguage: any = {
    language: 'English',
    code: 'en',
    type: 'UK',
    icon: 'us'
  }

  public languages: any[] = [{
    language: 'English',
    code: 'en',
    type: 'UK',
    icon: 'us'
  },
  {
    language: 'Chinese',
    code: 'cn',
    type: 'CN',
    icon: 'cn'
  },
  {
    language: 'Malay',
    code: 'my',
    type: 'MY',
    icon: 'my'
  }]


  @ViewChild('loginRequestForm') loginFormData: NgForm;
  @ViewChild('alertModal') alertModal: NgbModal;

  constructor(private translate: TranslateService, private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private authService: AuthService,
    private modalService: NgbModal,
    private cookieService: AppCookieService,) {
      translate.setDefaultLang('en');
      this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .pipe(filter(route => route.outlet === 'primary'))
      .pipe(mergeMap(route => route.data))
      .subscribe(event => {
        this.titleService.setTitle("Login");
      });

      if (this.authService.isLoggedIn()) {
        this.router.navigate(['/home']);
      }
      
    }
  
  changeLanguage(lang: any) {
    this.translate.use(lang.code)
    this.selectedLanguage = lang;
  }

  onSubmit() {
    this.isSelect = false;
    var valid = false;
    // this.isLoading = true;
    if (!this.loginFormData.form.valid) {
      if (this.loginFormData.form.controls['username'].status == 'INVALID') {
        this.loginFormData.form.controls['username'].setErrors({ 'required': true })
        this.loginFormData.form.controls['username'].markAsTouched({ 'onlySelf': true })
      }

      if (this.loginFormData.form.controls['password'].status == 'INVALID') {
        this.loginFormData.form.controls['password'].setErrors({ 'required': true })
        this.loginFormData.form.controls['password'].markAsTouched({ 'onlySelf': true })
      }
      this.isAgree = false;
      this.isSelect = false;
      return this.isAgree, this.isSelect;
    } else {
      valid = true;
    }

    if (valid) {
      this.authService.userLogin(this.loginRequest).subscribe(
        response => {

          if(response.statusCode != "200"){
            
            // alert("Login Fail");
            this.errormsg = "Login Fail";
            this.openModal(this.alertModal);
            this.isSelect = false;
            this.isAgree = false;
          }
          else{


            if (localStorage.getItem('useremail')) {
            var useremail = response.email.toString()
            if (!(localStorage.getItem('useremail') === useremail)) {
              this.errormsg = "Unable to log in two accounts at one time.";
              this.openModal(this.alertModal);
              return;
              }
            }
            this.authService.clearStorage();
            this.cookieService.set('jwtToken', response.accessToken); 
            this.authService.setUser(response);
            // //get user id if needed 
            // this.authService.getUserId();

            this.router.navigate(['/viewmybooking']);
          }
          
        },
        (error: string) => {
          this.errormsg = error;
          if(error == null || error == ''){
            this.errormsg = "Login Fail. Please try again."
          }
          this.openModal(this.alertModal);
          this.isSelect = false;
          this.isAgree = false;
        })
    }
  }

  openModal(targetModal: NgbModal) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'md'
    });
  }

  closeBtnClick() {
    this.modalService.dismissAll();
  }

  redirectScheduleInstall(){
    this.router.navigate(['/scheduleinstall']);
  }

  redirectToSignUp(){
    this.router.navigate(['/authentication/signup']);
  }

  redirectToForgotPassword() {
    this.router.navigate(['/authentication/forgotpassword']);
  }
}
