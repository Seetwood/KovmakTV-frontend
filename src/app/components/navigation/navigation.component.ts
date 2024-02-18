import { Component, OnInit } from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { MessageResponse } from 'src/app/models/MessageResponse';
import { DialogInformationWrapperComponent } from '../dialogInformationWrapper/dialog-information-wrapper/dialog-information-wrapper.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less']
  
})
export class NavigationComponent implements OnInit {

  userId: number;

  constructor(private authService: AuthService,
     private router: Router,
     public dialog: MatDialog,
     private userService: UserService) {}

  isAuth(): boolean {
    return this.authService.isAuth();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  ngOnInit(): void {
    if(this.isAuth()){
      this.userService.getUser().subscribe(data => {
        this.userId = data.id;
      });
    }
  }
  
  openMenuProfile(menuTrigger: MatMenuTrigger) {
    menuTrigger.openMenu();
  }

  pageMyReviews(): void {
    if (!this.isAuth()) {
      const infoDialog = this.dialog.open(DialogInformationWrapperComponent, {
        width: '350px',
        height: '100px',
        data: new MessageResponse("Вы не авторизованы!"),
        autoFocus: false
      });
      return;
    }
    this.router.navigate(['/reviews-user', this.userId]);
  }

  logout()
  {
    this.authService.logout();
    this.authService.clearLoginData();
    this.isAuth();
    this.router.navigate(['/index']);
  }
}


