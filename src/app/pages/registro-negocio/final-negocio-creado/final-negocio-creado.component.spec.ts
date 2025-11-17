import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalNegocioCreadoComponent } from './final-negocio-creado.component';

describe('FinalNegocioCreadoComponent', () => {
  let component: FinalNegocioCreadoComponent;
  let fixture: ComponentFixture<FinalNegocioCreadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalNegocioCreadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalNegocioCreadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
