import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCancelAppointmentComponent } from './dialog-cancel-appointment.component';

describe('DialogCancelAppointmentComponent', () => {
  let component: DialogCancelAppointmentComponent;
  let fixture: ComponentFixture<DialogCancelAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCancelAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCancelAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
