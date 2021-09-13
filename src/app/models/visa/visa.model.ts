export class VisaModel {
    id: number
    cardHolder: string
    cardNumber: number
    expiryDate: string
    cvc: number
  
    constructor(id: number, cardHolder: string, cardNumber: number, expiryDate: string, cvc: number) {
      this.id = id;
      this.cardHolder = cardHolder;
      this.cardNumber = cardNumber;
      this.expiryDate = expiryDate;
      this.cvc = cvc;
    }
  }