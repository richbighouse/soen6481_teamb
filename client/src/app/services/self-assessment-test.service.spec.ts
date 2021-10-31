import { TestBed } from '@angular/core/testing';

import { SelfAssessmentTestService } from './self-assessment-test.service';

describe('SelfAssessmentTestService', () => {
  let service: SelfAssessmentTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelfAssessmentTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
