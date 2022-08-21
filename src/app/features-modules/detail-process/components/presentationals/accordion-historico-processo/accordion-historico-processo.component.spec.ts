import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionHistoricoProcessoComponent } from './accordion-historico-processo.component';

describe('AccordionHistoricoProcessoComponent', () => {
  let component: AccordionHistoricoProcessoComponent;
  let fixture: ComponentFixture<AccordionHistoricoProcessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccordionHistoricoProcessoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionHistoricoProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
