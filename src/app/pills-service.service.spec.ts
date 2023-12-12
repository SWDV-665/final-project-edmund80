import { TestBed } from '@angular/core/testing';
import { PillsServiceService } from './pills-service.service';

describe('PillsServiceService', () => {
  let service: PillsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PillsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
