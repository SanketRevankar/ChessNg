import { Board } from "./board";
import { Move } from "./move";
import { Player } from "./player";

export interface Game {
    id: string
    players: Player[]
    board: Board
    currentTurn: Player
    status: string
    currentMoveNumber?: number
    movesPlayed?: Move[]

}
