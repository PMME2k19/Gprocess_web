import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArquivarProcessoComponent } from './arquivar-processo.component';

describe('ArquivarProcessoComponent', () => {
  let component: ArquivarProcessoComponent;
  let fixture: ComponentFixture<ArquivarProcessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArquivarProcessoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArquivarProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
