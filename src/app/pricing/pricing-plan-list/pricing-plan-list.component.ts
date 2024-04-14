import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { PricingService } from 'src/app/shared-service/pricing/pricing.service';
import { ProductTypeService } from 'src/app/shared-service/product-type/product-type.service';
import { PricingPlanDetail, SearchPricingRequest, PagedPricingPlanList, CreateUpdatePricingPlanRequest } from 'src/app/shared-models/pricing/pricing';
import { ToastDetail } from 'src/app/shared-models/toast/toast';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SortEvent, TableSorterComponent } from 'src/app/shared/table-sorter/table-sorter.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PriceVaries, StatusCode } from 'src/app/shared/system-data';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing-plan-list.component.html',
  styleUrls: ['./pricing-plan-list.component.scss'],
  animations: [    
    trigger('editContainerTrigger', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(100%)' }),
        animate(250)
      ]),
      transition('* => void', [
        animate(250, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})

export class PricingPlanListComponent implements OnInit {
  @ViewChildren(TableSorterComponent) headers: QueryList<TableSorterComponent>=Object.create(null);
  @ViewChild('deleteToast') toastModal: NgbModal;
  constructor(private pricingService: PricingService,
    private productTypeService: ProductTypeService,
    private modalService: NgbModal,
    notifier: NotifierService,
    private router: Router,
    private titleService: Title,
    private activatedRoute: ActivatedRoute,) { 
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
        this.description = event['description']
      });
    }

  title: string;
  description: string;
  productTypeList: any[];
  unitList: any[];
  priceVariesList: any[];
  pricingPlanList: PricingPlanDetail[] = [];
  pagedPricingPlanList: PagedPricingPlanList = new PagedPricingPlanList();
  searchRequest: SearchPricingRequest = new SearchPricingRequest();
  showToast: boolean = false;
  toastDetail: ToastDetail;
  selectedPlan: PricingPlanDetail;
  pricingPlanForm: CreateUpdatePricingPlanRequest;
  activeModalReference: any;
  isEditMode: boolean = false;
  priceVaries = PriceVaries;
  statusCode = StatusCode;
  pricingPlanDetails : any[] = [];

  page = 1;
  pageSize = 5;
  private notifier: NotifierService;

  ngOnInit(): void {
    this.loadProductTypeList();
    this.loadPriceVariesList();
    this.loadUnitList();
    this.loadPricingPlanList();
  }

  loadProductTypeList() {
    this.productTypeService.getAllProductTypes().subscribe(res => {
      this.productTypeList = res;
    })
  }

  loadPriceVariesList() {
    this.pricingService.getAllPriceVaries().subscribe(res => {
      this.priceVariesList = res;
    })
  }

  loadUnitList() {
    this.pricingService.getAllUnit().subscribe(res => {
      this.unitList = res;
    })
  }

  loadPricingPlanList(e: any | null = null) {
    if (e != null) {
      this.page = e.pageNumber;
      this.pageSize = e.pageSize;
    }

    this.searchRequest.pageNumber = this.page;
    this.searchRequest.pageSize = this.pageSize;
    this.pricingService.getAllPricingPlanListing(this.searchRequest).subscribe(res => {
      this.pagedPricingPlanList = res;
      this.pricingPlanList = res.pricingPlanList;
    })
  }

  showDeleteConfirmation(plan: PricingPlanDetail) {
    this.showToast = true;
    this.selectedPlan = plan;
    this.toastDetail = {
      title: 'Delete',
      titleIcon: 'trash-2',
      message: 'Are you sure want to delete the selected entry?',
      buttonContent: "Yes, I'm Sure",
      success: false
    }

    this.activeModalReference = this.modalService.open(this.toastModal, {
      backdrop: "static",
      keyboard: false,
      animation: false
    })
  }

  onConfirmDeletePricingPlan(data: any) {
    this.showToast = false;
    this.activeModalReference.close();
    this.pricingService.deletePricingPlan(this.selectedPlan.id).subscribe((res) => {
      if(res.Success == true)
      {
        this.notifier.notify('success', `Successfully Delete Pricing Plan - ${this.selectedPlan.planName}`);
        this.loadPricingPlanList();
      }
      else{
        if(res.StatusCode = this.statusCode.Invalid)
        this.notifier.notify('error', `${this.selectedPlan.planName} is currently in use.`);    
      }
      this.selectedPlan = null;
    }, (error) => {
      this.notifier.notify('error', error);
    })
  }

  closeToastAction(data: any) {
    this.showToast = false;
    this.activeModalReference.close();
  }

  editPricingPlan(plan: any) {
    this.selectedPlan = plan;
    this.pricingService.getPricingPlanById(this.selectedPlan.id).subscribe(res => {
      this.pricingPlanForm = res;
      this.isEditMode = true;
    })
  }

  submitForm(event: any){
    if(event != null)
    {
      this.pricingService.createUpdatePricingPlan(event).subscribe((res) => {
        if(res.success == true){
          this.isEditMode = false;
          this.loadPricingPlanList();
          this.notifier.notify('success', `Successfully Update Pricing Plan - ${res.pricingPlan.planName}`); 
        }
      },(error)=>{
        this.notifier.notify('error', error);
      })
    }
  }

  addPricingPlan(){
    this.router.navigate(['pricing/add']);
  }

  onBack(){
    this.router.navigate(['pricing']);
  }

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.searchRequest.orderBy = direction;
    this.searchRequest.orderColumn = column
    this.loadPricingPlanList();
  }

  closeEditPanel($event: any){
    this.isEditMode = false;
    this.selectedPlan = null;
  }
}
