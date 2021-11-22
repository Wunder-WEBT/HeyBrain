import { TestBed } from '@angular/core/testing';

import { SimulationcortexService } from './simulationcortex.service';

describe('SimulationcortexService', () => {
  let service: SimulationcortexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimulationcortexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
