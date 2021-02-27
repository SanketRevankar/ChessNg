import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChessboardComponent } from './chessboard/chessboard.component';
import { ChessblockComponent } from './chessblock/chessblock.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpXsrfInterceptor } from './httpxsrf.interceptor';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { FormsModule } from '@angular/forms';
import { TokenInterceptor } from './token.interceptor';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    ChessboardComponent,
    ChessblockComponent,
    DashboardComponent,
    LoginComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatSnackBarModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFToken',
    }),
    AppRoutingModule,
    NoopAnimationsModule,
    ClipboardModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
