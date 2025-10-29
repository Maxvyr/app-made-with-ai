import { useEffect, useRef, useState } from 'react';
import { Player, Enemy, Bullet, GameState, GameStats } from './types';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  PLAYER_SPEED,
  PLAYER_LIVES,
  SHOT_COOLDOWN,
  ENEMY_WIDTH,
  ENEMY_HEIGHT,
  ENEMY_SPEED,
  ENEMY_SPAWN_INTERVAL,
  MAX_ENEMIES,
  BULLET_WIDTH,
  BULLET_HEIGHT,
  BULLET_SPEED,
  MAX_BULLETS,
  PLAYER_COLOR,
  ENEMY_COLOR,
  BULLET_COLOR,
  BACKGROUND_COLOR,
  SCORE_PER_ENEMY,
  LEVEL_THRESHOLD,
} from './constants';
import { checkCollision, randomInt, randomChoice, loadHighScore, saveHighScore } from './utils';

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>('menu');
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    highScore: loadHighScore(),
    level: 1,
  });

  // Game objects refs
  const playerRef = useRef<Player>({
    x: CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2,
    y: CANVAS_HEIGHT - PLAYER_HEIGHT - 20,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    speed: PLAYER_SPEED,
    lives: PLAYER_LIVES,
    lastShot: 0,
  });

  const enemiesRef = useRef<Enemy[]>([]);
  const bulletsRef = useRef<Bullet[]>([]);
  const keysRef = useRef<Set<string>>(new Set());
  const lastEnemySpawnRef = useRef<number>(0);
  const animationFrameRef = useRef<number>();

  // Initialize game
  const initGame = () => {
    playerRef.current = {
      x: CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2,
      y: CANVAS_HEIGHT - PLAYER_HEIGHT - 20,
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
      speed: PLAYER_SPEED,
      lives: PLAYER_LIVES,
      lastShot: 0,
    };
    enemiesRef.current = [];
    bulletsRef.current = [];
    lastEnemySpawnRef.current = 0;
    setStats((prev) => ({
      ...prev,
      score: 0,
      level: 1,
    }));
  };

  // Start game
  const startGame = () => {
    initGame();
    setGameState('playing');
  };

  // Spawn enemy
  const spawnEnemy = () => {
    if (enemiesRef.current.length < MAX_ENEMIES) {
      const pattern = randomChoice(['straight', 'zigzag', 'sine'] as const);
      const enemy: Enemy = {
        x: randomInt(0, CANVAS_WIDTH - ENEMY_WIDTH),
        y: -ENEMY_HEIGHT,
        width: ENEMY_WIDTH,
        height: ENEMY_HEIGHT,
        speed: ENEMY_SPEED + (stats.level - 1) * 0.5,
        pattern,
        phase: 0,
      };
      enemiesRef.current.push(enemy);
    }
  };

  // Shoot bullet
  const shootBullet = () => {
    const now = Date.now();
    if (
      now - playerRef.current.lastShot > SHOT_COOLDOWN &&
      bulletsRef.current.length < MAX_BULLETS
    ) {
      const bullet: Bullet = {
        x: playerRef.current.x + PLAYER_WIDTH / 2 - BULLET_WIDTH / 2,
        y: playerRef.current.y,
        width: BULLET_WIDTH,
        height: BULLET_HEIGHT,
        speed: BULLET_SPEED,
        active: true,
      };
      bulletsRef.current.push(bullet);
      playerRef.current.lastShot = now;
    }
  };

  // Update player position
  const updatePlayer = () => {
    const player = playerRef.current;

    if (keysRef.current.has('ArrowLeft') || keysRef.current.has('a')) {
      player.x = Math.max(0, player.x - player.speed);
    }
    if (keysRef.current.has('ArrowRight') || keysRef.current.has('d')) {
      player.x = Math.min(CANVAS_WIDTH - PLAYER_WIDTH, player.x + player.speed);
    }
    if (keysRef.current.has('ArrowUp') || keysRef.current.has('w')) {
      player.y = Math.max(0, player.y - player.speed);
    }
    if (keysRef.current.has('ArrowDown') || keysRef.current.has('s')) {
      player.y = Math.min(CANVAS_HEIGHT - PLAYER_HEIGHT, player.y + player.speed);
    }
    if (keysRef.current.has(' ')) {
      shootBullet();
    }
  };

  // Update enemies
  const updateEnemies = () => {
    enemiesRef.current = enemiesRef.current.filter((enemy) => {
      enemy.y += enemy.speed;
      enemy.phase += 0.1;

      // Apply movement patterns
      if (enemy.pattern === 'zigzag') {
        enemy.x += Math.sin(enemy.phase) * 2;
      } else if (enemy.pattern === 'sine') {
        enemy.x += Math.sin(enemy.phase) * 3;
      }

      // Check collision with player
      if (checkCollision(enemy, playerRef.current)) {
        playerRef.current.lives -= 1;
        if (playerRef.current.lives <= 0) {
          setGameState('gameover');
          if (stats.score > stats.highScore) {
            saveHighScore(stats.score);
            setStats((prev) => ({ ...prev, highScore: stats.score }));
          }
        }
        return false;
      }

      // Remove if off screen
      return enemy.y < CANVAS_HEIGHT + ENEMY_HEIGHT;
    });
  };

  // Update bullets
  const updateBullets = () => {
    bulletsRef.current = bulletsRef.current.filter((bullet) => {
      bullet.y -= bullet.speed;

      // Check collision with enemies
      for (let i = 0; i < enemiesRef.current.length; i++) {
        const enemy = enemiesRef.current[i];
        if (checkCollision(bullet, enemy)) {
          enemiesRef.current.splice(i, 1);
          const newScore = stats.score + SCORE_PER_ENEMY;
          setStats((prev) => ({
            score: newScore,
            highScore: Math.max(prev.highScore, newScore),
            level: Math.floor(newScore / LEVEL_THRESHOLD) + 1,
          }));
          return false;
        }
      }

      // Remove if off screen
      return bullet.y > -BULLET_HEIGHT;
    });
  };

  // Draw game
  const draw = (ctx: CanvasRenderingContext2D) => {
    // Clear canvas
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw stars background
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 50; i++) {
      const x = (i * 123) % CANVAS_WIDTH;
      const y = (i * 456 + Date.now() / 50) % CANVAS_HEIGHT;
      ctx.fillRect(x, y, 2, 2);
    }

    // Draw player
    ctx.fillStyle = PLAYER_COLOR;
    ctx.beginPath();
    ctx.moveTo(playerRef.current.x + PLAYER_WIDTH / 2, playerRef.current.y);
    ctx.lineTo(playerRef.current.x, playerRef.current.y + PLAYER_HEIGHT);
    ctx.lineTo(playerRef.current.x + PLAYER_WIDTH, playerRef.current.y + PLAYER_HEIGHT);
    ctx.closePath();
    ctx.fill();

    // Draw enemies
    ctx.fillStyle = ENEMY_COLOR;
    enemiesRef.current.forEach((enemy) => {
      ctx.beginPath();
      ctx.moveTo(enemy.x + ENEMY_WIDTH / 2, enemy.y + ENEMY_HEIGHT);
      ctx.lineTo(enemy.x, enemy.y);
      ctx.lineTo(enemy.x + ENEMY_WIDTH, enemy.y);
      ctx.closePath();
      ctx.fill();
    });

    // Draw bullets
    ctx.fillStyle = BULLET_COLOR;
    bulletsRef.current.forEach((bullet) => {
      ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });

    // Draw HUD
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${stats.score}`, 10, 30);
    ctx.fillText(`Lives: ${playerRef.current.lives}`, 10, 60);
    ctx.fillText(`Level: ${stats.level}`, 10, 90);
    ctx.fillText(`High Score: ${stats.highScore}`, CANVAS_WIDTH - 200, 30);
  };

  // Game loop
  const gameLoop = () => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Spawn enemies
    const now = Date.now();
    if (now - lastEnemySpawnRef.current > ENEMY_SPAWN_INTERVAL / stats.level) {
      spawnEnemy();
      lastEnemySpawnRef.current = now;
    }

    // Update game objects
    updatePlayer();
    updateEnemies();
    updateBullets();

    // Draw
    draw(ctx);

    // Continue loop
    animationFrameRef.current = requestAnimationFrame(gameLoop);
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && (gameState === 'menu' || gameState === 'gameover')) {
        startGame();
      }
      if (e.key === 'p' && gameState === 'playing') {
        setGameState('paused');
      }
      if (e.key === 'p' && gameState === 'paused') {
        setGameState('playing');
      }
      keysRef.current.add(e.key.toLowerCase());
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.toLowerCase());
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  // Start game loop
  useEffect(() => {
    if (gameState === 'playing') {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState, stats.level, stats.score]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border-4 border-white rounded-lg shadow-2xl"
      />

      {gameState === 'menu' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold mb-8">SPACE SHOOTER</h1>
            <p className="text-2xl mb-4">Press ENTER to Start</p>
            <div className="text-left mx-auto max-w-md mt-8 text-lg">
              <p className="mb-2">Controls:</p>
              <p>• Arrow Keys / WASD - Move</p>
              <p>• Spacebar - Shoot</p>
              <p>• P - Pause</p>
            </div>
            <p className="mt-8 text-xl">High Score: {stats.highScore}</p>
          </div>
        </div>
      )}

      {gameState === 'paused' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold mb-8">PAUSED</h1>
            <p className="text-2xl">Press P to Resume</p>
          </div>
        </div>
      )}

      {gameState === 'gameover' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold mb-8">GAME OVER</h1>
            <p className="text-3xl mb-4">Final Score: {stats.score}</p>
            <p className="text-2xl mb-8">High Score: {stats.highScore}</p>
            <p className="text-2xl">Press ENTER to Restart</p>
          </div>
        </div>
      )}
    </div>
  );
}
