import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleinstallComponent } from './scheduleinstall.component';

describe('ScheduleinstallComponent', () => {
  let component: ScheduleinstallComponent;
  let fixture: ComponentFixture<ScheduleinstallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleinstallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleinstallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
