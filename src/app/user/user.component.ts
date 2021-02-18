import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private id_token: string | undefined;
  userName: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  imageUrl: string | undefined;
  email: string | undefined;
  emailConfirm: string | undefined;

  constructor(private authenticationService: AuthenticationService) { 
    if (this.authenticationService.userValue) {
      this.userName = this.authenticationService.userValue.fullName
      this.firstName = this.authenticationService.userValue.firstName
      this.lastName = this.authenticationService.userValue.lastName
      this.imageUrl = this.authenticationService.userValue.pictureUrl
      this.email = this.authenticationService.userValue.email
    }}

  ngOnInit(): void {
  }
  
  updateUser() {
    let user: User = {
      fullName: this.userName,
      firstName: this.firstName,
      lastName: this.lastName,
    };
    this.authenticationService.updateUser(user)
  }

  deleteUser() {
    this.authenticationService.deleteUser()
  }
}
