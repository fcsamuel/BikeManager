import { TestBed } from '@angular/core/testing';

import { NotaEntradaService } from './nota-entrada.service';

describe('NotaEntradaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotaEntradaService = TestBed.get(NotaEntradaService);
    expect(service).toBeTruthy();
  });
});
