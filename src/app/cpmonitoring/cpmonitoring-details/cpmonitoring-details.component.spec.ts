import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpmonitoringDetailsComponent } from './cpmonitoring-details.component';

describe('CpmonitoringDetailsComponent', () => {
  let component: CpmonitoringDetailsComponent;
  let fixture: ComponentFixture<CpmonitoringDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpmonitoringDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpmonitoringDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
