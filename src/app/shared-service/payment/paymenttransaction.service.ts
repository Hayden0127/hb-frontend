import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CPTransaction } from 'src/app/shared-models/payment/paymentTransaction';
import { CPTransactionDashboardDisplayModel } from 'src/app/shared-models/payment/payment-dashboard';
import { AuthService } from 'src/app/shared-service/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class PaymentTransactionService {

  getAllCPTransactionListUrl: string;
  getCPPaymentDashboardUrl: string;

  constructor(private http: HttpClient,
        private authService: AuthService) {
    this.getAllCPTransactionListUrl = `${environment.apiURLCPMS}/CpTransaction/GetAllCPTransactionList`;
    this.getCPPaymentDashboardUrl = `${environment.apiURLCPMS}/CpTransaction/GetPaymentDashboardDetails`;
  }

  getAllTransaction() {
    return this.http.get<CPTransaction[]>(this.getAllCPTransactionListUrl).pipe(catchError(this.errorHandling));
  }

  getPaymentDashboard(){
    return this.http.get<CPTransactionDashboardDisplayModel>(`${this.getCPPaymentDashboardUrl}`).pipe(catchError(this.errorHandling));
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
