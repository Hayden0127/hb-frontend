import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
// import { chartPointStatusChartOptions } from '../cpmonitoring/cpmonitoring-chart/cpmonitoring-chart.component';
import { OverviewDashboard } from '../shared-models/cpmonitoring/overview-dashboard';
import { CpMonitoringService } from '../shared-service/cpmonitoring/cpmonitoring.service';
import { cpStatus, cpTransactionStatus } from '../shared-utilities/system-data';

export type ChartOptions = {
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
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  labels: string[];
};


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  // public chartPointStatusChartOptions: Partial<chartPointStatusChartOptions>;
  public areaChartOptions: Partial<ChartOptions>;

  filterDays: number = 0;
  dashboardDisplay: OverviewDashboard = new OverviewDashboard;
  siteSummaryDisplay = {
    open: 0,
    maintenance: 0,
    notBoarded: 0
  }

  selectedProductType: string = 'All Charger';
  chargerSummaryDisplay = {
    open: 0,
    inUse: 0,
    outOfService: 0
  }
  cpStatus = cpStatus;
  cpTransactionStatus = cpTransactionStatus;
  selectedDayFilter: string = 'Today';

  interval: any;

  data = [
    {
      percentage: 40,
      place: 'Kuala Lumpur',
      colorCode: '#0AD1E8'
    },
    {
      percentage: 40,
      place: 'Selangor',
      colorCode: '#BB6BD9'
    },
    {
      percentage: 10,
      place: 'Seremban',
      colorCode: '#8893B3'
    }, {
      percentage: 10,
      place: 'Others',
      colorCode: '#D9D9D9'
    }
  ]

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private cpMonitoringService: CpMonitoringService
  ) {
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
      });

    // this.chartPointStatusChartOptions = {
    //   series: this.data.map(x => x.percentage),
    //   chart: {
    //     type: 'donut',
    //     height: 140
    //   },
    //   plotOptions: {
    //     pie: {
    //       donut: {
    //         size: '80px'
    //       }
    //     }
    //   },
    //   tooltip: {
    //     fillSeriesColor: false,
    //   },
    //   dataLabels: {
    //     enabled: false,
    //   },
    //   stroke: {
    //     width: 0,
    //   },
    //   legends: {
    //     show: false,
    //   },
    //   labels: this.data.map(x => x.place),
    //   colors: this.data.map(x => x.colorCode),
    // };

    //Area chart.
    this.areaChartOptions = {
      series: [
        {
          name: 'Site A',
          data: [0, 300, 100, 200, 1200, 100, 500, 100]
        }
      ],
      chart: {
        fontFamily: 'Montserrat,sans-serif',
        height: 300,
        type: 'area',
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 3,
      },
      stroke: {
        curve: 'smooth',
        width: '2',
      },
      colors: ['#398bf7'],
      legend: {
        show: false,
      },
      grid: {
        show: true,
        strokeDashArray: 0,
        borderColor: 'rgba(0,0,0,0.1)',
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      xaxis: {
        type: 'category',
        categories: [
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep'
        ],
        labels: {
          style: {
            colors: '#a1aab2'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#a1aab2'
          }
        }
      },
      tooltip: {
        theme: 'dark'
      }
    };
  }

  ngOnInit(): void {
    this.loadDashboardDetails();
    this.interval = setInterval(() => { this.loadDashboardDetails() }, 60000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadDashboardDetails() {
    this.cpMonitoringService.getDashboardDetails(this.filterDays).subscribe(data => {
      this.dashboardDisplay = data;
      this.siteSummaryDisplay.open = this.dashboardDisplay.siteList.filter(x => x.status == 'Open').length;
      this.siteSummaryDisplay.maintenance = this.dashboardDisplay.siteList.filter(x => x.status == 'Maintenance').length;
      this.siteSummaryDisplay.notBoarded = this.dashboardDisplay.siteList.filter(x => x.status == 'Unavailable').length;

      this.chargerSummaryDisplay.open = this.dashboardDisplay.chargerList.filter(x => x.status == cpStatus.available).length;
      this.chargerSummaryDisplay.inUse = this.dashboardDisplay.chargerList.filter(x => x.status == cpStatus.preparing || x.status == cpStatus.charging || x.status == cpStatus.finishing).length;
      this.chargerSummaryDisplay.outOfService = this.dashboardDisplay.chargerList.filter(x => x.status == cpStatus.unavailable || x.status == cpStatus.faulted || x.status == cpStatus.suspendedEVSE || x.status == cpStatus.suspendedEV).length;
    })
  }

  setFilterDays(day) {
    this.selectedDayFilter = day;

    switch (day) {
      case 'Today':
        this.filterDays = 0;
        break;
      case 'Yesterday':
        this.filterDays = 1;
        break;
      case 'Past 7 days':
        this.filterDays = 7;
        break;
    }

    this.loadDashboardDetails();
  }

  newCPForm() {
    this.router.navigate(['overview/onboarding/new-cp'])
  }

  newSiteForm() {
    this.router.navigate(['overview/onboarding/new-site'])
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
