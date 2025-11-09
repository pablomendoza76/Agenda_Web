import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtaFinalComponent } from './cta-final.component';

describe('CtaFinalComponent', () => {
  let component: CtaFinalComponent;
  let fixture: ComponentFixture<CtaFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtaFinalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtaFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
