import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSelfAssessmentsComponent } from './view-self-assessments.component';

describe('ViewSelfAssessmentsComponent', () => {
  let component: ViewSelfAssessmentsComponent;
  let fixture: ComponentFixture<ViewSelfAssessmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSelfAssessmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSelfAssessmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
