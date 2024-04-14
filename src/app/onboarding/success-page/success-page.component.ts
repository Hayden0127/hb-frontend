import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.scss'],
})
export class SuccessPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  backToOverview() {
    this.router.navigate(['overview'])
  }
}
