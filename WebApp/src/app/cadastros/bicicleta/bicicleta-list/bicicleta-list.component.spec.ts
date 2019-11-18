import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BicicletaListComponent } from './bicicleta-list.component';

describe('BicicletaListComponent', () => {
  let component: BicicletaListComponent;
  let fixture: ComponentFixture<BicicletaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BicicletaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BicicletaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
