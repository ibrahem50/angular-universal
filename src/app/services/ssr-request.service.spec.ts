import { SsrRequestService } from './ssr-request.service';
import { TestBed } from '@angular/core/testing';

describe('SsrRequestService', () => {
  let service: SsrRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SsrRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
