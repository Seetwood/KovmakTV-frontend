import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialResponse } from '../models/auth/CredentialResponse';
import { Credential } from '../models/auth/Credential';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { ROLE } from '../auth/role';
import { Authority } from '../models/auth/Authority';
import { SessionStorageService } from 'angular-web-storage';
import { Users } from '../models/Users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private router: Router,
    private http: HttpClient,
    private sessionStorage: SessionStorageService) {
      const auth = this.sessionStorage.get('auth');
      this.loggedIn.next(this.isAuthNotEmpty(auth));
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get LoggedUser(): CredentialResponse {
    const auth = this.sessionStorage.get('auth');
    if(auth == null || auth == "") {
      return new CredentialResponse();
    }
    return JSON.parse(auth) as CredentialResponse;
  }

  isAdmin(): boolean {
    if (this.LoggedUser && this.LoggedUser.authorities) {
      return this.LoggedUser.authorities.filter((auth: Authority) => {
        return auth.authority == ROLE.SUPER_USER;
      }).length != 0;
    }
    return false;
  }

  isUser(): boolean {
    if (this.LoggedUser && this.LoggedUser.authorities) {
      return this.LoggedUser.authorities.filter((auth: Authority) => {
        return auth.authority == ROLE.USER;
      }).length != 0;
    }
    return false;
  }

  isAuth(): boolean {
    if (this.LoggedUser && this.LoggedUser.authorities) {
      return true
    }
    return false;
  }

  static checkAuthUser(auth: CredentialResponse, role: string): boolean {
    let access = false;
    if (auth != null && auth.authorities !== null) {
      auth.authorities.some((el) => {
        console.log('el.authority: ' + el.authority);
        access = el.authority === role;
        return access;
      });
    }
    return access;
  }

  static checkSection(url: string, section: string): boolean {
    return url.indexOf(section) == 0;
  }

  authenticate(crdls: Credential, failureHandler: any) {
    const headers = new HttpHeaders(crdls ? {
      authorization: 'Basic ' + btoa(crdls.username + ':' + crdls.password),
      "X-Requested-With": "XMLHttpRequest"
    } : {});
    this.authentication(headers).subscribe((data: CredentialResponse | null) => {
      if (data != null) {
        this.responseProcessing(data, failureHandler);
      }
    });
  }

  private responseProcessing(data: CredentialResponse, failureHandler: () => void): boolean {
    const response: CredentialResponse | null = CredentialResponse.convertToObj(data);
    if (response !== null && response.authenticated == true) {
      this.updateAuth(response);
      this.loggedIn.next(true);
      if(this.isAdmin() || this.isUser())
      {
        this.router.navigate(['index']);
      }
      return true;
    }
     else {
      failureHandler();
      return false;
    }
  }

  private updateAuth(response: CredentialResponse) {
    this.sessionStorage.set('auth', JSON.stringify(response));
  }

  logout() {
    this.clearLoginData();
    this.http.post('api/logout', {}).subscribe(response => {
      this.router.navigateByUrl('/index');
    });
  }

  clearLoginData() {
    this.loggedIn.next(false);
    this.sessionStorage.remove('auth');
  }

  authentication(headers: HttpHeaders): Observable<any> {
    return this.http.get('/api/currentUser/', { headers: headers })
      .pipe(
        tap(data => console.log('login data:', data)),
        catchError(this.handleLoginError('login error', []))
      );
  }

  private isAuthNotEmpty = (auth: string) => {
    return auth != null && auth != "";
  };

  private handleLoginError<T>(operation = 'operation', result?: T) {
    console.log('handleLoginError')
    return (error: any): Observable<T> => {
      if(error.status === 401) {
        this.loggedIn.next(false);
        return of(result as T);
      }
      else if(error.status == 404) {
        this.loggedIn.next(false);
        // @ts-ignore
        return of (
          {
            errorStatus: error.status
          }
        );
      }
      return of(result as T);
    };
  }

  register(user: Users): Observable<any> {
    return this.http.post('/api/register', user);
  }
}