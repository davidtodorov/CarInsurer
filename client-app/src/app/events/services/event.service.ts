import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private http: HttpClient) { }

  private url = environment.apiBaseUrl + '/events';

  loadEvents(id?: string): Observable<any[]> {
    let url = id ? `${this.url}/${id}` : this.url;
    return this.http.get<any[]>(url);
  }
}
