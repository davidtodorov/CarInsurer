import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EventResponse } from '../models/EventResponse';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private http: HttpClient) { }

  private url = environment.apiBaseUrl + '/events';

  loadEvents(id?: string): Observable<EventResponse[]> {
    let url = id ? `${this.url}/${id}` : this.url;
    return this.http.get<EventResponse[]>(url);
  }

  loadEventsByInsuranceId(id: string): Observable<EventResponse[]> {
    let params = new HttpParams().set('insuranceId', id)
    return this.http.get<EventResponse[]>(this.url, { params });
  }

  createEvent(data: FormData) {
    return this.http.post(this.url, data);
  }

  updateEvenet(data: any) {
    return this.http.put(this.url, data);
  }

  deleteEvent(id: string) {
    return this.http.delete(this.url + `/${id}`);
  }
}
