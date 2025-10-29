import { GameObject } from './types';

/**
 * Check if two game objects are colliding using AABB collision detection
 */
export function checkCollision(obj1: GameObject, obj2: GameObject): boolean {
  return (
    obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height > obj2.y
  );
}

/**
 * Get a random integer between min and max (inclusive)
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get a random element from an array
 */
export function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Load high score from localStorage
 */
export function loadHighScore(): number {
  const stored = localStorage.getItem('spaceShooterHighScore');
  return stored ? parseInt(stored, 10) : 0;
}

/**
 * Save high score to localStorage
 */
export function saveHighScore(score: number): void {
  localStorage.setItem('spaceShooterHighScore', score.toString());
}
