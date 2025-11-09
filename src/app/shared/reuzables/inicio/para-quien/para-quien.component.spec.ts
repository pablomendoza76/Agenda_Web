import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParaQuienComponent } from './para-quien.component';

describe('ParaQuienComponent', () => {
  let component: ParaQuienComponent;
  let fixture: ComponentFixture<ParaQuienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParaQuienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParaQuienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
