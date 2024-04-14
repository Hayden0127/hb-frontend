import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingPlanFormComponent } from './pricing-plan-form.component';

describe('PricingPlanFormComponent', () => {
  let component: PricingPlanFormComponent;
  let fixture: ComponentFixture<PricingPlanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricingPlanFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingPlanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
