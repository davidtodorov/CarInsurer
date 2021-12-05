import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Installment } from '../models/Installment';

@Injectable({
  providedIn: 'root'
})
export class InstallmentsService {
  constructor(private http: HttpClient) { }

  private url = environment.apiBaseUrl + '/installments';

  public loadInstallment(insuranceId: string): Observable<Installment[]> {
    let params = new HttpParams().set('insuranceId', insuranceId)
    return this.http.get<Installment[]>(this.url, { params });
  }

  public updateInstallment(installment: Installment): Observable<any> {
    const fragment = installment._id ? `/${installment._id}` : '';
    let url = this.url + fragment;
    return this.http.put<any>(url, installment);
  }
}
