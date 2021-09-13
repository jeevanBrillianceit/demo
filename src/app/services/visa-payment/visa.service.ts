import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VisaModel } from 'src/app/models/visa/visa.model';

@Injectable({
  providedIn: 'root'
})
export class VisaService {

  constructor(private httpClient: HttpClient) { }

  // Get all visas list
  getVisa(): Observable<VisaModel[]> {
    return this.httpClient.get<VisaModel[]>('api/visas')
  }

  // Add visa in visas list
  addVisa(model: VisaModel) {
    return this.httpClient.post('api/visas', model)
  }
}
