import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-sepa-payment-form',
  templateUrl: './sepa-payment-form.component.html',
  styleUrls: ['./sepa-payment-form.component.css']
})
export class SepaPaymentFormComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<any>();

  sipaPaymentForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  get iban() {
    return this.sipaPaymentForm.get('iban')
  }

  get bic() {
    return this.sipaPaymentForm.get('bic')
  }

  get holderName() {
    return this.sipaPaymentForm.get('holderName')
  }

  ngOnInit(): void {
    this.sipaPaymentForm = this.formBuilder.group({
      iban: ['', [
        Validators.required,
        this.isInvalidIban,
        Validators.minLength(15),
        Validators.maxLength(32),
      ]
        // this.isEmailExists.bind(this)
      ],

      bic:
        ['', [
          Validators.required,
          this.isInvalidBic,
          Validators.minLength(8),
          Validators.maxLength(8),]
        ],

      holderName:
        ['', [
          Validators.required,
          this.isInvalidHolderName,
          Validators.minLength(15),
          Validators.maxLength(20),]
        ],
    })
  }

  sepapayment() {
    this.addNewItem(true, this.sipaPaymentForm.value)
    this.sipaPaymentForm.reset();
  }

  /*
    regex to check the valid IBAN text
    it will return true if IBAN text is wrong
  */
  isInvalidIban(control: AbstractControl) {
    let ibanValue: string = control.value;
    const regex = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{0,}$");
    if (!regex.test(ibanValue)) {
      return { 'InvalidIban': true }
    }
    return null;
  }

  /*
    regex to check the valid BIC text
    it will return true if BIC text is wrong
  */
  isInvalidBic(control: AbstractControl) {
    let bicValue: string = control.value;
    const regex = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$");
    if (!regex.test(bicValue)) {
      return { 'InvalidBic': true }
    }
    return null;
  }

  /*
    regex to check the valid Holder Name text
    it will return true if Holder Name text is wrong
  */
  isInvalidHolderName(control: AbstractControl) {
    let holderNameValue: string = control.value;
    const regex = new RegExp("^(?=.*[A-Za-z ])[A-Za-z ]{0,}$");
    if (holderNameValue != '') {
      if (!regex.test(holderNameValue)) {
        return { 'InvalidHolderName': true }
      }
      return null;
    }
  }

  /*
    output function to send the values
  */
  addNewItem(value: boolean, data) {
    let postData = {
      validForm: value,
      formData: data
    }
    this.newItemEvent.emit(postData);
  }

}
