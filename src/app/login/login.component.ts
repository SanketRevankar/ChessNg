import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
declare var gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  returnUrl: string = '';

  constructor(private route: ActivatedRoute,
    public router: Router,
    public authenticationService: AuthenticationService) { 
      if (this.authenticationService.userValue) { 
            console.log(this.authenticationService.userValue)
            this.router.navigate(['/']);
        }
      }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'theme': 'dark',
      'onsuccess': (param: any) => this.onSignIn(param)
    });
  }

  public onSignIn(googleUser: any) {
    this.returnUrl = this.route.snapshot.queryParams['redirectTo'] || '/';
    let id_token = googleUser.getAuthResponse().id_token;
    this.authenticationService.login(id_token, this.returnUrl)
  }

}
