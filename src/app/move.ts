import { Player } from "./player";
import { Piece } from "./piece";
import { Spot } from "./spot";

export interface Move {
    gameId: string
    player: Player
    start?: Spot
    end?: Spot
    pieceMoved?: Piece
    pieceKilled?: Piece
    castlingMove?: boolean
}
