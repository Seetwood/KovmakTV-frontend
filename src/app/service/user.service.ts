import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../models/Users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'api/profile/user';
  url: string;

  constructor(
    private http: HttpClient) { }

  getUser(): Observable<Users> {
  return this.http.get<Users>(this.userUrl);
  }
  addNewGenre(user: Users): Observable<Users> {
    return this.http.post<Users>(this.userUrl, user);
  }
  updateUser(user: Users): Observable<Users>  {
    return this.http.put<Users>(this.userUrl, user);
  }
  deleteUser(): Observable<Users> {
    return this.http.delete<Users>(this.userUrl);
  }
}
