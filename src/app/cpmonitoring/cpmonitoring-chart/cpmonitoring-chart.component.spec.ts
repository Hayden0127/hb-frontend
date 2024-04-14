import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpmonitoringChartComponent } from './cpmonitoring-chart.component';

describe('CpmonitoringChartComponent', () => {
  let component: CpmonitoringChartComponent;
  let fixture: ComponentFixture<CpmonitoringChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpmonitoringChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpmonitoringChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
