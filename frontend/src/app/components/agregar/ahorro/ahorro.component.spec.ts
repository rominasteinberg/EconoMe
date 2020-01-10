import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorroComponent } from './ahorro.component';

describe('AhorroComponent', () => {
  let component: AhorroComponent;
  let fixture: ComponentFixture<AhorroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AhorroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AhorroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
