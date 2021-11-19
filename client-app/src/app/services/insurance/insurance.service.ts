import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IInsuranceForm from 'src/app/interfaces/insurance/IInsuranceForm';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  constructor(private http: HttpClient) { }

  private url = environment.apiBaseUrl + '/insurances';

  public loadInsurances(id?: number) {
    return this.http.get<any[]>(this.url);
  }

  public createInsurance(data: IInsuranceForm) {
    return this.http.post<any>(this.url, data);
  }


}
 