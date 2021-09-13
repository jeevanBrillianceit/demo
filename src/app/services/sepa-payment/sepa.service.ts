import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SepaModel } from 'src/app/models/sepa/sepa.model';

@Injectable({
  providedIn: 'root'
})
export class SepaService {

  constructor(private httpClient: HttpClient) { }

  // Get all stored sepa list
  getSepas(): Observable<SepaModel[]> {
    return this.httpClient.get<SepaModel[]>('api/sepas')
  }

  // Add sepa in sepa list
  addSepa(model: SepaModel) {
    return this.httpClient.post('api/sepas', model)
  }
}
