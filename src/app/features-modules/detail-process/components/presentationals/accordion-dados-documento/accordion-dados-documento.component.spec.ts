import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionDadosDocumentoComponent } from './accordion-dados-documento.component';

describe('AccordionDadosDocumentoComponent', () => {
  let component: AccordionDadosDocumentoComponent;
  let fixture: ComponentFixture<AccordionDadosDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccordionDadosDocumentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionDadosDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
