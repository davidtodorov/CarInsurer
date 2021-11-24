import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  private url = environment.apiBaseUrl + '/users';

  public loadUsers(id?: number) {
    return this.http.get<IUser[]>(this.url);
  }
}
