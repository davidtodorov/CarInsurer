import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstallmentsService {
  constructor(private http: HttpClient) { }

  private url = environment.apiBaseUrl + '/installments';

  public updateInstallment(installment: any): Observable<any> {
    const fragment = installment._id ? `/${installment._id}` : '';
    let url = this.url + fragment;
    return this.http.put<any>(url, installment);
  }
}
