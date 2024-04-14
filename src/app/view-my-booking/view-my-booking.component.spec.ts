import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyBookingComponent } from './view-my-booking.component';

describe('ViewMyBookingComponent', () => {
  let component: ViewMyBookingComponent;
  let fixture: ComponentFixture<ViewMyBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMyBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
