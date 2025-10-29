export interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}

export interface Player extends GameObject {
  lives: number;
  lastShot: number;
}

export interface Enemy extends GameObject {
  pattern: 'straight' | 'zigzag' | 'sine';
  phase: number;
}

export interface Bullet extends GameObject {
  active: boolean;
}

export type GameState = 'menu' | 'playing' | 'paused' | 'gameover';

export interface GameStats {
  score: number;
  highScore: number;
  level: number;
}
