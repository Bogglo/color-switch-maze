// utils/renderer.js

const Renderer = {
    ctx: null,
    width: 0,
    height: 0,

    init(canvas) {
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
    },

    clear() {
        this.ctx.fillStyle = '#111';
        this.ctx.fillRect(0, 0, this.width, this.height);
    },

    drawGrid(grid, tileSize, offsetX, offsetY) {
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                const val = grid[row][col];
                const x = offsetX + col * tileSize;
                const y = offsetY + row * tileSize;

                if (val === 0) continue; // Don't draw empty space

                this.ctx.shadowBlur = 10;
                
                if (val === 8) { // Start
                    this.ctx.fillStyle = '#FFF';
                    this.ctx.shadowColor = '#FFF';
                    this.ctx.fillRect(x + 10, y + 10, tileSize - 20, tileSize - 20);
                } else if (val === 9) { // Exit
                    this.ctx.fillStyle = '#FFF';
                    this.ctx.shadowColor = '#FFF';
                    this.ctx.beginPath();
                    this.ctx.arc(x + tileSize/2, y + tileSize/2, tileSize/3, 0, Math.PI * 2);
                    this.ctx.fill();
                } else { // Walls (1-4)
                    this.ctx.fillStyle = Physics.colors[val];
                    this.ctx.shadowColor = Physics.colors[val];
                    this.ctx.fillRect(x, y, tileSize, tileSize);
                }
                
                this.ctx.shadowBlur = 0; // Reset
            }
        }
    },

    drawPlayer(player) {
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = player.color;
        this.ctx.fillStyle = player.color;
        
        this.ctx.beginPath();
        this.ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
    },

    drawUI(levelName, score) {
        this.ctx.fillStyle = '#FFF';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(`Level: ${levelName}`, 20, 30);
    }
};