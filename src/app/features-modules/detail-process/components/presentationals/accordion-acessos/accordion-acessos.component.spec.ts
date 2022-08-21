import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionAcessosComponent } from './accordion-acessos.component';

describe('AccordionAcessosComponent', () => {
  let component: AccordionAcessosComponent;
  let fixture: ComponentFixture<AccordionAcessosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccordionAcessosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionAcessosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
