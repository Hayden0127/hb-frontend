import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CpmonitoringMapComponent } from './cpmonitoring-map.component';

describe('CpmonitoringMapComponent', () => {
  let component: CpmonitoringMapComponent;
  let fixture: ComponentFixture<CpmonitoringMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpmonitoringMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpmonitoringMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
