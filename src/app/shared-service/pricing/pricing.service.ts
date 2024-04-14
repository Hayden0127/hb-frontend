import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SlectedRoom } from 'src/app/shared-models/pricing/pricing';

@Injectable({
  providedIn: 'root'
})

export class PricingService {

  getAllPriceVariesUrl: string;
  getAllUnitUrl: string;
  getAllPricingPlanUrl: string;
  getAllPricingPlanListingUrl: string;
  deletePricingPlanUrl: string;
  getAllCPPricingPlanListingUrl: string;
  createUpdatePricingPlanUrl: string;
  updateCPPricingPlanUrl: string;
  removeCPPricingPlanUrl: string;
  getPricingPlanByIdUrl: string;
  exportCPPricingPlanUrl: string;
  roomBookingUrl: string;
  getUserBookingUrl: string;  
  selectedRoom: SlectedRoom = new SlectedRoom();

  constructor(private http: HttpClient) {
    this.getAllPriceVariesUrl = `${environment.apiURLCPMS}/CPPricing/GetAllPriceVaries`;
    this.getAllUnitUrl = `${environment.apiURLCPMS}/CPPricing/GetAllUnit`;
    this.getAllPricingPlanUrl = `${environment.apiURLCPMS}/CPPricing/GetAllPricingPlan`;
    this.getAllPricingPlanListingUrl = `${environment.apiURLCPMS}/CPPricing/GetAllPricingPlanListingPagination`;
    this.deletePricingPlanUrl = `${environment.apiURLCPMS}/CPPricing/DeletePricingPlan`;
    this.getAllCPPricingPlanListingUrl = `${environment.apiURLCPMS}/CPPricing/GetAllChargePointPricingPagination`;
    this.createUpdatePricingPlanUrl = `${environment.apiURLCPMS}/CPPricing/CreateUpdatePricingPlan`;
    this.updateCPPricingPlanUrl = `${environment.apiURLCPMS}/CPPricing/UpdateCPPricing`;
    this.removeCPPricingPlanUrl = `${environment.apiURLCPMS}/CPPricing/RemoveCPPricing`;
    this.getPricingPlanByIdUrl = `${environment.apiURLCPMS}/CPPricing/GetPricingPlanById`; 
    this.exportCPPricingPlanUrl = `${environment.apiURLCPMS}/CPPricing/GenerateChargePointPricingCSV`; 

    this.roomBookingUrl =`${environment.apiURLCPMS}/Booking/RoomBooking`; 
    this.getUserBookingUrl = `${environment.apiURLCPMS}/Booking/GetAllBookingByUser`; 
  }

  getAllPriceVaries() {
    return this.http.get<any[]>(this.getAllPriceVariesUrl).pipe(catchError(this.errorHandling));
  }

  getAllUnit() {
    return this.http.get<any[]>(this.getAllUnitUrl).pipe(catchError(this.errorHandling));
  }

  getAllPricingPlan() {
    return this.http.get<any[]>(this.getAllPricingPlanUrl).pipe(catchError(this.errorHandling));
  }

  getAllPricingPlanListing(data: any) {
    return this.http.post<any>(this.getAllPricingPlanListingUrl, data).pipe(catchError(this.errorHandling));
  }

  deletePricingPlan(id: number) {
    return this.http.delete<any>(`${this.deletePricingPlanUrl}/${id}`).pipe(catchError(this.errorHandling));
  }  

  getAllCPPricingPlanListing(data: any) {
    return this.http.post<any>(this.getAllCPPricingPlanListingUrl, data).pipe(catchError(this.errorHandling));
  }

  createUpdatePricingPlan(data) {
    return this.http.post<any>(this.createUpdatePricingPlanUrl, data).pipe(catchError(this.errorHandling));
  }

  updateCPPricingPlan(data) {
    return this.http.post<any>(this.updateCPPricingPlanUrl, data).pipe(catchError(this.errorHandling));
  }

  removeCPPricingPlan(id) {
    return this.http.get<any>(`${this.removeCPPricingPlanUrl}/${id}`).pipe(catchError(this.errorHandling));
  }

  getPricingPlanById(id) {
    return this.http.get<any>(`${this.getPricingPlanByIdUrl}/${id}`).pipe(catchError(this.errorHandling));
  }

  exportCPPricingPlanList(data) {
    return this.http.post<any>(this.exportCPPricingPlanUrl, data, {responseType: 'blob' as 'json'}).pipe(catchError(this.errorHandling));
  }

  setSelectedRoomData(data){
    this.selectedRoom = data;
  }

  getSelectedRoomData(){
    return this.selectedRoom;
  }

  roomBooking(data) {
    return this.http.post<any>(this.roomBookingUrl, data).pipe(catchError(this.errorHandling));
  }

  getAllUserBooking() {
    return this.http.get<any>(this.getUserBookingUrl).pipe(catchError(this.errorHandling));
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
