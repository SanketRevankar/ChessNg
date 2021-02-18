import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Move } from './move';

@Injectable({
  providedIn: 'root'
})
export class ChessserviceService {
  private chessApi = '/api/'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
  }

  start(): Observable<any> {
    return this.http.get<any>(`${this.chessApi}start`);
  }

  join(gameId: string): Observable<any> {
    return this.http.post<any>(`${this.chessApi}join/${gameId}`, {});
  }

  show(gameId: string): Observable<any> {
    return this.http.get<any>(`${this.chessApi}game/${gameId}`);
  }

  play(move: Move): Observable<any> {
    return this.http.post<any>(`${this.chessApi}play`, move);
  }
}
