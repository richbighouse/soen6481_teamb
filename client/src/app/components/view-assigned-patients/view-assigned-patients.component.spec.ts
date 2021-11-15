import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssignedPatientsComponent } from './view-assigned-patients.component';

describe('ViewAssignedPatientsComponent', () => {
  let component: ViewAssignedPatientsComponent;
  let fixture: ComponentFixture<ViewAssignedPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAssignedPatientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAssignedPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
