import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { filter, map, mergeMap } from 'rxjs/operators';
import { PricingService } from 'src/app/shared-service/pricing/pricing.service';

@Component({
  selector: 'app-assign-plan',
  templateUrl: './assign-plan.component.html',
  styleUrls: ['./assign-plan.component.scss']
})
export class AssignPlanComponent implements OnInit {

  title: string;
  cpId: number;
  pricingPlanList: any[] = [];
  responseModal: any;
  clicked: boolean = false;

  @ViewChild('successResponseModal') successResponseModal: NgbModal;

  private notifier: NotifierService;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private pricingService: PricingService,
    private modalService: NgbModal,
    notifier: NotifierService
  ) {
      this.notifier = notifier;
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
        // this.titleService.setTitle(event['title']);
        this.title = event['title'];
      });
  }

  ngOnInit(): void {
    this.loadPricingPlanList();
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.cpId = Number(params['cp']);
    })
  }

  assignPlan(plan) {
    this.clicked = true;
    const formData = {
      cpDetailsId: this.cpId,
      pricingPlanId: plan.id
    }
    this.pricingService.updateCPPricingPlan(formData).subscribe(res => {
      this.responseModal = res;
      this.responseModal.pricingPlan = plan;
      setTimeout(() => { 
        this.clicked = false;      
        this.modalService.open(this.successResponseModal, { centered: true })
        this.onBack() 
      }, 1000)
    }, (error) => {
      this.clicked = false;
      this.notifier.notify('error', error)
    })
  }

  onBack() {
    this.router.navigate(['pricing'])
  }

  loadPricingPlanList() {
    this.pricingService.getAllPricingPlan().subscribe(res => {
      this.pricingPlanList = res;
    })
  }

}
