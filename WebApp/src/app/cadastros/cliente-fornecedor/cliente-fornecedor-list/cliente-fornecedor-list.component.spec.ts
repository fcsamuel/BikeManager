import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteFornecedorListComponent } from './cliente-fornecedor-list.component';

describe('ClienteFornecedorListComponent', () => {
  let component: ClienteFornecedorListComponent;
  let fixture: ComponentFixture<ClienteFornecedorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteFornecedorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteFornecedorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
