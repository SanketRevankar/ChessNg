import { Player } from "./player";
import { Spot } from "./spot";

export interface Move {
    gameId: string
    moveId: number
    player: Player
    start?: Spot
    end?: Spot
    pieceKilled?: String
    castlingMove?: boolean
    pawnPromotion?: string
}
