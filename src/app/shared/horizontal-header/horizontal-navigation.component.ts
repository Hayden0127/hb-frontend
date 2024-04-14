import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbPanelChangeEvent, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared-service/authentication/authentication.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-horizontal-navigation',
  templateUrl: './horizontal-navigation.component.html'
})
export class HorizontalNavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};

  public showSearch = false;

  public isCollapsed = false;
  public showMobileMenu = false;

  today: Date;

  notifications: Object[] = [
    {
      btn: 'btn-danger',
      icon: 'ti-link',
      title: 'Luanch Admin',
      subject: 'Just see the my new admin!',
      time: '9:30 AM'
    },
    {
      btn: 'btn-success',
      icon: 'ti-calendar',
      title: 'Event today',
      subject: 'Just a reminder that you have event',
      time: '9:10 AM'
    },
    {
      btn: 'btn-info',
      icon: 'ti-settings',
      title: 'Settings',
      subject: 'You can customize this template as you want',
      time: '9:08 AM'
    },
    {
      btn: 'btn-primary',
      icon: 'ti-user',
      title: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  public selectedLanguage: any = {
    language: 'English',
    code: 'en',
    type: 'MY',
    icon: 'us'
  }

  public languages: any[] = [{
    language: 'English',
    code: 'en',
    type: 'MY',
    icon: 'us'
  },
  {
    language: 'Chinese',
    code: 'cn',
    icon: 'cn'
  },
  {
    language: 'Malay',
    code: 'my',
    icon: 'my'
  }]

  currentUserName: string = localStorage.getItem('fullName');
  currentUserEmail: string = localStorage.getItem('useremail');

  constructor(private modalService: NgbModal, 
    private translate: TranslateService, private authService: AuthService, private router: Router) {

    translate.setDefaultLang('en');
    setInterval(() => {
      this.today = new Date();
    }, 1);  
  }

  ngAfterViewInit() { }

  changeLanguage(lang: any) {
    this.translate.use(lang.code)
    this.selectedLanguage = lang;
  }

  logOut(){
    this.authService.userLogout("");
    this.router.navigate(['/welcome']);
  }
}
