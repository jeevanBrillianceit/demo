import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { SepaModel } from 'src/app/models/sepa/sepa.model';
import { VisaModel } from 'src/app/models/visa/visa.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryService implements InMemoryDbService {

  createDb() {
    const sepas = [
      new SepaModel(1, '01234567890ABCDEFGH', 'ABCD1234', 'TESTING TESTING ONE'),
      new SepaModel(2, '01234567890ABCDEFGH', 'ABCD1234', 'TESTING TESTING TWO'),
    ];

    const visas = [
      new VisaModel(1, 'TESTING TESING ONE', 4242424242424242, '02/22', 333),
      new VisaModel(2, 'TESTING TESING TWO', 4111111111111111, '03/22', 444)
    ];
    return {sepas, visas};
  }

}
