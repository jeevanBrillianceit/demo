import { Component, OnInit } from '@angular/core';
import { SepaModel } from 'src/app/models/sepa/sepa.model';
import { VisaModel } from 'src/app/models/visa/visa.model';
import { SepaService } from 'src/app/services/sepa-payment/sepa.service';
import { VisaService } from 'src/app/services/visa-payment/visa.service';

enum ModelType {
  visaModel= 'visaModel',
  sepaForm= 'sepaForm',
  thankYouSec= 'thankYouSec',
  buttonsSec= 'buttonsSec'
}

enum ListType {
  visaList= 'visaList',
  sepaList= 'sepaList',
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  public get modelTypeSec(): typeof ModelType {
    return ModelType; 
  }


  loading = false;
  sepaUsers: SepaModel[];
  visaUsers: VisaModel[];
  activeModel = ModelType.buttonsSec;
  activeList = '';

  constructor(private sepaService: SepaService, private visaService: VisaService) {
  }

  ngOnInit(): void {
    this.getSepaList();
    this.getVisaList();
  }

  updateModel(model: ModelType) {
    this.activeModel = model
  }

  listModel(list: ListType) {
    this.activeList = list
  }

  /*
    output function to recieve data from sepa form
  */
  sepaPaymentFunc(val: any) {
    if (val.validForm) {
      this.listModel(ListType.sepaList)
      this.updateModel(ModelType.thankYouSec)
      let model = new SepaModel(this.sepaUsers.length + 1, val.formData.iban, val.formData.bic, val.formData.holderName);
      this.addSepa(model)
    }
  }

  /*
    get sepa list
  */
  getSepaList() {
    this.loading = true;
    this.sepaService.getSepas().subscribe((res: SepaModel[]) => {
      this.loading = false;
      this.sepaUsers = res;
    })
  }

  /*
    add data into visa list
  */
  addSepa(model: SepaModel) {
    this.loading = true;
    this.sepaService.addSepa(model).subscribe((res: SepaModel[]) => {
      this.loading = false;
      this.getSepaList()
    })
  }

  /*
    output function to recieve data from visa form
  */
  visaPaymentFunc(val: any) {
    if (val.validForm) {
      this.listModel(ListType.visaList)
      this.updateModel(ModelType.thankYouSec)
      let model = new VisaModel(this.visaUsers.length + 1, val.formData.cardHolder, val.formData.cardNumber, val.formData.expDate, val.formData.cvc);
      this.addVisa(model)
    }
  }

  /*
    get visa list
  */
  getVisaList() {
    this.loading = true;
    this.visaService.getVisa().subscribe((res: VisaModel[]) => {
      this.loading = false;
      this.visaUsers = res;
    })
  }

  /*
    add data into visa list
  */
  addVisa(model: VisaModel) {
    this.loading = true;
    this.visaService.addVisa(model).subscribe((res: VisaModel[]) => {
      this.loading = false;
      this.getVisaList()
    })
  }

  backToMain() {
    this.loading = false;
    this.updateModel(ModelType.buttonsSec);
  }

}
