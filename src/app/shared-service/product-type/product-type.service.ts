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

export class ProductTypeService {

  getAllProductTypesUrl: string;

  constructor(private http: HttpClient,
        private authService: AuthService) {
    this.getAllProductTypesUrl = `${environment.apiURLCPMS}/ProductType/GetAllProductType`;
  }

  getAllProductTypes() {
    return this.http.get<any[]>(this.getAllProductTypesUrl).pipe(catchError(this.errorHandling));
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
