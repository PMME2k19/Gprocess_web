import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionDocumentosComponent } from './accordion-documentos.component';

describe('AccordionDocumentosComponent', () => {
  let component: AccordionDocumentosComponent;
  let fixture: ComponentFixture<AccordionDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccordionDocumentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
