export class ChargePointMarkerModel{
  public id: number | null = null;
  public siteName: string | null = null;
  public longitude: number = 0;
  public latitude: number = 0;
  public address: string  | null = null;
  public maintenanceProgram: string | null = null;
  public status: string | null = null;
  public isClicked: boolean | null = null;
  public online: boolean | null = null;
}

export class ChargePointMarkerListResponseModel{
  public chargePointMarkerList: ChargePointMarkerModel[] = [];
  public timestamp: string | null = null;
  public success: boolean = false;
  public statusCode: number | null = null;
}

  

