import { Injectable } from "@angular/core";
import { statusCode, validationMessage } from "./system-data";

export class ResponseModelBase {
    public timestamp: string | null = null;
    public success: boolean | null = null;
    public statusCode: number | null = null;
}

@Injectable({
    providedIn: 'root'
})

export class ResponseHandlingService {
    constructor() {}

    errorHandling(errorCode) {
        let keyword = null;
        switch (errorCode) {
          case statusCode.invalid: {
            keyword = validationMessage.invalid
            break;
          }
          case statusCode.notFound: {
            keyword = validationMessage.notFound
            break;
          }
          case statusCode.insufficientCredit: {
            keyword = validationMessage.insufficientCredit
            break;
          }
          case statusCode.exist: {
            keyword = validationMessage.exist
            break;
          }
          case statusCode.loginFail: {
            keyword = validationMessage.loginFail
            break;
          }
        }
        return keyword;
      }
}