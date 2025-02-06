import pygame
import random

pygame.init()
pygame.font.init()

# Screen dimensions
WIDTH, HEIGHT = 600, 800
WIN = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Space Shooter")

# Frame rate
FPS = 60
clock = pygame.time.Clock()

# Colors
WHITE = (255, 255, 255)
RED = (255, 0, 0)
BLUE = (0, 100, 255)
GREEN = (0, 255, 0)
YELLOW = (255, 255, 0)
BLACK = (0, 0, 0)

# Fonts
score_font = pygame.font.SysFont("comicsans", 30)
game_over_font = pygame.font.SysFont("comicsans", 60)


# Player class
class Player:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.width = 40
        self.height = 60
        self.velocity = 5
        self.cool_down = 0  # frames until next shot allowed
        self.cool_down_time = 15  # delay between shots in frames
        self.bullets = []
        self.lives = 3

    def draw(self, win):
        # Draw the spaceship as a triangle: its base is at the bottom.
        point1 = (self.x, self.y)  # bottom left
        point2 = (self.x + self.width, self.y)  # bottom right
        point3 = (self.x + self.width // 2, self.y - self.height)  # top center
        pygame.draw.polygon(win, BLUE, [point1, point2, point3])

    def shoot(self):
        if self.cool_down == 0:
            # Bullet appears at the top center of the spaceship.
            bullet = Bullet(self.x + self.width // 2, self.y - self.height)
            self.bullets.append(bullet)
            self.cool_down = self.cool_down_time

    def cooldown_tick(self):
        if self.cool_down > 0:
            self.cool_down -= 1


# Bullet class
class Bullet:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.radius = 5
        self.color = YELLOW
        self.velocity = 7

    def move(self):
        self.y -= self.velocity

    def draw(self, win):
        pygame.draw.circle(win, self.color, (self.x, self.y), self.radius)

    def collide(self, enemy):
        # Simple collision: check if the bullet point is within the enemy's rectangle.
        enemy_rect = pygame.Rect(enemy.x, enemy.y, enemy.width, enemy.height)
        return enemy_rect.collidepoint(self.x, self.y)


# Enemy class
class Enemy:
    def __init__(self, x, y, width, height, velocity):
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        self.velocity = velocity
        self.color = RED

    def move(self):
        self.y += self.velocity

    def draw(self, win):
        pygame.draw.rect(win, self.color, (self.x, self.y, self.width, self.height))

    def collide(self, player):
        # For collision with the player, we approximate the drawn triangle with a rectangle.
        enemy_rect = pygame.Rect(self.x, self.y, self.width, self.height)
        player_rect = pygame.Rect(
            player.x, player.y - player.height, player.width, player.height
        )
        return enemy_rect.colliderect(player_rect)


def draw_window(win, player, enemies, score):
    win.fill(BLACK)
    # Draw the player
    player.draw(win)
    # Draw the player’s bullets
    for bullet in player.bullets:
        bullet.draw(win)
    # Draw enemy ships
    for enemy in enemies:
        enemy.draw(win)
    # Draw score and lives
    score_label = score_font.render(f"Score: {score}", 1, WHITE)
    lives_label = score_font.render(f"Lives: {player.lives}", 1, WHITE)
    win.blit(score_label, (10, 10))
    win.blit(lives_label, (WIDTH - lives_label.get_width() - 10, 10))
    pygame.display.update()


def draw_game_over(win, score):
    win.fill(BLACK)
    game_over_label = game_over_font.render("GAME OVER", 1, RED)
    score_label = score_font.render(f"Final Score: {score}", 1, WHITE)
    win.blit(
        game_over_label,
        ((WIDTH - game_over_label.get_width()) // 2, HEIGHT // 2 - 50),
    )
    win.blit(score_label, ((WIDTH - score_label.get_width()) // 2, HEIGHT // 2 + 20))
    pygame.display.update()
    pygame.time.delay(3000)


def main():
    run = True
    score = 0
    player = Player(WIDTH // 2 - 20, HEIGHT - 50)
    enemies = []
    enemy_spawn_delay = 90  # frames between enemy spawns
    enemy_spawn_timer = 0

    while run:
        clock.tick(FPS)
        enemy_spawn_timer += 1

        # Spawn a new enemy periodically.
        if enemy_spawn_timer >= enemy_spawn_delay:
            enemy_width = 40
            enemy_height = 40
            enemy_x = random.randint(0, WIDTH - enemy_width)
            enemy_y = -enemy_height
            # Increase enemy speed as the score increases.
            enemy_velocity = 2 + score // 20
            enemies.append(Enemy(enemy_x, enemy_y, enemy_width,
                                 enemy_height, enemy_velocity))
            enemy_spawn_timer = 0

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False

        # Handle continuous key presses for movement and shooting.
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT] and player.x - player.velocity > 0:
            player.x -= player.velocity
        if keys[pygame.K_RIGHT] and player.x + player.velocity + player.width < WIDTH:
            player.x += player.velocity
        if keys[pygame.K_SPACE]:
            player.shoot()

        # Update the shooting cooldown timer.
        player.cooldown_tick()

        # Move bullets and check for collisions with enemies:
        score_delta = 0
        for bullet in player.bullets[:]:
            bullet.move()
            # Remove the bullet if off-screen.
            if bullet.y < 0:
                player.bullets.remove(bullet)
            else:
                for enemy in enemies[:]:
                    if bullet.collide(enemy):
                        try:
                            enemies.remove(enemy)
                            if bullet in player.bullets:
                                player.bullets.remove(bullet)
                            score_delta += 1
                        except ValueError:
                            pass
        score += score_delta

        # Move enemies and check if they hit the player or go off-screen.
        for enemy in enemies[:]:
            enemy.move()
            # Collision with player
            if enemy.collide(player):
                player.lives -= 1
                enemies.remove(enemy)
            # Enemy passed the bottom of the screen
            elif enemy.y > HEIGHT:
                enemies.remove(enemy)
                player.lives -= 1

        # End the game if the player is out of lives.
        if player.lives <= 0:
            draw_game_over(WIN, score)
            run = False

        draw_window(WIN, player, enemies, score)

    pygame.quit()


if __name__ == "__main__":
    main()
