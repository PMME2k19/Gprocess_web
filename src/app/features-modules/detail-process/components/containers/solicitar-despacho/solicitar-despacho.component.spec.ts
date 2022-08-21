import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarDespachoComponent } from './solicitar-despacho.component';

describe('SolicitarDespachoComponent', () => {
  let component: SolicitarDespachoComponent;
  let fixture: ComponentFixture<SolicitarDespachoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitarDespachoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarDespachoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
