import { ResponseModelBase } from "src/app/shared-utilities/response";
import { messageTrigger } from "src/app/shared-utilities/system-data";

export class CPMonitoringDetails {
    public siteName: string | null = null;
    public longitude: number = 0;
    public latitude: number = 0;
    public status: string | null = null;
    public address: string | null = null;
    public maintenanceProgram: string | null = null;
    public totalOrders: number | null = null;
    public completedOrders: number | null = null;
    public incompleteOrders: number | null = null;
    public chargingPointCurrentStatusList: any[] = [];
} 

export class ToDateChargingDetails {
    public cO2ReductionKg: number | null = null;
    public fuelReplacedLitre: number | null = null;
    public chargingSession: number | null = null;
    public chargingSessionPercentage: number | null = null;
    public cpConnectorStatus: CPConnectorStatus[] = [];
    public successTransactionCount: number | null = null;
    public successTransactionPercentage: number | null = null;
    public failedTransactionCount: number | null = null;
    public failedTransactionPercentage: number | null = null;
} 

export class CPConnectorStatus {
    public status: string | null = null;
    public colorCode: string | null = null;
    public count: number | null = null;
    public percentage: number | null = null;
}

export class PowerUtilizationDetails {
    public totalConsumptionKwh: number | null = null;
    public generatedRevenue: number | null = null;
    public estimatedSavings: number | null = null;
    public powerUtilizationChartDetails: PowerUtilizationChartDetails[] = [];
}

export class PowerUtilizationChartDetails {
    public time: string | null = null;
    public kiloWattPerHour: number | null = null;
    public excessPowerPerHour : number | null = null;
}

export class BreakdownErrorDetails{
    public faultAndConnectivityLostCount : number | null = null;
    public resolvedCount : number | null = null;
    public paymentFailedAmount: number | null = null;
    public breakdownErrorList : BreakdownErrorDisplayModel[] = [];
}

export class BreakdownErrorDisplayModel {
    public breakdownErrorId: number | null = null;
    public errorCode: string | null = null;
    public errorDescription: string | null = null;
    public status: string | null = null;
    public severity: string | null = null;
    public workaround: string | null = null;
    public timeOccur: string | null = null;
}

export class CPMonitoringChartDisplayModel extends ResponseModelBase {
    public cpMonitoringDetails: CPMonitoringDetails = new CPMonitoringDetails;
    public toDateChargingDetails: ToDateChargingDetails = new ToDateChargingDetails;
    public powerUtilizationDetails: PowerUtilizationDetails = new PowerUtilizationDetails;
    public breakdownErrorDetails: BreakdownErrorDetails = new BreakdownErrorDetails;
}

export class RemoteStartTransactionRequestModel {
    public connectorId: number | null = null;
    public idTag: string | null = null;
    public chargingProfile: any | null = null;

    clear() {
        this.connectorId = null;
        this.idTag = null;
        this.chargingProfile = null;
    }
}

export class TriggerMessageRequestModel {
    public connectorId: number | null = null;
    public requestedMessage: string | null = null

    clear() {
        this.connectorId = null;
        this.requestedMessage = null;
    }
}

export class ChangeAvailabilityRequestModel {
    public connectorId: number | null = null;
    public type: string | null = null;

    clear() {
        this.connectorId = null;
        this.type = null;
    }
}