import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionDespachosComponent } from './accordion-despachos.component';

describe('AccordionDespachosComponent', () => {
  let component: AccordionDespachosComponent;
  let fixture: ComponentFixture<AccordionDespachosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccordionDespachosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionDespachosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
