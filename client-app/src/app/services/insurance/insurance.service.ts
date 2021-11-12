import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  constructor(private http: HttpClient) { }

  public loadInsurances(id?: number) {
    return this.http.get<any[]>('http://localhost:7000/api/insurance');
  }
}
