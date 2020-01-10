import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresosHistorialComponent } from './ingresos-historial.component';

describe('IngresosHistorialComponent', () => {
  let component: IngresosHistorialComponent;
  let fixture: ComponentFixture<IngresosHistorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresosHistorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresosHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
