import { Component, OnInit } from '@angular/core';
import { ChessserviceService } from '../chessservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private chessserviceService: ChessserviceService) { }

  ngOnInit(): void {
  }

  startGame(): void {
    this.chessserviceService.start().subscribe(gameId => {
        window.location.href = `/game/${gameId['gameId']}/1`
    })
  }
}
