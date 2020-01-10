import { TestBed } from '@angular/core/testing';

import { AhorrosService } from './ahorros.service';

describe('AhorrosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AhorrosService = TestBed.get(AhorrosService);
    expect(service).toBeTruthy();
  });
});
