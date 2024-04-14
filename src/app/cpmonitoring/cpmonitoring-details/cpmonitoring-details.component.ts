import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Marker } from 'src/app/shared-models/onboarding/create-form';
import { errorCodeSeverity, errorCodeStatus } from 'src/app/shared-utilities/system-data';
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
  ApexNonAxisChartSeries,
  ApexStroke,
  ApexPlotOptions
} from 'ng-apexcharts';
import { CpMonitoringService } from 'src/app/shared-service/cpmonitoring/cpmonitoring.service';
import { CPMonitoringChartDisplayModel } from 'src/app/shared-models/cpmonitoring/cpmonitoring-chart';
import { markerIconUrl } from 'src/app/shared-utilities/system-data';

@Component({
  selector: 'app-location',
  templateUrl: './cpmonitoring-details.component.html',
  styleUrls: ['./cpmonitoring-details.component.scss']
})
export class CpmonitoringDetailsComponent implements OnInit {

  zoom: number = 18;
  private geoCoder;
  errorCodeStatus = errorCodeStatus;
  errorCodeSeverity = errorCodeSeverity;
  cpDetailsId: number;
  interval: any;
  markerIconUrl = markerIconUrl;

  chartData: CPMonitoringChartDisplayModel = new CPMonitoringChartDisplayModel();
  public powerUtilizationChartOptions: Partial<powerUtilizationChartOptions>;
  @ViewChild("chart") chart: ChartComponent = Object.create(null);

  constructor(private router: Router,
    private route: ActivatedRoute,
    private cpMonitoringService: CpMonitoringService) {

    this.powerUtilizationChartOptions = {
      series: [
        {
          name: 'Excess Power',
          data: this.chartData.powerUtilizationDetails.powerUtilizationChartDetails.map(x => x.excessPowerPerHour)
        },
        {
          name: 'Consumed Power',
          data: this.chartData.powerUtilizationDetails.powerUtilizationChartDetails.map(x => x.kiloWattPerHour)
        }
      ],
      chart: {
        height: 350,
        type: 'area',
        stacked: true,
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
      },
      stroke: {
        curve: 'smooth',
        width: '2',
      },
      fill: {
        type: "solid",
        colors: ['#BFC5D9', '#506194'],
        opacity: 1
      },
      colors: ['#BFC5D9', '#506194'],
      legend: {
        show: false,
      },
      grid: {
        show: false,
        strokeDashArray: 0,
        borderColor: 'rgba(0,0,0,0.1)',
      },
      xaxis: {
        type: 'category',
        categories: this.chartData.powerUtilizationDetails.powerUtilizationChartDetails.map(x => x.time),
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
        theme: 'dark',
        fillColors: ['#BFC5D9', '#506194']
      },
    };
  }

  ngOnInit(): void {
    this.geoCoder = new google.maps.Geocoder();
    this.zoom = 16;
    this.route.queryParams.subscribe((params: any) => {
      this.cpDetailsId = params.id;
      this.getCPMonitoringDetails();
      this.interval = setInterval(() => { this.getCPMonitoringDetails(); }, 60000);
    });
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  getCPMonitoringDetails() {
    this.cpMonitoringService.getCPMonitoringChartDetails(this.cpDetailsId).subscribe(res => {
      this.chartData = res;
      this.loadChart();
    })
  }

  loadChart() {
    this.powerUtilizationChartOptions.series = [
      {
        name: 'Excess Power',
        data: this.chartData.powerUtilizationDetails.powerUtilizationChartDetails.map(x => x.excessPowerPerHour)
      },
      {
        name: 'Consumed Power',
        data: this.chartData.powerUtilizationDetails.powerUtilizationChartDetails.map(x => x.kiloWattPerHour)
      }
    ];

    this.powerUtilizationChartOptions.xaxis = {
      type: 'category',
      categories: this.chartData.powerUtilizationDetails.powerUtilizationChartDetails.map(x => x.time),
      labels: {
        style: {
          colors: '#a1aab2'
        }
      }
    };
  }


  onBack() {
    this.router.navigate(['/cpmonitoring/map'], { skipLocationChange: true });
  }

  mapReady(map: any) {
    map.setOptions({
      styles: [
        {
          featureType: "poi",
          stylers: [{ visibility: "off" }]
        }
      ]
    });
  }
}

export type powerUtilizationChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: any;
  fill: any;
  theme: ApexTheme;
  tooltip: any;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  colors: string[];
  markers: any;
  grid: ApexGrid;
};