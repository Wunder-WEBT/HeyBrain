import { TestBed } from '@angular/core/testing';

import { CortexService } from './cortex.service';

describe('CortexService', () => {
  let service: CortexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CortexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
