import { PaginationQueryStringParameters, PagerModel } from "../pager-model";
export class PricingPlanDetail {
    public id: number | null = null;
    public planName: string | null = null;
    public productTypeIds: number | null = null;
    public productTypes: string | null = null;
    public unitIds: number | null = null;
    public units: string | null = null;
    public priceVariesId: number | null = null;
    public priceVaries: string | null = null;
    public fixedFee: number | null = null;
    public createdOn: Date | null = null;
    public modifiedOn: Date | null = null;
}
export class SearchPricingRequest extends PaginationQueryStringParameters{
    public searchPlanName: string | null = null;
    public searchFixedFee: number | null = null;
    public searchProductTypeId: number = 0;
    public searchUnitId: number = 0;
}

export class PagedPricingPlanList extends PagerModel{
    public pricingPlanList: PricingPlanDetail[] = [];
}

export class CPPricingPlanDetail {
    public id: number | null = null;
    public cpName: string | null = null;
    public productTypeIds: number[] | null = null;
    public productTypes: string | null = null;
    public cpSiteId: number | null = null;
    public cpSiteName: string | null = null;
    public cpSiteAddress: number | null = null;
    public cpStatus: string | null = null;
    public totalConnector: number | null = null;
    public pricingPlanId: number | null = null;
    public pricingPlanName: string | null = null;
    public createdOn: Date | null = null;
    public modifiedOn: Date | null = null;
    public isOnline: boolean | null = null;
}

export class SearchCPPricingRequest extends PaginationQueryStringParameters{
    public searchCPName: string | null = null;
    public searchProductTypeId: number = 0;
    public searchCPSiteId: number = 0;
    public searchPricingPlanId: number = 0;
    public searchCPStatus: string | null = null;
}

export class PagedCPPricingPlanList extends PagerModel{
    public cpPricingPlanList: CPPricingPlanDetail[] = [];
}

export class CreateUpdatePricingPlanRequest {
    public id: number | null = null;
    public planName: string | null = null;
    public fixedFee: number | null = null;
    public priceVariesId: number | null = null;
    public perBlock: number | null = null;
    public pricingPlanTypeList: PricingPlanTypeDetails[] = [];
}

export class PricingPlanTypeDetails {
    public id: number | null = null;
    public productTypeId: number | null = null;
    public priceRate: number | null = null;
    public unitId: number | null = null;
    public unitName: string | null = null;
    public productTypeName: string | null = null;
}

export class Room{
    public isSelected: boolean | null = null;
    public type: string | null = null;
    public src: string | null = null;
    public person: string | null = null;
    public size: string | null = null;
    public bed: string | null = null;
}

export class SlectedRoom{
    public isSelected: boolean | null = null;
    public type: string | null = null;
    public src: string | null = null;
    public person: string | null = null;
    public size: string | null = null;
    public bed: string | null = null;
    public checkInDate: string | null = null;
    public checkOutDate: string | null = null;
    public adult: number | null = null;
    public children: number | null = null;
    public price: string | null = null;
}

export class GuestDetailsRequest{
    public firstName: string | null = null;
    public lastName: string | null = null;
    public phone: string | null = null;
    public email: string | null = null;
    public address: string | null = null;
}

export class PaymentDetailsRequest{
    public cardNumber: string | null = null;
    public expirationDate: string | null = null;
    public cvv: string | null = null;
    public nameOnCard: string | null = null;
}


export class Transcation{
    public userEmail: string | null = null;
    public type: string | null = null;
    public src: string | null = null;
    public person: string | null = null;
    public checkInDate: string | null = null;
    public checkOutDate: string | null = null;
    public adult: number | null = null;
    public children: number | null = null;
    public price: string | null = null;
}

export class BookingRequestModel{
    public bookingRequests : BookingRequest;
    public guestDetailsRequests: GuestDetailsRequest;
    public paymentDetailsRequests: PaymentDetailsRequest;
}

export class BookingRequest{
    public adult :  number | null = null;
    public children: number | null = null;
    public person: string | null = null;
    public price: string | null = null;
    public size: string | null = null;
    public src: string | null = null;
    public type: string | null = null;
    public bed: string | null = null;
    public checkInDate: string | null = null;
    public checkOutDate: string | null = null;
}


