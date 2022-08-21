import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarTratamentoComponent } from './dar-tratamento.component';

describe('DarTratamentoComponent', () => {
  let component: DarTratamentoComponent;
  let fixture: ComponentFixture<DarTratamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DarTratamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DarTratamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
