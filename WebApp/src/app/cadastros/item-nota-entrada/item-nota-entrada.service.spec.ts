import { TestBed } from '@angular/core/testing';

import { ItemNotaEntradaService } from './item-nota-entrada.service';

describe('ItemNotaEntradaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemNotaEntradaService = TestBed.get(ItemNotaEntradaService);
    expect(service).toBeTruthy();
  });
});
