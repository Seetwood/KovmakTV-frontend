import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { MessageResponse } from 'src/app/models/MessageResponse';
import { Users } from 'src/app/models/Users';
import { Credential } from 'src/app/models/auth/Credential';
import { DialogInformationWrapperComponent } from '../../dialogInformationWrapper/dialog-information-wrapper/dialog-information-wrapper.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less']
})
export class RegistrationComponent {
  hide = false;
  credential: Credential;
  user: Users = {
    id: 0,
    username:"",
    password:'',
    name:'',
    surname:'',
  };
  errorAuth: boolean;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private authService: AuthService, private dialog:MatDialog, private router: Router) {}

  ngOnInit() {
    this.authService.clearLoginData();
    this.credential = new Credential();
  }

  registration() {
    if (!this.user.username || !this.user.password || !this.user.name || !this.user.surname) {
      const infoDialog = this.dialog.open(DialogInformationWrapperComponent,{
        width: '350px',
        height: '100px',
        data: new MessageResponse ("Пожалуйста, заполните все поля!"),
        autoFocus: false
      });
      return;
    }
    
    this.user = new Users(
      this.user.username,
      this.user.password,
      this.user.name,
      this.user.surname,
      );

    this.authService.register(this.user).subscribe();
    this.router.navigate(['/login']);
  }
}
