import { Component, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, map, mergeMap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})

export class ForgotPasswordComponent {
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
    private modalService: NgbModal,) {
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
        this.titleService.setTitle("Forgot Password");
      });
    }

  recoverform = true;

  changeLanguage(lang: any) {
    this.translate.use(lang.code)
    this.selectedLanguage = lang;
  }

  openModal(targetModal: NgbModal) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'md'
    });
  }

  redirectScheduleInstall(){
    this.router.navigate(['/scheduleinstall']);
  }

  redirectToLogin(){
    this.router.navigate(['/authentication/login']);
  }
}
