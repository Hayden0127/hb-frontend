import { Component, OnInit } from '@angular/core';
import {RecentOrderDataTable, BookingList} from '../shared-models/payment/payment-dashboard';
import { CPTransactionStatus, CPProductType } from 'src/app/shared/system-data';
import {PaymentTransactionService} from 'src/app/shared-service/payment/paymenttransaction.service';
import { PricingService } from 'src/app/shared-service/pricing/pricing.service';
import * as ApexCharts from 'apexcharts';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-view-my-booking',
  templateUrl: './view-my-booking.component.html',
  styleUrls: ['./view-my-booking.component.scss']
})
export class ViewMyBookingComponent implements OnInit {

  recentOrderDataTable : RecentOrderDataTable;
  bookingList : BookingList[];
  bookingFilter : BookingList[];
  upcomingBookingList : BookingList[];
  previousBookingList : BookingList[];

  constructor(private pricingService: PricingService) { }

  ngOnInit(): void {
    this.loadAllBooking();
  }

  loadAllBooking() {
    this.pricingService.getAllUserBooking().subscribe(data => {
        console.log(data);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        this.bookingList = data.bookingList;
        this.bookingFilter = this.bookingList;
        this.upcomingBookingList = data.bookingList.filter(booking => {
            const checkInDate = new Date(booking.checkInDate);
            checkInDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0
            return checkInDate >= currentDate;
        });
        this.previousBookingList = data.bookingList.filter(booking => new Date(booking.checkInDate) < currentDate);

    })
}

}
