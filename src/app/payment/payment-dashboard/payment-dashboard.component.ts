import { Component, OnInit} from '@angular/core';
import {RecentOrderDataTable, totalTransactionLineGraphOptions, CPTransactionChartDisplayModel, BookingList} from '../../shared-models/payment/payment-dashboard';
import { CPTransactionStatus, CPProductType } from 'src/app/shared/system-data';
import {PaymentTransactionService} from 'src/app/shared-service/payment/paymenttransaction.service';
import { PricingService } from 'src/app/shared-service/pricing/pricing.service';
import * as ApexCharts from 'apexcharts';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment-dashboard.component.html',
  styleUrls: ['./payment-dashboard.component.scss']
})

export class PaymentDashboardComponent implements OnInit {
    public totalTransactionChartOptions: Partial<totalTransactionLineGraphOptions>;
    
    recentOrderDataTable : RecentOrderDataTable;
    bookingList : BookingList[];
    bookingFilter : BookingList[];
    upcomingBookingList : BookingList[];
    previousBookingList : BookingList[];
    // paymentChartData : CPTransactionChartDisplayModel;

    totalAmountChartSeries : number[];
    totalPaidAmountChartSeries : number[];
    totalRejectAmountChartSeries : number[];

    subtitle: string;
    pageInfo: any;

    _searchTerm = '';
    dropdownDisplayProductType = "All Product";
    dropdownDisplayStatus = "All Status";

    chart: any;
    cpTransactionStatus = CPTransactionStatus;
    cpProductType = CPProductType;

    months= ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    translatedMonth: string[];
    series1= "Total Ordered";
    series2= "Payment Succeed";
    series3= "Payment Failed";

    constructor(private paymentTransactionService: PaymentTransactionService,
        private pricingService: PricingService
    ) {
        this.recentOrderDataTable = new RecentOrderDataTable();
        // this.paymentChartData = new CPTransactionChartDisplayModel();
        // this.totalAmountChartSeries = new Array(12).fill(0, 0, 12);
        // this.totalPaidAmountChartSeries = new Array(12).fill(0, 0, 12);
        // this.totalRejectAmountChartSeries = new Array(12).fill(0, 0, 12);
        // this.translatedMonth = this.months.slice();
    }

    ngOnInit(): void {
        this.loadAllBooking();
    }

    get searchTerm(): string {
        return this._searchTerm;
    }

    // set searchTerm(val: string) {
    //     this._searchTerm = val;
    //     this.paymentTransactionFilter = this.filter(val);
    // }

    // filter(v: string) {
    //     return this.paymentTransactionList.filter(x => (x.transactionId).toString().indexOf(v.toLowerCase()) !== -1);
    // }

    // filterByStatus(status: string) {
    //     this.paymentTransactionFilter = this.paymentTransactionList;

    //     if(status === this.cpTransactionStatus.Complete){
    //         this.dropdownDisplayProductType = "All Product";
    //         this.dropdownDisplayStatus = "Started";
    //     }
    //     else if(status === this.cpTransactionStatus.Complete){
    //         this.dropdownDisplayProductType = "All Product";
    //         this.dropdownDisplayStatus = "Complete";
    //     }
    //     else if(status === this.cpTransactionStatus.Rejected){
    //         this.dropdownDisplayProductType = "All Product";
    //         this.dropdownDisplayStatus = "Rejected";
    //     }

    //     if (status === "0")
    //       return this.paymentTransactionFilter;
    //     else {
    //       this.paymentTransactionFilter = this.paymentTransactionList.filter(trans => trans.status === status);
    //       return this.paymentTransactionFilter;
    //     }
    
    // }

    // filterByProductType(type: string){
    //     this.paymentTransactionFilter = this.paymentTransactionList;

    //     if(type === this.cpProductType.Ac){
    //         this.dropdownDisplayStatus = "All Status";
    //         this.dropdownDisplayProductType = "AC";
    //     }
    //     else if(type === this.cpProductType.Dc){
    //         this.dropdownDisplayStatus = "All Status";
    //         this.dropdownDisplayProductType = "DC";
    //     }
    //     else if(type === this.cpProductType.AcDc){
    //         this.dropdownDisplayStatus = "All Status";
    //         this.dropdownDisplayProductType = "AC/DC";
    //     }
            
    //     if (type === "0"){
    //         this.dropdownDisplayProductType = "All Product";
    //         return this.paymentTransactionFilter;
    //     }
    //     else {
    //       this.paymentTransactionFilter = this.paymentTransactionList.filter(trans => trans.productType === type);
    //       return this.paymentTransactionFilter;
    //     }
    // }

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
            console.log(currentDate)
            console.log(this.upcomingBookingList)
            console.log(this.previousBookingList)

         

            // this.paymentChartData = data.transactionChart;

            // this.paymentChartData.totalOrderAmountList.forEach(function (value) {
            //     this.totalAmountChartSeries[value.month - 1] = value.amount;
            // }, this);

            // this.paymentChartData.paymentSucceedAmountList.forEach(function (value) {
            //     this.totalPaidAmountChartSeries[value.month - 1] = value.amount;
            // },this);

            // this.paymentChartData.paymentFailedAmountList.forEach(function (value) {
            //     this.totalRejectAmountChartSeries[value.month - 1] = value.amount;
            // },this);

            // this.chart.render();
        })
    }
}
