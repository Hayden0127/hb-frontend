import { Component, OnInit, ViewChildren, ViewChild } from '@angular/core';
import { SlectedRoom } from 'src/app/shared-models/pricing/pricing';
import { DatePipe } from '@angular/common';
import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { PricingService } from 'src/app/shared-service/pricing/pricing.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit {
  isSelected: boolean = false;
  isSearch: boolean = false;
  errorDescription: string;
  selectedRoom: SlectedRoom = new SlectedRoom();
  adult: number;
  children: number;
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


  @ViewChild('alertModal') alertModal: NgbModal;
  private notifier: NotifierService;

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    private pricingService: PricingService,
    private modalService: NgbModal,
    notifier: NotifierService,
    public datepipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.checkInDate = this.getToday();
    this.checkOutDate = this.getTomorrow();
    this.adult = 1;
    this.children = 0;
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

  navToRoomTypes() {
    this.router.navigate(['/roomtypes']);
  }

}
