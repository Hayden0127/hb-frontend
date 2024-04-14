import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { CreateFormService } from 'src/app/shared-service/onboarding/create-form.service';

@Component({
  selector: 'app-site-form',
  templateUrl: './site-form.component.html',
  styleUrls: ['./site-form.component.scss']
})
export class SiteFormComponent implements OnInit {

  mainPageTitle: string = 'On Board New Charge Point';
  currentPageTitle: string;
  viewMode: string;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private createFormService: CreateFormService) {
    this.titleService.setTitle(this.mainPageTitle);
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
    if (this.router.url.includes('new-site')) {
      this.viewMode = 'new-site';
      this.router.navigate(['overview/onboarding/new-site/location'], { queryParams: { view: this.viewMode }, skipLocationChange: true });
    }

    if (this.router.url.includes('letsgo')) {
      this.viewMode = 'letsgo'
      this.router.navigate(['overview/onboarding/letsgo/location'], { queryParams: { view: this.viewMode }, skipLocationChange: true });
    }
  }

  backToOverview() {
    this.createFormService.resetSiteFormData();
    this.router.navigate(['overview'])
  }
}
