import { TestBed } from '@angular/core/testing';

import { TabelaPrecoServiceService } from './tabela-preco-service.service';

describe('TabelaPrecoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TabelaPrecoServiceService = TestBed.get(TabelaPrecoServiceService);
    expect(service).toBeTruthy();
  });
});
