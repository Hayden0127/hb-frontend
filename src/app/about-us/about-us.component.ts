import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirectSignUp() {
    this.router.navigate(['authentication/signup'])
  }
  
  redirectLogin() {
    this.router.navigate(['authentication/login'])
  }

  redirectWelcome(){
    this.router.navigate(['welcome'])
  }
}
