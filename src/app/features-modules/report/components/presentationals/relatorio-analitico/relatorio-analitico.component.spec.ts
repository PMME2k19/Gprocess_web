import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioAnaliticoComponent } from './relatorio-analitico.component';

describe('RelatorioAnaliticoComponent', () => {
  let component: RelatorioAnaliticoComponent;
  let fixture: ComponentFixture<RelatorioAnaliticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioAnaliticoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioAnaliticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
