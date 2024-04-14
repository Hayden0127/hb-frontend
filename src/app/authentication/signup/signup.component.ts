import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { filter, map, mergeMap } from 'rxjs/operators';
import { RegisterRequest } from 'src/app/shared-models/authentication/signup';
import { AuthService } from 'src/app/shared-service/authentication/authentication.service';
import { regexValidation } from 'src/app/shared-utilities/system-data';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {

  registerRequest = new RegisterRequest;
  isAgree: boolean = false;
  isSelect: boolean = false;
  hide = true;
  isPasswordAndConfirmSame: boolean = true;
  errormsg = null;
  successmsg = null;
  regexValidation = regexValidation;

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

  @ViewChild('alertModal') alertModal: NgbModal;
  @ViewChild('successModal') successModal: NgbModal;
  
  constructor(private translate: TranslateService, private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private service: AuthService,
    private modalService: NgbModal) {
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
        this.titleService.setTitle(event['title']);
      });
    
  }
  
  changeLanguage(lang: any) {
    this.translate.use(lang.code)
    this.selectedLanguage = lang;
  }

  changeConfirmPassword() {
    if (this.registerRequest.password != this.registerRequest.confirmPassword)
      this.isPasswordAndConfirmSame = false;
    else
      this.isPasswordAndConfirmSame = true;
  }

  onRegister(){
    this.service.registerUser(this.registerRequest).subscribe(
      response => {

        if(response.statusCode != "200"){
           if(response.statusCode == "103"){
              this.errormsg = "Email already exist. ";
           }
           else{
            this.errormsg = "An error occur. Please try again";
           }
          // alert("Sign Up Fail");
          // this.errormsg = "Login Fail";
          this.openModal(this.alertModal);
          this.isSelect = false;
          this.isAgree = false;
        }
        else{
          // console.log(response);
          this.successmsg = "Succesfully created an account. Please login to get started.";
          this.openModal(this.successModal);
          this.isSelect = false;
          this.isAgree = false;

          this.router.navigate(['/authentication/login']);
        }
        
      },
      (error: string) => {
        this.errormsg = error;
        if(error == null || error == ''){
          this.errormsg = "Registration Fail. Please try again."
        }
        this.openModal(this.alertModal);
        this.isSelect = false;
        this.isAgree = false;
      })
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
  
  redirectToLogin() {
    this.modalService.dismissAll();
    this.router.navigate(['/authentication/login']);
  }
  
}
