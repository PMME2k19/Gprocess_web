import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioDestinoComponent } from './relatorio-destino.component';

describe('RelatorioDestinoComponent', () => {
  let component: RelatorioDestinoComponent;
  let fixture: ComponentFixture<RelatorioDestinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioDestinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioDestinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
