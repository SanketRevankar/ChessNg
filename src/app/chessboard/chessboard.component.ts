import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChessserviceService } from '../chessservice.service';
import { Move } from '../move';
import { Spot } from '../spot';

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.css']
})
export class ChessboardComponent implements OnInit {
  gameId: any
  playerId: any
  board: Spot[][] = []
  move: any
  currentTurn: any
  status: any

  constructor(private route: ActivatedRoute, private chessserviceService: ChessserviceService) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    this.playerId = this.route.snapshot.paramMap.get('playerId');
    this.move = {
      gameId: this.gameId,
      player: { id: this.playerId, whiteSide: (this.playerId === '1' ? true : false) }
    }

    this.chessserviceService.show(this.gameId).subscribe(data => {
      this.board = data.board
      this.currentTurn = data.currentTurn
      this.status = data.status
    })
  }

  blockClicked(spot: Spot): void {
    if (!this.isValid(spot) || this.move.end) {
      return
    }

    if (this.move.start) {
      if (this.move.start === spot) {
        this.clearClicked();
        return
      }

      this.move.end = spot
      this.chessserviceService.play(this.move).subscribe(data => {
        if (data.moved === true) {
          this.board = data.board
          this.currentTurn = data.currentTurn
          this.status = data.status
        } else {
          console.log(data.error)
        }
        this.clearClicked()
      })
    } else {
      this.move.start = spot
      $(`#spot${spot.x}${spot.y}`).addClass('block-selected')
    }
  }

  clearClicked(): void {
    $(`#spot${this.move.start.x}${this.move.start.y}`).removeClass('block-selected')
    this.move = {
      gameId: this.gameId,
      player: { id: this.playerId, whiteSide: (this.playerId === '1' ? true : false) }
    }
  }

  isValid(spot: Spot) {
    let valid: boolean = false
    if (this.status === 'ACTIVE' && this.currentTurn == this.playerId) {
      if (this.move.start) {
        valid = true
      } else if (this.move.player.whiteSide === spot.piece?.white) {
        valid = true
      }
    }
    return valid
  }
}
