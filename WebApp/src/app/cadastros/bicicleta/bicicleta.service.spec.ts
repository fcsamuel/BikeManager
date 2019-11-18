import { TestBed } from '@angular/core/testing';

import { BicicletaService } from './bicicleta.service';

describe('BicicletaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BicicletaService = TestBed.get(BicicletaService);
    expect(service).toBeTruthy();
  });
});
