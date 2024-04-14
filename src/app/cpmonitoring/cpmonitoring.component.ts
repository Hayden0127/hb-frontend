import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-cpmonitoring',
  templateUrl: './cpmonitoring.component.html',
  styleUrls: ['./cpmonitoring.component.scss']
})

export class CpmonitoringComponent implements OnInit {
  mainPageTitle: string = 'On Board New Charge Point';
  currentPageTitle: string;
  viewMode: string
  title: string = "Visualisation of Charging Point (CP) Monitoring";
  description: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus dolor non consectetur rutrum. Donec non tempor lacus, ac varius augue.";
  
  pageInfo: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {
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
        this.currentPageTitle = event['title'];
        // this.titleService.setTitle('Room Types');
        this.pageInfo = event;        
      });
  }

  ngOnInit(): void {
  }

  navToBook(){
    this.router.navigate(['/bookaroom']);
  }

}

