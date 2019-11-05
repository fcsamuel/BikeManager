import { TestBed } from '@angular/core/testing';

import { ClienteFornecedorService } from './cliente-fornecedor.service';

describe('ClienteFornecedorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClienteFornecedorService = TestBed.get(ClienteFornecedorService);
    expect(service).toBeTruthy();
  });
});
