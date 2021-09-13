import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaPaymentFormComponent } from './visa-payment-form.component';

describe('VisaPaymentFormComponent', () => {
  let component: VisaPaymentFormComponent;
  let fixture: ComponentFixture<VisaPaymentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisaPaymentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisaPaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
