import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorrosHistorialComponent } from './ahorros-historial.component';

describe('AhorrosHistorialComponent', () => {
  let component: AhorrosHistorialComponent;
  let fixture: ComponentFixture<AhorrosHistorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AhorrosHistorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AhorrosHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
