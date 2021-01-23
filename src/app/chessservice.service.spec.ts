import { TestBed } from '@angular/core/testing';

import { ChessserviceService } from './chessservice.service';

describe('ChessserviceService', () => {
  let service: ChessserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChessserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
