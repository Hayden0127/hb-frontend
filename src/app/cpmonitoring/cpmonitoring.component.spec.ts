import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpmonitoringComponent } from './cpmonitoring.component';

describe('CpmonitoringComponent', () => {
  let component: CpmonitoringComponent;
  let fixture: ComponentFixture<CpmonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpmonitoringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpmonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
