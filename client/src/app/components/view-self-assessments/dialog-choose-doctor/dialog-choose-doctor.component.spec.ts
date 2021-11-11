import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChooseDoctorComponent } from './dialog-choose-doctor.component';

describe('DialogChooseDoctorComponent', () => {
  let component: DialogChooseDoctorComponent;
  let fixture: ComponentFixture<DialogChooseDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogChooseDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogChooseDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
