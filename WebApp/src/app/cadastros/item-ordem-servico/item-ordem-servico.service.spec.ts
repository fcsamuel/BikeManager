import { TestBed } from '@angular/core/testing';

import { ItemOrdemServicoService } from './item-ordem-servico.service';

describe('ItemOrdemServicoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemOrdemServicoService = TestBed.get(ItemOrdemServicoService);
    expect(service).toBeTruthy();
  });
});
