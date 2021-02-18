import { Component, OnInit } from '@angular/core';
import { ChessserviceService } from '../chessservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  gameId: string = ''

  constructor(private chessserviceService: ChessserviceService) { }

  ngOnInit(): void {
  }

  startGame(): void {
    this.chessserviceService.start().subscribe(gameId => {
      window.location.href = `/game/${gameId['gameId']}`
    })
  }

  joinGame(): void {
    if (this.gameId.match(/^[0-9a-fA-F]{24}$/)) {
      this.chessserviceService.join(this.gameId).subscribe(gameId => {
        window.location.href = `/game/${gameId['gameId']}`
      })
    }
  }

  isValidId(): boolean {
    return !Boolean(this.gameId.match(/^[0-9a-fA-F]{24}$/))
  }

}
