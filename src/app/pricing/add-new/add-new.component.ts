import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { CreateUpdatePricingPlanRequest, SlectedRoom, GuestDetailsRequest, PaymentDetailsRequest, BookingRequestModel } from 'src/app/shared-models/pricing/pricing';
import { PricingService } from 'src/app/shared-service/pricing/pricing.service';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {

  title: string;
  pricingPlanForm: CreateUpdatePricingPlanRequest = new CreateUpdatePricingPlanRequest();
  selectedRoom: SlectedRoom = new SlectedRoom();
  firstName: string;
  guestDetails : GuestDetailsRequest = new GuestDetailsRequest();
  paymentDetails: PaymentDetailsRequest = new PaymentDetailsRequest();
  successmsg: string;
  errormsg: string;
  bookingRequest: BookingRequestModel = new BookingRequestModel();

  private notifier: NotifierService;

  @ViewChild('successModal') successModal: NgbModal;
  @ViewChild('alertModal') alertModal: NgbModal;
  @ViewChild('planForm') planForm: NgForm;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private pricingService: PricingService,
    private titleService: Title,
    notifier: NotifierService,
    private modalService: NgbModal) { 
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
        // this.titleService.setTitle('View My Booking');
        this.title = event['title'];
      });
    }

  ngOnInit(): void {
    this.selectedRoom = this.pricingService.getSelectedRoomData();
    
    console.log(this.selectedRoom)
  }

  // submitForm(data) {
  //   this.pricingService.createUpdatePricingPlan(data).subscribe(res => {
  //     this.notifier.notify('success', `Successfully Added Pricing Plan - ${res.pricingPlan.planName}`)
  //     setTimeout(() => {this.onBack()}, 1200)
  //   }, (error) => {
  //     this.notifier.notify('error', error)
  //   })
  // }

  onBack() {
    this.router.navigate(['/bookaroom']);
  }

  makePayment(){

    if (this.planForm.valid){
      this.bookingRequest.bookingRequests = this.selectedRoom;
      this.bookingRequest.guestDetailsRequests = this.guestDetails;
      this.bookingRequest.paymentDetailsRequests = this.paymentDetails;
      this.pricingService.roomBooking(this.bookingRequest).subscribe(res => {
        if(res.statusCode != "200"){
          this.errormsg = "An error occur. Please try again";
          this.openModal(this.alertModal);
          }
          else{
            this.successmsg = "Succesfully created a room booking";
            this.openModal(this.successModal);
          }
      })

      // console.log(this.selectedRoom)
      // console.log(this.guestDetails)
      // console.log(this.paymentDetails)
      // console.log(localStorage.getItem('useremail'))
      // console.log(localStorage.getItem('fullName'))


      // this.successmsg = "Succesfully created a room booking.";
      // this.openModal(this.successModal);
    }else{
      this.errormsg = "Please fill in all required fields."
      this.openModal(this.alertModal);
    }
       
  }

  openModal(targetModal: NgbModal) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'md'
    });
  }

  redirectToViewMyBooking(){
    this.modalService.dismissAll();
    this.router.navigate(['/viewmybooking']);
  }

  closeBtnClick() {
    this.modalService.dismissAll();
  }
}
