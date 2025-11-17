import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroNegocioComponent } from './registro-negocio.component';

describe('RegistroNegocioComponent', () => {
  let component: RegistroNegocioComponent;
  let fixture: ComponentFixture<RegistroNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroNegocioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
