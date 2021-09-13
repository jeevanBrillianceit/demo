import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-visa-payment-form',
  templateUrl: './visa-payment-form.component.html',
  styleUrls: ['./visa-payment-form.component.css']
})
export class VisaPaymentFormComponent {
  expiryMonth: string;
  expiryYear: string;
  isPaymentConfirmed: boolean = false;
  @Output() newItemVisa = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder,
  ) { }

  get cardHolder() {
    return this.visaPaymentForm.get('cardHolder')
  }

  get cardNumber() {
    return this.visaPaymentForm.get('cardNumber')
  }
  get expDate() {
    return this.visaPaymentForm.get('expDate')
  }

  get cvc() {
    return this.visaPaymentForm.get('cvc')
  }

  visaPaymentForm = this.formBuilder.group({
    cardHolder: new FormControl('',
      [Validators.required,
      this.isInvalidHolderName,
      Validators.minLength(15),
      Validators.maxLength(20),
      ]),
    cardNumber: new FormControl('',
      [Validators.required,
      this.creditCardValidator]),
    expDate: new FormControl('',
      [Validators.required,
      // Validators.minLength(5),
      // Validators.maxLength(5),
      this.expiryDate
      ]),
    cvc: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3),
      this.isValidCvc]),
  })

  visapayment() {
    this.addNewVisa(true, this.visaPaymentForm.value)
    this.visaPaymentForm.reset();
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
    Luhn Algorithm Check
    regex to check the credit card number
  */
  creditCardValidator(control: AbstractControl) {
    let value = control.value;
    const regex = new RegExp("^[0-9]{13,19}$");
    if (!regex.test(value)) {
      return { 'invalidCardNumber': true };
    }

    let checksum = 0; // running checksum total
    let j = 1; // takes value of 1 or 2

    // Process each digit one by one starting from the last
    for (let i = value.length - 1; i >= 0; i--) {
      let calc = 0;
      // Extract the next digit and multiply by 1 or 2 on alternative digits.
      calc = Number(value.charAt(i)) * j;

      // If the result is in two digits add 1 to the checksum total
      if (calc > 9) {
        checksum = checksum + 1;
        calc = calc - 10;
      }

      // Add the units element to the checksum total
      checksum = checksum + calc;

      // Switch the value of j
      if (j == 1) {
        j = 2;
      } else {
        j = 1;
      }
      return null
    }

    //Check if it is divisible by 10 or not.
    return { 'invalidCardNumber': (checksum % 10) == 0 };
    // return (checksum % 10) == 0;

  }

  /*
    regex to check the valid Expiry Date
    it will return true if Expiry Date is wrong
  */
  expiryDate(control: AbstractControl) {
    if (control.value) {
      let today = control.value.split("/");
      let newDate = new Date();
      let today_mm: any = newDate.getMonth() + 1; // extracts the month portion
      let today_yy = newDate.getFullYear() % 100; // extracts the year portion and changes it from yyyy to yy format

      if (today_mm < 10) { // if today's month is less than 10
        today_mm = '0' + today_mm // prefix it with a '0' to make it 2 digits
      }

      let mm = today[0]; // get the mm portion of the expiryDate (first two characters)
      let yy = today[1]; // get the yy portion of the expiryDate (from index 3 to end)
      let mmLength = new String(mm)
      let yyLength = new String(yy)

      if (mm < 10) { // if today's month is less than 10
        mm = '0' + mm // prefix it with a '0' to make it 2 digits
      }

      if (mmLength.length <= 2 && yyLength.length <= 2) {
        if ((mm <= 12) && (yy > today_yy || (yy == today_yy && mm >= today_mm))) {
          return null;
        }
        return { 'expiryDate': true }
      }
      return { 'expiryDateFormat': true }
    }

  }

  /*
    regex to check the valid CVC
    it will return true if CVC is wrong
  */
  isValidCvc(control: AbstractControl) {
    let cvcValue: string = control.value;
    const regex = new RegExp("^[0-9]{3}$");
    if (cvcValue != '') {
      if (!regex.test(cvcValue)) {
        return { 'InvalidCvcValue': true }
      }
      return null;
    }
  }

  paymentConfirmed() {
    this.isPaymentConfirmed = true
  }

  addNewVisa(value: boolean, data) {
    let postData = {
      validForm: value,
      formData: data
    }
    this.newItemVisa.emit(postData);
  }
}
