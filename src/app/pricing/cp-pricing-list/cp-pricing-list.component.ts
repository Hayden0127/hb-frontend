import { Component, OnInit, QueryList, ViewChildren, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { filter, map, mergeMap } from 'rxjs/operators';
import { CPPricingPlanDetail, CreateUpdatePricingPlanRequest, PagedCPPricingPlanList, SearchCPPricingRequest, Room, SlectedRoom } from 'src/app/shared-models/pricing/pricing';
import { CpMonitoringService } from 'src/app/shared-service/cpmonitoring/cpmonitoring.service';
import { PricingService } from 'src/app/shared-service/pricing/pricing.service';
import { ProductTypeService } from 'src/app/shared-service/product-type/product-type.service';
import { SortEvent, TableSorterComponent } from 'src/app/shared/table-sorter/table-sorter.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Timestamp } from 'rxjs-compat';
import { DatePipe } from '@angular/common';
import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cp-pricing-list',
  templateUrl: './cp-pricing-list.component.html',
  styleUrls: ['./cp-pricing-list.component.scss'],
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
export class CpPricingListComponent implements OnInit {
  title: string;
  description: string;
  cpSiteList: any[];
  productTypeList: any[];
  pricingPlanList: any[];
  isSelected: boolean = false;
  isSearch: boolean = false;
  errorDescription: string;

  searchCPPricingPlanRequest: SearchCPPricingRequest = new SearchCPPricingRequest();
  pagedCPPricingPlanList: PagedCPPricingPlanList = new PagedCPPricingPlanList();

  isEditMode: boolean = false;
  pricingPlanForm: CreateUpdatePricingPlanRequest = new CreateUpdatePricingPlanRequest();
  selectedCP: CPPricingPlanDetail = new CPPricingPlanDetail();
  selectedRoom: SlectedRoom = new SlectedRoom();
  adult: number;
  children: number;
  pageSize = 5;
  page = 1;
  selectedCPStatus: string = 'ALL';
  canSelect: boolean = false;
  checkInDate: NgbDate  | null;
  checkOutDate: NgbDate  | null;
  roomTypesList: any[] = [
    {
      "type":"BUILD PREMIUM",
      "src":"./assets/room/premium.jpg",
      "isSelected": false ,
      "person":"2",
      "size":"200 sqm",
      "bed":"King",
      "price":"1030"
    }, 
    {
      "type":"DELUXE COSY", 
      "src":"./assets/room/cosy.jpg",
      "isSelected": false,
      "person":"2",
      "size":"60 sqm",
      "bed":"Queen/ 2 Singles",
      "price":"520"
   },
    {
      "type":"STANDARD SIMPLE", 
      "src":"./assets/room/simple.jpg",
      "isSelected": false,
      "person":"2",
      "size":"35 sqm",
      "bed":"Queen/ 2 Singles",
      "price":"370"
    }
]

  @ViewChildren(TableSorterComponent) headers: QueryList<TableSorterComponent>=Object.create(null);
  @ViewChild('alertModal') alertModal: NgbModal;

  private notifier: NotifierService;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private cpMonitoringService: CpMonitoringService,
    private productTypeService: ProductTypeService,
    private pricingService: PricingService,
    private modalService: NgbModal,
    notifier: NotifierService,
    public datepipe: DatePipe,
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
        // this.titleService.setTitle('Book Room');
        this.title = event['title'];
        this.description = event['description']
      });
  }

  ngOnInit(): void {
    // this.loadCPSiteList();
    // this.loadProductTypeList();
    // this.loadPricingPlanList();
    // this.loadCPPricingPlanList();
    this.checkInDate = this.getToday();
    this.checkOutDate = this.getTomorrow();
    this.adult = 1;
    this.children = 0;
  }

  loadProductTypeList() {
    this.productTypeService.getAllProductTypes().subscribe(res => {
      this.productTypeList = res;
    })
  }

  loadCPSiteList() {
    this.cpMonitoringService.getAllCPMarker().subscribe(res => {
      this.cpSiteList = res.chargePointMarkerList;
    })
  }

  loadPricingPlanList() {
    this.pricingService.getAllPricingPlan().subscribe(res => {
      this.pricingPlanList = res;
    })
  }

  loadCPPricingPlanList(e: any | null = null) {
    if(e != null) {
      this.page = e.pageNumber;
      this.pageSize = e.pageSize;
    }

    this.searchCPPricingPlanRequest.pageNumber = this.page;
    this.searchCPPricingPlanRequest.pageSize = this.pageSize;  
    this.searchCPPricingPlanRequest.searchCPStatus = this.selectedCPStatus;
    this.pricingService.getAllCPPricingPlanListing(this.searchCPPricingPlanRequest).subscribe(data => {
      this.pagedCPPricingPlanList = data;
    })
  }

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.searchCPPricingPlanRequest.orderBy = direction;
    this.searchCPPricingPlanRequest.orderColumn = direction != '' ? column : '';
    this.loadCPPricingPlanList();
  }

  navToPricingList() {
    this.router.navigate(['/pricing/list']);
  }

  navToAdd() {
    if(this.isSelected){
      this.pricingService.setSelectedRoomData(this.selectedRoom);
      this.router.navigate(['/bookaroom/add']);
    }else{
      this.errorDescription = 'You need to select a room type to continue.';
      this.openErrorModal(this.alertModal);
    }

  }

  editPricingPlan(cpData) {
    this.selectedCP = cpData;
    this.pricingService.getPricingPlanById(cpData.pricingPlanId).subscribe(res => {
      this.pricingPlanForm = res;
    })
    this.isEditMode = true;
  }

  unassignPricingPlan(cpData) {
    this.pricingService.removeCPPricingPlan(cpData.id).subscribe(res => {
      this.notifier.notify('success', `Successfully Unassigned Charge Point (${cpData.cpName}) Pricing Plan`);
      this.isEditMode = false;
      this.loadCPPricingPlanList();
    }, (error) => {
      this.notifier.notify('error', error);
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

  assignPricingPlan(id) {
    this.router.navigate(['/pricing/assign'], { queryParams: { cp : id } });
  }

  closeEditPanel() {
    this.isEditMode = false;
    this.pricingPlanForm = new CreateUpdatePricingPlanRequest();
  }

  filterCPStatus(data) {
    this.selectedCPStatus = data;
    this.loadCPPricingPlanList(); 
  }

  exportCPPricingList() {
    this.pricingService.exportCPPricingPlanList(this.searchCPPricingPlanRequest).subscribe(response => {
      let dataType = response.type;
      let binaryData = [];
      binaryData.push(response);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
      downloadLink.setAttribute('download', `${this.datepipe.transform(new Date, 'yyyyMMddhhmmss')}_ChargePointPricingPlan`);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    })

  }

  
  checkValue(room) {
    this.selectedRoom = room;
    room.isSelected = !room.isSelected;
    this.roomTypesList
    .filter(item => item !== room)
    .forEach(item => item.isSelected = false);
    this.isSelected = this.roomTypesList.some(item => item.isSelected);
    this.selectedRoom.checkInDate = this.ngbDateToString(this.checkInDate);
    this.selectedRoom.checkOutDate = this.ngbDateToString(this.checkOutDate);
    this.selectedRoom.adult = this.adult;
    this.selectedRoom.children = this.children;
  }

  getToday(): NgbDate | null {
    const today = new Date();
    return new NgbDate(today.getFullYear(), today.getMonth() + 1, today.getDate());
  }

  getTomorrow(): NgbDate | null {
    const today = new Date();
  
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const ngbDate = new NgbDate(tomorrow.getFullYear(), tomorrow.getMonth() + 1, tomorrow.getDate());
    return ngbDate;
  }

  ngbDateToString(ngbDate: NgbDate | null): string {
    if (!ngbDate) {
      return ''; // Handle null case if needed
    }
  
    const year = ngbDate.year;
    const month = this.formatTwoDigits(ngbDate.month);
    const day = this.formatTwoDigits(ngbDate.day);
  
    return `${year}-${month}-${day}`;
  }

  formatTwoDigits(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  openErrorModal(targetModal: NgbModal) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'md',
      scrollable: true,
    });
  }

  loadRoomTypes(){
    this.isSearch = true;
    setTimeout(() => {
      this.isSearch= false;
    }, 1000);
  }
}
