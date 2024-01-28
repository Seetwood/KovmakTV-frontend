import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Users } from 'src/app/models/Users';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-personal-account',
  templateUrl: './personal-account.component.html',
  styleUrls: ['./personal-account.component.less']
})
export class PersonalAccountComponent {

  constructor(private userService: UserService, private authService: AuthService) {

  }
  user: Users = {
    id: 0,
    username:"",
    password:'',
    name:'',
    surname:'',
  };

  ngOnInit() {
    this.userService.getUser().subscribe(data => {
    this.user = data;
  });
  }

  updateDataUser() {
    this.userService.updateUser(this.user).subscribe(() => {
    });
  }

  deleteProfile() {
    this.userService.deleteUser().subscribe(() => {
      this.authService.logout();
    });
  }
}
