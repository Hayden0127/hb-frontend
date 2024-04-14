import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpPricingListComponent } from './cp-pricing-list.component';

describe('CpPricingListComponent', () => {
  let component: CpPricingListComponent;
  let fixture: ComponentFixture<CpPricingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpPricingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpPricingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
