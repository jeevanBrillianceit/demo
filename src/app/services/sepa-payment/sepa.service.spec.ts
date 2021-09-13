import { TestBed } from '@angular/core/testing';

import { SepaService } from './sepa.service';

describe('SepaService', () => {
  let service: SepaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SepaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
