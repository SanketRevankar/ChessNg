import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChessboardComponent } from './chessboard/chessboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'game/:gameId/:playerId', component: ChessboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
