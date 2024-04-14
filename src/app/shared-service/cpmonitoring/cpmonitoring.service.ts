import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ChargePointMarkerListResponseModel } from 'src/app/shared-models/cpmonitoring/chargepoint';
import { environment } from 'src/environments/environment';
import { CPMonitoringChartDisplayModel } from 'src/app/shared-models/cpmonitoring/cpmonitoring-chart';
import { AuthService } from '../authentication/authentication.service';
import { OverviewDashboard } from 'src/app/shared-models/cpmonitoring/overview-dashboard';

@Injectable({
  providedIn: 'root'
})
export class CpMonitoringService {

  getAllChargePoint: string;
  getCPMonitoringChartDetailsUrl: string;
  getDashboardDetailsUrl: string;
  remoteRebootUrl: string;
  remoteStartTransactionUrl: string;
  remoteStopTransactionUrl: string;
  unlockConnectorUrl: string;
  clearCacheUrl: string;
  triggerMessageUrl: string;
  changeAvailabilityUrl: string;

  constructor(private http: HttpClient,
    private authService: AuthService) {
    this.getAllChargePoint = `${environment.apiURLCPMS}/CpMonitoring/GetAllChargePointMarkerByUserAccountId`;
    this.getCPMonitoringChartDetailsUrl = `${environment.apiURLCPMS}/CpMonitoring/GetCPMonitoringChartDetails`;
    this.getDashboardDetailsUrl = `${environment.apiURLCPMS}/CpMonitoring/GetDashboardDetails`;
    this.remoteRebootUrl = `${environment.apiURLCPMS}/CPCore/RemoteReboot`;
    this.remoteStartTransactionUrl = `${environment.apiURLCPMS}/CPCore/RemoteStartTransaction`;
    this.remoteStopTransactionUrl = `${environment.apiURLCPMS}/CPCore/RemoteStopTransaction`;
    this.unlockConnectorUrl = `${environment.apiURLCPMS}/CPCore/UnlockConnector`;
    this.clearCacheUrl = `${environment.apiURLCPMS}/CPCore/ClearCache`;
    this.triggerMessageUrl = `${environment.apiURLCPMS}/CPCore/TriggerMessage`;
    this.changeAvailabilityUrl = `${environment.apiURLCPMS}/CPCore/ChangeAvailability`;
   }

  getAllCPMarker() {
    return this.http.get<ChargePointMarkerListResponseModel>(`${this.getAllChargePoint}`).pipe(catchError(this.errorHandling));
  }

  getCPMonitoringChartDetails(id: number) {
    return this.http.get<CPMonitoringChartDisplayModel>(`${this.getCPMonitoringChartDetailsUrl}/${id}`).pipe(catchError(this.errorHandling));
  }

  getDashboardDetails(days: number) {
    return this.http.get<OverviewDashboard>(`${this.getDashboardDetailsUrl}/${days}`).pipe(catchError(this.errorHandling));
  }

  remoteReboot(type: number){
    return this.http.get<any>(`${this.remoteRebootUrl}/${type}`).pipe(catchError(this.errorHandling));
  }

  remoteStartTransaction(data){
    return this.http.post<any>(`${this.remoteStartTransactionUrl}`, data).pipe(catchError(this.errorHandling));
  }

  remoteStopTransaction(data){
    return this.http.post<any>(`${this.remoteStopTransactionUrl}`, data).pipe(catchError(this.errorHandling));
  }

  unlockConnector(id: number){
    return this.http.get<any>(`${this.unlockConnectorUrl}/${id}`).pipe(catchError(this.errorHandling));
  }

  clearCache(){
    return this.http.get<any>(`${this.clearCacheUrl}`).pipe(catchError(this.errorHandling));
  }

  triggerMessage(data){
    return this.http.post<any>(`${this.triggerMessageUrl}`, data).pipe(catchError(this.errorHandling));
  }

  changeAvailability(data){
    return this.http.post<any>(`${this.changeAvailabilityUrl}`, data).pipe(catchError(this.errorHandling));
  }

  errorHandling(error) {
    let message = 'Oops! Something went wrong.';

    if (error.error instanceof ErrorEvent) {
        // handle client-side errors
        message = `Error!: ${error.error.message}`;    
    }

    return throwError(message);
  }
}
