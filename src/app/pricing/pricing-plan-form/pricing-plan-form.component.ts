import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateUpdatePricingPlanRequest, PricingPlanTypeDetails } from 'src/app/shared-models/pricing/pricing';
import { PricingService } from 'src/app/shared-service/pricing/pricing.service';
import { ProductTypeService } from 'src/app/shared-service/product-type/product-type.service';

@Component({
  selector: 'app-pricing-plan-form',
  templateUrl: './pricing-plan-form.component.html',
  styleUrls: ['./pricing-plan-form.component.scss']
})
export class PricingPlanFormComponent implements OnInit {

  @Input() formMode: string;
  @Input() pricingPlanForm: CreateUpdatePricingPlanRequest = new CreateUpdatePricingPlanRequest();
  @Output() submitFormValue = new EventEmitter();
  @Output() unassignPlan = new EventEmitter();
  @Output() closeForm = new EventEmitter();

  listView: boolean = true;
  formView: boolean = false;
  productTypeList: any[];
  unitList: any[];
  priceVariesList: any[];
  displayProductTypeList: any[] = [];
  _tempPricingPlanTypeForm: PricingPlanTypeDetails = new PricingPlanTypeDetails();

  constructor(private pricingService: PricingService,
    private productTypeService: ProductTypeService,) { }

  ngOnInit(): void {
    this.loadProductTypeList();
    this.loadPriceVariesList();
    this.loadUnitList();
  }

  addNew() {
    this.listView = false;
    this.formView = true;
    this.checkPriceVaries();
    if(this.pricingPlanForm.pricingPlanTypeList.length > 0 && this.formMode == 'editForm')
    {
      this.displayProductTypeList = this.productTypeList.filter(x => !this.pricingPlanForm.pricingPlanTypeList.some(y => y.productTypeId.toString() === x.id.toString()));
    }
  }

  checkForm() {
    if(this._tempPricingPlanTypeForm.priceRate != null || this._tempPricingPlanTypeForm.productTypeId != null || this._tempPricingPlanTypeForm.unitId != null) {
      // return modal
      console.log('test')
    }
    else {
      this.backToList();
    }
  }

  backToList() {
    this.listView = true;
    this.formView = false;
    this._tempPricingPlanTypeForm = new PricingPlanTypeDetails;
    this.displayProductTypeList = this.productTypeList.filter(x => !this.pricingPlanForm.pricingPlanTypeList.some(y => y.productTypeId.toString() === x.id.toString()));
  }

  removeRecord(i) {
    this.pricingPlanForm.pricingPlanTypeList.splice(i, 1);
    this.displayProductTypeList = this.productTypeList.filter(x => !this.pricingPlanForm.pricingPlanTypeList.some(y => y.productTypeId.toString() === x.id.toString()));
  }

  addRecord() {
    this._tempPricingPlanTypeForm.productTypeName = this.productTypeList.find(x => x.id == this._tempPricingPlanTypeForm.productTypeId).name;
    this._tempPricingPlanTypeForm.unitName = this.unitList.find(x => x.id == this._tempPricingPlanTypeForm.unitId).name;
    this.pricingPlanForm.pricingPlanTypeList.push(this._tempPricingPlanTypeForm);
    this.backToList();
  }

  checkPriceVaries() {
    if(this.pricingPlanForm.priceVariesId == 1) {
      this.pricingPlanForm.pricingPlanTypeList = [];
    }
    this.displayProductTypeList = this.productTypeList.filter(x => !this.pricingPlanForm.pricingPlanTypeList.some(y => y.productTypeId.toString() === x.id.toString()));
  }

  submitForm() {
    this.submitFormValue.emit(this.pricingPlanForm)
  }

  cancelForm() {
    this.closeForm.emit(true)
  }

  onUnassign() {
    this.unassignPlan.emit(this.pricingPlanForm.id)
  }

  loadProductTypeList() {
    this.productTypeService.getAllProductTypes().subscribe(res => {
      this.productTypeList = res;
      this.displayProductTypeList = this.productTypeList;
    })
  }

  loadPriceVariesList() {
    this.pricingService.getAllPriceVaries().subscribe(res => {
      this.priceVariesList = res;
    })
  }

  loadUnitList() {
    this.pricingService.getAllUnit().subscribe(res => {
      this.unitList = res.filter(x => x.name != 'FOC');
    })
  }

}
