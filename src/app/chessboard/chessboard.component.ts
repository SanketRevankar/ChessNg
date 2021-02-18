import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChessserviceService } from '../chessservice.service';
import { AuthenticationService } from '../authentication.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Spot } from '../spot';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Game } from '../game';

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.css']
})
export class ChessboardComponent implements OnInit {
  game: Game
  playerId: any
  move: any
  subject: any
  serverUrl = '/ws/games'
  stompClient: any;

  constructor(private route: ActivatedRoute,
    private chessserviceService: ChessserviceService,
    private authenticationService: AuthenticationService,
    private _snackBar: MatSnackBar) {
    this.playerId = authenticationService.userValue.id
    this.game = {
      id: '',
      players: [],
      board: { boxes: [] },
      currentTurn: { id: '', name: '', whiteSide: false },
      status: '',
      movesPlayed: []
    }
  }

  ngOnInit(): void {
    this.game.id = String(this.route.snapshot.paramMap.get('gameId'));
    this.chessserviceService.show(this.game.id).subscribe(data => {
      this.game = data

      this.move = {
        gameId: this.game.id,
        player: this.getPlayer()
      }

      if (this.game.status === "ACTIVE" || this.game.status === "CREATED") {
        this.initializeWebSocketConnection();
      }
    })
  }

  getPlayer() {
    if (this.game.players[0].id === this.playerId) {
      return this.game.players[0]
    }
    if (this.game.players[1].id === this.playerId) {
      return this.game.players[1]
    }
    return false;
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    this.stompClient.debug = function () { };
    let that = this;
    this.stompClient.connect({}, function (frame: any) {
      that.stompClient.subscribe("/topic/game/" + that.game.id, (data: Stomp.Frame) => {
        let game: Game = JSON.parse(data.body);
        that.game = game
        that.move = {
          gameId: that.game.id,
          player: that.getPlayer()
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.stompClient !== undefined) {
      this.stompClient.unsubscribe("/topic/game/" + this.game.id);
      this.stompClient.disconnect(() => { })
    }
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
      this.chessserviceService.play(this.move).subscribe(data => { })
      this.clearClicked()
    } else {
      this.move.start = spot
      $(`#spot${spot.x}${spot.y}`).addClass('block-selected')
    }
  }

  clearClicked(): void {
    $(`#spot${this.move.start.x}${this.move.start.y}`).removeClass('block-selected')
    this.move = {
      gameId: this.game.id,
      player: this.getPlayer()
    }
  }

  isValid(spot: Spot) {
    let valid: boolean = false
    if (this.game.status === 'ACTIVE' && this.game.currentTurn.id == this.playerId) {
      if (this.move.start) {
        valid = true
      } else if (this.move.player.whiteSide === (spot.piece ? spot.piece.white : '')) {
        valid = true
      }
    }
    return valid
  }

  copyGameId() {
    this._snackBar.open('Copied!', 'Thanks!', { horizontalPosition: 'center', verticalPosition: 'top', panelClass: 'z-index-2000' });
  }
}
