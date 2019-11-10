import { TestBed } from '@angular/core/testing';

import { OrcamentoServiceService } from './orcamento-service.service';

describe('OrcamentoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrcamentoServiceService = TestBed.get(OrcamentoServiceService);
    expect(service).toBeTruthy();
  });
});
