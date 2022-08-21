import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarDespachoComponent } from './dar-despacho.component';

describe('DarDespachoComponent', () => {
  let component: DarDespachoComponent;
  let fixture: ComponentFixture<DarDespachoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DarDespachoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DarDespachoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
