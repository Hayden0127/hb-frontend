import { ResponseModelBase } from "src/app/shared-utilities/response";

export class OverviewDashboard extends ResponseModelBase  {
    public chargerList: ChargerDisplayDetails[] = [];
    public historyList: HistroyDisplayDetails[] = [];
    public siteList: SiteDisplayDetails[] = [];
    public currentMonthSummaryList: CurrentMonthSummary = new CurrentMonthSummary;
}

export class SiteDisplayDetails {
    public income: number | null = null;
    public siteId: number | null = null;
    public siteLocation: string | null = null;
    public siteName: string | null = null;
    public stationType: string | null = null;
    public status: string | null = null;
    public totalCharger: number | null = null;
}

export class ChargerDisplayDetails {
    public totalCharging: number | null = null;
    public status: string | null = null;
    public siteName: string | null = null;
    public productType: string | null = null;
    public powerOutput: number | null = null;
    public cpConnectorName: string | null = null;
    public cpConnectorId: number | null = null;
    public chargingTime: string | null = null;
    public chargingPointSerialNumber: string | null = null;
    public averagePowerPercentage: number | null = null;
    public averageChargeSpeed: number | null = null;
}

export class HistroyDisplayDetails {
    public dateTime: Date | null = null;
    public event: string | null = null;
    public cpConnectorName: string | null = null;
    public productType: string | null = null;
    public chargingPointSerialNumber: string | null = null;
    public siteName: string | null = null;
    public status: string | null = null;
}

export class CurrentMonthSummary{
    public totalEnergy: number | null = null;
    public hourUtilisation: number | null = null;
    public activeCharging: number | null = null;
    public transaction: number | null = null;
    public transactionPercentage: number | null = null;
    public totalNumberOfTransaction: number | null = null;
    public totalNumberOfTransactionPercentage: number | null = null;
}