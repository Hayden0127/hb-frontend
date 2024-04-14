import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { CPConnector, CreateFormService, OnBoardingCPForm, SiteDetails } from 'src/app/shared-service/onboarding/create-form.service';
import { OnBoardingService } from 'src/app/shared-service/onboarding/onboarding.service';
import { ProductTypeService } from 'src/app/shared-service/product-type/product-type.service';
import { ResponseHandlingService } from 'src/app/shared-utilities/response';

@Component({
  selector: 'app-connector',
  templateUrl: './connector.component.html',
  styleUrls: ['./connector.component.scss']
})
export class ConnectorComponent implements OnInit {
  cpConnectorForm: OnBoardingCPForm = new OnBoardingCPForm;
  cpSiteList: SiteDetails[] = [];
  productTypeList: any[] = [];

  @ViewChild('connectorForm') connectorForm: NgForm;
  @ViewChild('tableForm') tableForm: NgForm;

  private notifier;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private onBoardingService: OnBoardingService,
    private createFormService: CreateFormService,
    private responseService: ResponseHandlingService,
    private productTypeService: ProductTypeService,
    notifier: NotifierService) {
    this.notifier = notifier;
  }

  ngOnInit(): void {
    this.cpConnectorForm = this.createFormService.getCPFormData();
    if (this.cpConnectorForm.cpConnectorList.length == 0) this.add()

    this.onBoardingService.getAllCPSiteListing().subscribe(data => {
      this.cpSiteList = data.cpSiteList;
    })

    this.productTypeService.getAllProductTypes().subscribe(data => {
      this.productTypeList = data;
    })
  }

  next() {
    const isEmpty = this.cpConnectorForm.cpConnectorList.some(x => x.name == '' || x.name == null || x.productTypeId == null);
    if (isEmpty) {
      for (var i in this.tableForm.controls) this.tableForm.controls[i].markAllAsTouched();
    }

    if (!this.connectorForm.invalid && !isEmpty) {
      this.cpConnectorForm.siteDetails = this.cpSiteList.find(x => x.id == this.cpConnectorForm.cpDetails.cpSiteDetailsId);
      this.onBoardingService.validateCPNameAndSerialNo(this.cpConnectorForm.cpDetails).subscribe(data => {
        switch (data.success) {
          case true: {
            this.createFormService.setCPFormData(this.cpConnectorForm)
            this.router.navigate([`overview/onboarding/new-cp/review`], { skipLocationChange: true });
            break;
          }
          case false: {
            if(data.isName) {
              this.connectorForm.controls['cpName'].setErrors({ 'exist': true })
            }

            if(data.isSerialNo) {
              this.connectorForm.controls['serialNo'].setErrors({ 'exist': true })
            }
            var keyword = this.responseService.errorHandling(data.statusCode);
            let message = 'Oops! Something went wrong.'
            if (keyword != null) {
              message = `Charging Point Name/ Serial No ${keyword}`
            }
            this.notifier.notify('error', message)
            break;
          }
        }
      }, (error) => {
        this.notifier.notify('error', error)
      })
    }
  }

  add() {
    const newRow = new CPConnector;
    this.cpConnectorForm.cpConnectorList.push(newRow);
  }

  remove(i) {
    this.cpConnectorForm.cpConnectorList.splice(i, 1);
  }

  setCPProductType(i, val) {
    this.cpConnectorForm.cpConnectorList[i].productType = this.productTypeList.find(x => x.id == val).name;
  }
}
