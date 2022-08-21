import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeixarObservacaoComponent } from './deixar-observacao.component';

describe('DeixarObservacaoComponent', () => {
  let component: DeixarObservacaoComponent;
  let fixture: ComponentFixture<DeixarObservacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeixarObservacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeixarObservacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
