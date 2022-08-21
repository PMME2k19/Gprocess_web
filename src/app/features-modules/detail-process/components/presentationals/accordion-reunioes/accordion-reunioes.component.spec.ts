import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionReunioesComponent } from './accordion-reunioes.component';

describe('AccordionReunioesComponent', () => {
  let component: AccordionReunioesComponent;
  let fixture: ComponentFixture<AccordionReunioesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccordionReunioesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionReunioesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
