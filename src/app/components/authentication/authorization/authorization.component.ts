import { Component} from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Credential } from 'src/app/models/auth/Credential';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.less']
})
export class AuthorizationComponent {
  credential: Credential;
  errorAuth: boolean;
  hide = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.clearLoginData();
    this.credential = new Credential();
  }

  login() {
    this.authService.authenticate(this.credential, () => {
      this.errorAuth = true;
    });
  }
}
