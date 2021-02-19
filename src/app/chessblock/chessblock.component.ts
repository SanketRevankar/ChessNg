import { Component, Input, OnInit } from '@angular/core';
import { Spot } from '../spot';

@Component({
  selector: 'app-chessblock',
  templateUrl: './chessblock.component.html',
  styleUrls: ['./chessblock.component.css']
})
export class ChessblockComponent implements OnInit {
  private blockBlack: string = '#26272bde'
  private blockWhite: string = '#b3b5c5de'
  // private blockBlack: string = '#8e614c' // classic
  // private blockWhite: string = '#ffcf91' // classic

  @Input() spot: Spot = { x: 0, y: 0 }
  blockClass: string = ''
  blockColor: string = ''
  pieceColor: string = ''
  pieceBorder: string = ''

  constructor() { }

  ngOnInit(): void {
    this.blockColor = this.getblockColor(this.spot.x, this.spot.y)
    if (this.spot.piece) {
      this.blockClass = this.getblockClass(this.spot.piece.name) + (this.spot.piece.white ? ' text-chess-white black-outline' : ' text-chess-black white-outline')
    }
  }

  getblockColor(x: number, y: number): string {
    return (x + y) % 2 === 0 ? this.blockBlack : this.blockWhite
  }

  getblockClass(name: string): string {
    switch (name) {
      case "Rook": return "fas fa-chess-rook"
      case "Knight": return "fas fa-chess-knight"
      case "Bishop": return "fas fa-chess-bishop";
      case "Queen": return "fas fa-chess-queen";
      case "King": return "fas fa-chess-king";
      case "Pawn": return "fas fa-chess-pawn";
    }
    return ''
  }

}
