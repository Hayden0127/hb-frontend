import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) { this.router.events
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

  ngOnInit(): void {
  }

  redirectSignUp() {
    this.router.navigate(['authentication/signup']);
  }
  
  redirectLogin() {
    this.router.navigate(['authentication/login'])
  }

  redirectWelcome(){
    this.router.navigate(['welcome'])
  }
}
