import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTestStatusComponent } from './view-test-status.component';

describe('ViewTestStatusComponent', () => {
  let component: ViewTestStatusComponent;
  let fixture: ComponentFixture<ViewTestStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTestStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTestStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
