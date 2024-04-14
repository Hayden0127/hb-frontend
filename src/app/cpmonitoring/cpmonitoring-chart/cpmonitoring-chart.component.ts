import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexGrid, ApexLegend, ApexNonAxisChartSeries, ApexPlotOptions, ApexStroke, ApexTheme, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { ChargePointMarkerModel } from 'src/app/shared-models/cpmonitoring/chargepoint';
import { CPMonitoringChartDisplayModel, ChangeAvailabilityRequestModel, RemoteStartTransactionRequestModel, TriggerMessageRequestModel } from 'src/app/shared-models/cpmonitoring/cpmonitoring-chart';
import { availabilityType, errorCodeSeverity, errorCodeStatus, messageTrigger } from 'src/app/shared-utilities/system-data';
import { CpMonitoringService } from 'src/app/shared-service/cpmonitoring/cpmonitoring.service';
import { markerIconUrl, cpStatus, resetType } from 'src/app/shared-utilities/system-data';
import { NotifierService } from 'angular-notifier';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface chartPointStatusChartOptions {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  legends: ApexLegend;
  labels: any;
  name: any;
  tooltip: ApexTooltip;
  colors: string[];
  plotOptions: ApexPlotOptions
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

@Component({
  selector: 'app-cpmonitoring-chart',
  templateUrl: './cpmonitoring-chart.component.html',
  styleUrls: ['./cpmonitoring-chart.component.scss']
})

export class CpmonitoringChartComponent implements OnInit {

  zoom: number = 18;
  marker: ChargePointMarkerModel = new ChargePointMarkerModel();
  public Math = Math;
  errorCodeSeverity = errorCodeSeverity;
  errorCodeStatus = errorCodeStatus;
  cpDetailsId: number;
  chartData: CPMonitoringChartDisplayModel = new CPMonitoringChartDisplayModel();
  interval: any;
  markerIconUrl = markerIconUrl;
  cpStatus = cpStatus;
  resetType = resetType;
  messageTrigger = messageTrigger;
  availabilityType = availabilityType;
  isReboot: boolean = false;
  _tempDisplay: number;
  selectedCP: any = { isOnline: null };

  private notifier: NotifierService;

  @ViewChild('chart') chart2: ChartComponent = Object.create(null);
  public chartPointStatusChartOptions: Partial<chartPointStatusChartOptions>;
  public powerUtilizationChartOptions: Partial<powerUtilizationChartOptions>;

  @ViewChild('formModal') formModal: NgbModal;
  selectedAction: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private cpMonitoringService: CpMonitoringService,
    private modalService: NgbModal,
    notifier: NotifierService) {
    this.notifier = notifier;
    this.chartPointStatusChartOptions = {
      series: this.chartData.toDateChargingDetails.cpConnectorStatus.map(x => x.count),
      chart: {
        type: 'donut',
        height: 140
      },
      plotOptions: {
        pie: {
          donut: {
            size: '80px'
          }
        }
      },
      tooltip: {
        fillSeriesColor: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 0,
      },
      legends: {
        show: false,
      },
      labels: this.chartData.toDateChargingDetails.cpConnectorStatus.map(x => x.status),
      colors: this.chartData.toDateChargingDetails.cpConnectorStatus.map(x => x.colorCode),
    };

    this.powerUtilizationChartOptions = {
      series: [
        {
          name: 'Excess Power',
          data: this.chartData.powerUtilizationDetails.powerUtilizationChartDetails.map(x => x.kiloWattPerHour)
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
          // show: false,
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
    this.route.queryParams.subscribe((params: any) => {
      this.cpDetailsId = params.id;
      this.getChartDetails()
      this.interval = setInterval(() => { this.getChartDetails(); }, 60000);
    });
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  getChartDetails() {
    this.cpMonitoringService.getCPMonitoringChartDetails(this.cpDetailsId).subscribe(res => {
      this.chartData = res;
      this._tempDisplay = res.cpMonitoringDetails.chargingPointCurrentStatusList[0].id;
      this.changeCPView(this._tempDisplay);
      this.chartPointStatusChartOptions.series = this.chartData.toDateChargingDetails.cpConnectorStatus.map(x => x.count);
      this.chartPointStatusChartOptions.labels = this.chartData.toDateChargingDetails.cpConnectorStatus.map(x => x.status);
      this.chartPointStatusChartOptions.colors = this.chartData.toDateChargingDetails.cpConnectorStatus.map(x => x.colorCode);

      //hardcoded
      this.chartData.powerUtilizationDetails.totalConsumptionKwh = 40.12;
      this.chartData.powerUtilizationDetails.generatedRevenue = 64.78;
      this.chartData.powerUtilizationDetails.estimatedSavings = 3.43;
      // this.chartData.toDateChargingDetails.chargingSessionPercentage = 0.25;
      // this.chartData.toDateChargingDetails.chargingSession = 8;
      // this.chartData.toDateChargingDetails.successTransactionCount = 7;
      // this.chartData.toDateChargingDetails.successTransactionPercentage = 0.85;
      // this.chartData.toDateChargingDetails.failedTransactionCount = 1;
      // this.chartData.toDateChargingDetails.successTransactionPercentage = 0.09;
      // this.chartData.toDateChargingDetails.cO2ReductionKg = 3;
      // this.chartData.toDateChargingDetails.fuelReplacedLitre = 257;
      this.powerUtilizationChartOptions.series =
        [
          {
            name: 'Excess Power',
            data: [100, 80, 100, 90, 50, 100, 30, 0, 100, 87, 60, 33]
          },
          {
            name: 'Consumed Power',
            data: [0, 20, 0, 30, 50, 0, 60, 100, 0, 22, 30, 67]
          }
        ];
      this.powerUtilizationChartOptions.xaxis = {
        type: 'category',
        categories: ['1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM'],
        labels: {
          style: {
            colors: '#a1aab2'
          }
        }
      }

      // this.powerUtilizationChartOptions.series =
      //   [
      //     {
      //       name: 'Excess Power',
      //       data: this.chartData.powerUtilizationDetails.powerUtilizationChartDetails.map(x => x.excessPowerPerHour)
      //     },
      //     {
      //       name: 'Consumed Power',
      //       data: this.chartData.powerUtilizationDetails.powerUtilizationChartDetails.map(x => x.kiloWattPerHour)
      //     }
      //   ];
      // this.powerUtilizationChartOptions.xaxis = {
      //   type: 'category',
      //   categories: this.chartData.powerUtilizationDetails.powerUtilizationChartDetails.map(x => x.time),
      //   labels: {
      //     style: {
      //       colors: '#a1aab2'
      //     }
      //   }
      // }
    })
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

  remoteReboot() {
    this.isReboot = true;
    var type = resetType.Soft;
    this.cpMonitoringService.remoteReboot(type).subscribe(res => {
      setTimeout(() => {
        this.isReboot = false;
        this.notifier.notify('success', `The charging point is successfully rebooted.`);
      }, 3000)
    })
  }

  onBack() {
    this.router.navigate(['cpmonitoring/map']);
  }

  changeCPView(data) {
    this.selectedCP = this.chartData.cpMonitoringDetails.chargingPointCurrentStatusList.find(x => x.id == data);
  }

  remoteStartForm: RemoteStartTransactionRequestModel = new RemoteStartTransactionRequestModel();
  triggerMessageForm: TriggerMessageRequestModel = new TriggerMessageRequestModel();
  changeAvailabilityForm: ChangeAvailabilityRequestModel = new ChangeAvailabilityRequestModel();
  connectorId: number = null;
  resetTypeId: number = 0;
  requestMessage: string = messageTrigger.statusNotification;
  btnText: string = "Select"
  connectorIdList: number[];

  openActionFormModal(data, e: any) {
    this.btnText = e.target.innerHTML;

    var count = Number(this.selectedCP.totalConnectors);
    this.connectorIdList = Array(count).fill(2).map((x, i) => i)
    this.selectedAction = data;
    this.remoteStartForm.clear();
    this.triggerMessageForm.clear();
    this.changeAvailabilityForm.clear();
    this.connectorId = null;
    this.resetTypeId = 0;
    this.modalService.open(this.formModal, { size: "md", backdrop: 'static', centered: true })
  }

  onAction(data, e: any | null = null) {
    if (e != null) this.btnText = e.target.innerHTML;

    switch(data) {
      case "ClearCache": {
        this.cpMonitoringService.clearCache().subscribe(res => {
          console.log(res)
        })
        this.btnText = "Select"
        break;
      }
      case "RemoteStartTransaction": {
        this.cpMonitoringService.remoteStartTransaction(this.remoteStartForm).subscribe(res => {
          console.log(res)
        })
        this.btnText = "Select"
        break;
      }
      case "RemoteStopTransaction": {
        const data = {
          connectorId: this.connectorId,
          cpId: this.cpDetailsId
        }
        this.cpMonitoringService.remoteStopTransaction(data).subscribe(res => {
          console.log(res)
        })
        this.btnText = "Select"
        break;
      }
      case "Reset": {
        this.cpMonitoringService.remoteReboot(this.resetTypeId).subscribe(res => {
          console.log(res)
        })
        this.btnText = "Select"
        break;
      }
      case "UnlockConnector": {
        this.cpMonitoringService.unlockConnector(this.connectorId).subscribe(res => {
          console.log(res)
        })
        this.btnText = "Select"
        break;
      }
      case "TriggerMessage": {
        this.cpMonitoringService.triggerMessage(this.triggerMessageForm).subscribe(res => {
          console.log(res)
        })
        this.btnText = "Select"
        break;
      }
      case "ChangeAvailability": {
        this.cpMonitoringService.changeAvailability(this.changeAvailabilityForm).subscribe(res => {
          console.log(res)
        })
        this.btnText = "Select"
        break;
      }
    }

    this.modalService.dismissAll();    
  }
}
