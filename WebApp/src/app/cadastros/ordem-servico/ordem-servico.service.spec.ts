import { TestBed } from '@angular/core/testing';

import { OrdemServicoService } from './ordem-servico.service';

describe('OrdemServicoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdemServicoService = TestBed.get(OrdemServicoService);
    expect(service).toBeTruthy();
  });
});
