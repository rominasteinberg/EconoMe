import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosHistorialComponent } from './gastos-historial.component';

describe('GastosHistorialComponent', () => {
  let component: GastosHistorialComponent;
  let fixture: ComponentFixture<GastosHistorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastosHistorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastosHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
