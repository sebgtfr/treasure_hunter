"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const interfaces_1 = require("./interfaces");
const g_orientation = Object.values(interfaces_1.EOrientation);
const g_moves = Object.values(interfaces_1.EMove);
class Map {
    constructor(width, height) {
        this._adventurers = [];
        this._maxNameLength = 0;
        this._width = width;
        this._height = height;
        this._content = Array(width * height).fill(interfaces_1.EMapItem.EMPTY);
    }
    get adventurers() {
        return this._adventurers;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    isValidCoordinate(x, y) {
        if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
            throw new RangeError('Out of range !');
        }
    }
    computePosition(x, y) {
        return y * this._width + x;
    }
    get(x, y) {
        this.isValidCoordinate(x, y);
        return this._content[this.computePosition(x, y)];
    }
    set(x, y, item) {
        this.isValidCoordinate(x, y);
        this._content[this.computePosition(x, y)] = item;
    }
    getAdventurer(x, y) {
        return this._adventurers.find(adventurer => adventurer.x === x && adventurer.y === y);
    }
    getCaseContentForMap(x, y) {
        const item = this.get(x, y);
        switch (item) {
            case interfaces_1.EMapItem.MOUNTAIN:
                return interfaces_1.EMapOutputCase.MOUNTAIN;
            case interfaces_1.EMapItem.EMPTY:
                const adventurer = this.getAdventurer(x, y);
                return adventurer ? `${interfaces_1.EMapOutputCase.ADVENTURER}(${adventurer.name})` : interfaces_1.EMapOutputCase.EMPTY;
            default:
                return `${interfaces_1.EMapOutputCase.TREASURE}(${item})`;
        }
    }
    getCaseContentForFile(x, y) {
        const item = this.get(x, y);
        switch (item) {
            case interfaces_1.EMapItem.MOUNTAIN:
                return interfaces_1.EMapOutputCase.MOUNTAIN;
            case interfaces_1.EMapItem.EMPTY:
                return '';
            default:
                return interfaces_1.EMapOutputCase.TREASURE;
        }
    }
    isEmpty(x, y) {
        return this.getCaseContentForFile(x, y) === '' && this.getAdventurer(x, y) === undefined;
    }
    addAdventurer(name, x, y, orientation, moveSequence) {
        const moves = moveSequence.split('');
        const failIndex = moves.findIndex(move => !g_moves.includes(move));
        if (failIndex !== -1) {
            throw new Error(`${moves[failIndex]} is not a valid movement !`);
        }
        if (!g_orientation.includes(orientation)) {
            throw new Error(`${orientation} is not a valid orientation !`);
        }
        if (!this.isEmpty(x, y)) {
            throw new Error(`Adventurer can't be insert at position ${x}-${y} !`);
        }
        this._maxNameLength = Math.max(this._maxNameLength, name.length);
        this._adventurers.push({
            name,
            x,
            y,
            orientation: orientation,
            moves: moves,
            nbTreasure: 0
        });
    }
    render() {
        // Get maximum number of spaces (max length name + "A()" length + 2 spaces)
        const spaces = Array(this._maxNameLength + 5).fill(' ').join('');
        let output = '';
        let content;
        for (let y = 0; y < this.height; ++y) {
            for (let x = 0; x < this.width; ++x) {
                if (x !== 0) {
                    output += spaces.substring(0, spaces.length - content.length);
                }
                content = this.getCaseContentForMap(x, y);
                output += content;
            }
            output += os_1.EOL;
        }
        return output;
    }
}
exports.default = Map;
