import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  constructor(private http: HttpClient) { }

  private url = environment.apiBaseUrl + '/cars';

  public loadInsurances(id?: string, extended: boolean = false) {
    let url = id ? `${this.url}/${id}` : this.url;
    return this.http.get<any[]>(url);
  }
}
