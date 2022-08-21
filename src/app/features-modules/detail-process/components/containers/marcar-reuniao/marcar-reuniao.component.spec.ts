import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcarReuniaoComponent } from './marcar-reuniao.component';

describe('MarcarReuniaoComponent', () => {
  let component: MarcarReuniaoComponent;
  let fixture: ComponentFixture<MarcarReuniaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarcarReuniaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcarReuniaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
