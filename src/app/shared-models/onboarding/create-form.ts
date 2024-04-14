import { CPConnector, CPDetails, SiteDetails } from "src/app/shared-service/onboarding/create-form.service";
import { ResponseModelBase } from "src/app/shared-utilities/response";

export class Marker{
    public latitude: number = 0;
    public longitude: number = 0;
    public label: string | null =null;
    public draggable: boolean = true;
}

export class GetAllCPSiteListingReturnModel extends ResponseModelBase {
    public cpSiteList: SiteDetails[] = [];
}

export class NewSiteOnBoardingReturnModel extends ResponseModelBase {
    public siteDetails: SiteDetails | null = null;
}

export class NewCPOnBoardingReturnModel extends ResponseModelBase {
    public cpDetails: CPDetails | null = null;
    public cpConnectorList: CPConnector[] = [];
}

export class ValidateNameAndSerialNoReturnModel extends ResponseModelBase {
    public isName: boolean | null = null;
    public isSerialNo: boolean | null = null;
}

