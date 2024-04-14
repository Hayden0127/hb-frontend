import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { GetAllCPSiteListingReturnModel, NewCPOnBoardingReturnModel, NewSiteOnBoardingReturnModel, ValidateNameAndSerialNoReturnModel } from "src/app/shared-models/onboarding/create-form";
import { ResponseModelBase } from "src/app/shared-utilities/response";
import { environment } from "src/environments/environment";
import { AuthService } from "../authentication/authentication.service";

@Injectable({
    providedIn: 'root'
})

export class OnBoardingService {

    getAllCPSiteListingUrl: string;
    createNewSiteOnBoardingUrl: string;
    validateCPNameUrl: string;
    createNewCPOnBoardingUrl: string;

    constructor(private http: HttpClient,
        private authService: AuthService) {
        this.getAllCPSiteListingUrl = `${environment.apiURLCPMS}/OnBoarding/GetAllCPSiteListingByUserAccountId`
        this.createNewSiteOnBoardingUrl = `${environment.apiURLCPMS}/OnBoarding/CreateNewSiteOnBoarding`
        this.validateCPNameUrl = `${environment.apiURLCPMS}/OnBoarding/ValidateCPNameAndSerialNo`
        this.createNewCPOnBoardingUrl = `${environment.apiURLCPMS}/OnBoarding/CreateNewCPOnBoarding`
    }

    getAllCPSiteListing() {
        return this.http.get<GetAllCPSiteListingReturnModel>(`${this.getAllCPSiteListingUrl}`).pipe(catchError(this.errorHandling))
    }

    createNewSiteOnBoarding(data) {
        return this.http.post<NewSiteOnBoardingReturnModel>(this.createNewSiteOnBoardingUrl, data).pipe(catchError(this.errorHandling))
    }

    validateCPNameAndSerialNo(data) {
        return this.http.post<ValidateNameAndSerialNoReturnModel>(this.validateCPNameUrl, data).pipe(catchError(this.errorHandling))
    }

    createNewCPOnBoarding(data) {
        return this.http.post<NewCPOnBoardingReturnModel>(this.createNewCPOnBoardingUrl, data).pipe(catchError(this.errorHandling))
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