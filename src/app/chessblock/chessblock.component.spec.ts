import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessblockComponent } from './chessblock.component';

describe('ChessblockComponent', () => {
  let component: ChessblockComponent;
  let fixture: ComponentFixture<ChessblockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChessblockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChessblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
