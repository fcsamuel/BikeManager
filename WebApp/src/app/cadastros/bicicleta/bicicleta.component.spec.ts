import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BicicletaComponent } from './bicicleta.component';

describe('BicicletaComponent', () => {
  let component: BicicletaComponent;
  let fixture: ComponentFixture<BicicletaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BicicletaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BicicletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
