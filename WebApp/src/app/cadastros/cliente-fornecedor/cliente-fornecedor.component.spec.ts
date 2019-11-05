import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteFornecedorComponent } from './cliente-fornecedor.component';

describe('ClienteFornecedorComponent', () => {
  let component: ClienteFornecedorComponent;
  let fixture: ComponentFixture<ClienteFornecedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteFornecedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
