import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionObservacoesComponent } from './accordion-observacoes.component';

describe('AccordionObservacoesComponent', () => {
  let component: AccordionObservacoesComponent;
  let fixture: ComponentFixture<AccordionObservacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccordionObservacoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionObservacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
