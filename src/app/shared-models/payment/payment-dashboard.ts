import {
    ApexAxisChartSeries,
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexYAxis,
    ApexLegend,
    ApexXAxis,
    ApexTooltip,
    ApexTheme,
    ApexGrid,
    ApexPlotOptions
  } from 'ng-apexcharts';

export type totalTransactionLineGraphOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    stroke: any;
    theme: ApexTheme;
    tooltip: ApexTooltip;
    dataLabels: ApexDataLabels;
    legend: ApexLegend;
    colors: string[];
    markers: any;
    grid: ApexGrid;
};

export class RecentOrderDataTable{
  lastUpdate: string;
  orderList: BookingList[] = []
};

export class CPTransactionDashboardDisplayModel{
  // transactionList: CPTransactionListModel[] = [];
  transactionChart: CPTransactionChartDisplayModel;
}

export class BookingList{
  id: number;
  userEmail: string;
  adult: number;
  children: number;
  price: string;
  type: string;
  checkInDate: string;
  checkOutDate: string;
  bookingId: number;
  src: string;
}

export class CPTransactionChartDisplayModel{
  totalOrderAmount: number = 0;
  totalOrderDiff: number = 0;
  totalOrderAmountList: MonthlyAmountDisplayModel[] = [];
  paymentSucceedAmount: number = 0;
  paymentSucceedDiff: number = 0;
  paymentSucceedAmountList: MonthlyAmountDisplayModel[] = [];
  paymentFailedAmount: number = 0;
  paymentFailedDiff: number = 0;
  paymentFailedAmountList: MonthlyAmountDisplayModel[] = [];
}

export class MonthlyAmountDisplayModel{
  month: number;
  amount: number;
}