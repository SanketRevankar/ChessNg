import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChessNG';

  signedIn: boolean = false;
  userName: any;
  imageUrl: any;

  constructor(private router: Router,
    private ngZone: NgZone,
    private ref: ChangeDetectorRef,
    private authenticationService: AuthenticationService) {
    if (this.authenticationService.userValue) {
      this.signedIn = true;
      this.userName = this.authenticationService.userValue.firstName
      this.imageUrl = this.authenticationService.userValue.pictureUrl
    }
    // @ts-ignore
    $(document).tooltip({
      selector: '[data-toggle="tooltip"]'
    });

    window.addEventListener('storage', (event) => {
      if (event.storageArea == localStorage) {
          let token = localStorage.getItem('user');
          if (token == undefined) {
            authenticationService.logout()
          }
      }
  });
  }

  ngOnInit(): void {
  }

  public signOut() {
    this.authenticationService.logout()
  }
}
