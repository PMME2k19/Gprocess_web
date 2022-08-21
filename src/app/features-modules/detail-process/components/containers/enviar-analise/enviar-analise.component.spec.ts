import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarAnaliseComponent } from './enviar-analise.component';

describe('EnviarAnaliseComponent', () => {
  let component: EnviarAnaliseComponent;
  let fixture: ComponentFixture<EnviarAnaliseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnviarAnaliseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviarAnaliseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
