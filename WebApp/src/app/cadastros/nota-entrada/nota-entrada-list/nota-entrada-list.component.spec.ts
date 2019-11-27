import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaEntradaListComponent } from './nota-entrada-list.component';

describe('NotaEntradaListComponent', () => {
  let component: NotaEntradaListComponent;
  let fixture: ComponentFixture<NotaEntradaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotaEntradaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaEntradaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
