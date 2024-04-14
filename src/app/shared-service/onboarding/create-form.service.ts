import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class Location {
    public longitude: number | null = null;
    public latitude: number | null = null;
    public address: string | null = null;  
    public country: string | null = null;
    public city: string | null = null;  
    public state: string | null = null;
}

export class SiteProfile {
    public personInCharge: string | null = null;
    public siteName: string | null = null;
    public email: string | null = null;
    public officeNo: string | null = null;
    public mobileNo: string | null = null;
    public loadLimit: number | null = null;
}

export class MaintenanceProgram {
    public maintenanceProgram: string | null = null;
    public description: string | null = null;
}

export class SiteDetails {
    public id: number = 0;
    public personInCharge: string | null = null;
    public siteName: string | null = null;
    public email: string | null = null;
    public officeNo: string | null = null;
    public mobileNo: string | null = null;
    public maintenanceProgram: string | null = null;
    public description: string | null = null;
    public longitude: number | null = null;
    public latitude: number | null = null;
    public address: string | null = null;  
    public country: string | null = null;
    public city: string | null = null;
    public state: string | null = null;
    public loadLimit: number | null = null;
}

export class OnBoardingSiteForm {
    public userAccountId: number | null = null;
    public siteDetails: SiteDetails = new SiteDetails;
}

export class CPDetails {
    public cpSiteDetailsId: number | null = null;
    public name: string | null = null;    
    public serialNo: string | null = null;   
}

export class CPConnector {
    public name: string | null = null;  
    public productType: string | null = null;  
    public productTypeId: number | null = null;
    public powerOutput: number | null = null;  
}

export class OnBoardingCPForm {
    public siteDetails: SiteDetails = new SiteDetails;
    public cpDetails: CPDetails = new CPDetails;
    public cpConnectorList: CPConnector[] = [];
}

export class CreateFormService {

    siteFormData: OnBoardingSiteForm = new OnBoardingSiteForm;
    cpFormData: OnBoardingCPForm = new OnBoardingCPForm;

    constructor() {
    }

    setLocationData(data: Location) {
        this.siteFormData.siteDetails.longitude = data.longitude;
        this.siteFormData.siteDetails.latitude = data.latitude;
        this.siteFormData.siteDetails.address = data.address;
        this.siteFormData.siteDetails.country = data.country;
        this.siteFormData.siteDetails.city = data.city;
        this.siteFormData.siteDetails.state = data.state;
    }

    getLocationData() {
        const returnForm: Location = {
            longitude: this.siteFormData.siteDetails.longitude,
            latitude: this.siteFormData.siteDetails.latitude,
            address: this.siteFormData.siteDetails.address, 
            country: this.siteFormData.siteDetails.country,
            city: this.siteFormData.siteDetails.city,
            state: this.siteFormData.siteDetails.state
        }
        return returnForm;
    }

    setSiteProfileData(data: SiteProfile) {
        this.siteFormData.siteDetails.personInCharge = data.personInCharge;
        this.siteFormData.siteDetails.siteName = data.siteName;
        this.siteFormData.siteDetails.email = data.email;
        this.siteFormData.siteDetails.officeNo = data.officeNo; 
        this.siteFormData.siteDetails.mobileNo = data.mobileNo;
        this.siteFormData.siteDetails.loadLimit = data.loadLimit;
    }

    getSiteProfileData() {
        const returnForm: SiteProfile = {
            personInCharge: this.siteFormData.siteDetails.personInCharge,
            siteName: this.siteFormData.siteDetails.siteName,
            email: this.siteFormData.siteDetails.email, 
            officeNo: this.siteFormData.siteDetails.officeNo,
            mobileNo: this.siteFormData.siteDetails.mobileNo,
            loadLimit: this.siteFormData.siteDetails.loadLimit
        }
        return returnForm;
    }

    setMaintenanceProgramData(data: MaintenanceProgram) {
        this.siteFormData.siteDetails.maintenanceProgram = data.maintenanceProgram;
        this.siteFormData.siteDetails.description = data.description;
    }

    getMaintenanceProgramData() {
        const returnForm: MaintenanceProgram = {
            maintenanceProgram: this.siteFormData.siteDetails.maintenanceProgram,
            description: this.siteFormData.siteDetails.description,
        }
        return returnForm;
    }

    getSiteFormData() {
        return this.siteFormData;
    }

    resetSiteFormData() {
        this.siteFormData = new OnBoardingSiteForm;
    }

    setCPFormData(data: OnBoardingCPForm) {
        this.cpFormData = data
    }

    getCPFormData() {
        return this.cpFormData;
    }

    resetCPFormData() {
        this.cpFormData = new OnBoardingCPForm;
    }
}