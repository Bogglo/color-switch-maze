// utils/physics.js

const Physics = {
    // Color mapping matching levels.json
    colors: {
        1: '#FF0055', // Red
        2: '#00FF55', // Green
        3: '#00CCFF', // Blue
        4: '#FFFF00'  // Yellow
    },

    checkWallCollision(player, grid, tileSize) {
        // Determine grid coordinates of player's center
        const col = Math.floor(player.x / tileSize);
        const row = Math.floor(player.y / tileSize);

        // Boundary checks
        if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
            return true; // Hit world boundary
        }

        const tileValue = grid[row][col];

        // 0 is path, 8 is start, 9 is exit (treat as path for movement)
        if (tileValue === 0 || tileValue === 8 || tileValue === 9) {
            return false; 
        }

        // It's a wall (1-4). Check color match.
        const wallColorHex = this.colors[tileValue];
        
        // If wall color doesn't match player color, it's a collision
        if (wallColorHex !== player.color) {
            return true;
        }

        return false; // Colors match, pass through
    },

    checkExit(player, grid, tileSize) {
        const col = Math.floor(player.x / tileSize);
        const row = Math.floor(player.y / tileSize);

        if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length) {
            return grid[row][col] === 9;
        }
        return false;
    },

    movePlayer(player, direction, speed, grid, tileSize) {
        // Attempt X movement
        player.x += direction.x * speed;
        if (this.checkWallCollision(player, grid, tileSize)) {
            player.x -= direction.x * speed; // Revert if hit
        }

        // Attempt Y movement
        player.y += direction.y * speed;
        if (this.checkWallCollision(player, grid, tileSize)) {
            player.y -= direction.y * speed; // Revert if hit
        }
    }
};