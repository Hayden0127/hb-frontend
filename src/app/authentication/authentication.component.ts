import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html'
})
export class AuthenticationComponent implements OnInit {

  mainPageTitle: string = '';
  currentPageTitle: string;
  viewMode: string;

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

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private translate: TranslateService) {
    translate.setDefaultLang('en');
    this.titleService.setTitle("Authentication");
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
        this.currentPageTitle = event['title']
      });
  }

  ngOnInit(): void {
    // this.router.navigate(['/authentication/login']);
  }

  redirectScheduleInstall(){
    this.router.navigate(['/scheduleinstall']);
  }

  changeLanguage(lang: any) {
    this.translate.use(lang.code)
    this.selectedLanguage = lang;
  }

  onActivate($event){}
}
