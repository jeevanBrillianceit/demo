import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SepaPaymentFormComponent } from './sepa-payment-form.component';

describe('SepaPaymentFormComponent', () => {
  let component: SepaPaymentFormComponent;
  let fixture: ComponentFixture<SepaPaymentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SepaPaymentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SepaPaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
