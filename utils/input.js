// utils/input.js

const InputHandler = {
    keys: {},
    init() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
        });
        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
    },
    isDown(code) {
        return !!this.keys[code];
    },
    getDirection() {
        let x = 0;
        let y = 0;
        if (this.isDown('ArrowUp') || this.isDown('KeyW')) y = -1;
        if (this.isDown('ArrowDown') || this.isDown('KeyS')) y = 1;
        if (this.isDown('ArrowLeft') || this.isDown('KeyA')) x = -1;
        if (this.isDown('ArrowRight') || this.isDown('KeyD')) x = 1;
        return { x, y };
    }
};