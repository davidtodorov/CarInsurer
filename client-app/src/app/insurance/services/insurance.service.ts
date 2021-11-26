import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import IInsuranceForm from '../models/IInsuranceForm';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  constructor(private http: HttpClient) { }

  private url = environment.apiBaseUrl + '/insurances';

  public loadInsurances(id?: string, extended: boolean = false) {
    let url = id ? `${this.url}/${id}` : this.url;
    if (extended) {
      url+= '?extended=true'
    };
    return this.http.get<any[]>(url);
  }

  public createInsurance(data: IInsuranceForm) {
    return this.http.post<IInsuranceForm>(this.url, data);
  }

  public updateInsurance(data: IInsuranceForm) {
    return this.http.put(this.url, data);
  }
}
