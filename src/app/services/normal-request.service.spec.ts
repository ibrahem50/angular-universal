import { TestBed } from '@angular/core/testing';

import { NormalRequestService } from './normal-request.service';

describe('NormalRequestService', () => {
  let service: NormalRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NormalRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
