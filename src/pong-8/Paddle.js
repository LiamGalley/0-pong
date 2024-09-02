export default class Paddle {
	/**
	 * Represents a paddle that can move up and down. Used in the
	 * main program to deflect the ball back toward the opponent.
	 *
	 * @param {Number} x The paddle's X coordinate.
	 * @param {Number} y The paddle's Y coordinate.
	 * @param {Number} width The paddle's width.
	 * @param {Number} height The paddle's height.
	 * @param {Number} canvasHeight The height of the canvas.
	 */
	constructor(x, y, width, height, canvasHeight) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.halfheight = height / 2;
		this.canvasHeight = canvasHeight;
		this.dy = 0;
		this.maxSpeed = 1000;
	}

	moveUp() {
		this.dy = -this.maxSpeed;
	}

	moveDown() {
		this.dy = this.maxSpeed;
	}

	stop() {
		this.dy = 0;
	}

	/**
	 * Update our paddle based on its DX and DY only if we're in play state;
	 * scale the velocity by dt so movement is framerate-independent.
	 *
	 * @param {Number} dt Time since the last frame.
	 */
	update(dt) {
		/**
		 * Math.max here ensures that we're the greater of 0 or the player's
		 * current calculated Y position when pressing up so that we don't
		 * go into the negatives; the movement calculation is simply our
		 * previously-defined paddle speed scaled by dt.
		 */
		if (this.dy < 0) {
			this.y = Math.max(0, this.y + this.dy * dt);
		}
		/**
		 * Similar to before, this time we use Math.min to ensure we don't
		 * go any farther than the bottom of the screen minus the paddle's
		 * height (or else it will go partially below, since position is
		 * based on its top left corner).
		 */
		else {
			this.y = Math.min(this.canvasHeight - this.height, this.y + this.dy * dt);
		}
	}

	// Gives access to the second player to use the keyboard keys to move their paddle.
	playerMovement(keys, player) {
		if (keys.up) {
			player.moveUp();
		}
		else if (keys.down) {
			player.moveDown();
		}
		else {
			player.stop();
		}
	}

	// Similar as above, although it prevents the second player from using any keys.
	// Instead an AI is used to track the ball.
	AIMovement(ball, player, gameState){
		// Used to stop the paddle AI from going crazy trying to stay in the middle of the ball's y coordinate.
		if (gameState === "start" || gameState === "serve"){
			player.stop();
		}
		else{
			if (ball.y < player.y + player.halfheight) {
				player.moveUp();
			}
			else if (ball.height + ball.y > player.y + player.halfheight) {
				player.moveDown();
			}
			else {
				player.stop();
			}
		}
	}

	/**
	 * Draw the paddle to the screen.
	 *
	 * @param {CanvasRenderingContext2D} context
	 */
	render(context) {
		context.fillStyle = "white";
		context.fillRect(this.x, this.y, this.width, this.height);
	}
}
