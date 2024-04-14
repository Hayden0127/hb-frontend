export class CPTransaction{
    id: number;
    cPDetailsId: number;
    connectorId: number;
    transactionId: number;
    productType: string;
    country: string;
    meterStartValue: number;
    meterStopValue: number;
    totalMeterValue: number;
    startTime: Date;
    endTime: Date;
    totalHoursTaken: number;
    totalAmount: number;
    paymentDate: Date;
    status: string;
    createdOn: Date;
    isActive: Boolean;
}