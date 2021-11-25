import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBookAppointmentComponent } from './dialog-book-appointment.component';

describe('DialogBookAppointmentComponent', () => {
  let component: DialogBookAppointmentComponent;
  let fixture: ComponentFixture<DialogBookAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBookAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBookAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
