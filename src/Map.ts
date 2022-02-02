import { EOL } from 'os';
import { EMapItem, EMapOutputCase, EMove, EOrientation, TAdventurer, TAdventurers } from './interfaces';

const g_orientation = Object.values(EOrientation);
const g_moves = Object.values(EMove);

class Map {
    private _width!: number;
    private _height!: number;
    private _content!: number[];
    private _adventurers: TAdventurers = [];
    private _maxNameLength = 0;

    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
        this._content = Array(width * height).fill(EMapItem.EMPTY);
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

    private isValidCoordinate(x: number, y: number) {
        if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
            throw new RangeError('Out of range !');
        }
    }

    private computePosition(x: number, y: number) {
        return y * this._width + x;
    }

    public get(x: number, y: number) {
        this.isValidCoordinate(x, y);
        return this._content[this.computePosition(x, y)];
    }

    public set(x: number, y: number, item: number) {
        this.isValidCoordinate(x, y);
        this._content[this.computePosition(x, y)] = item;
    }

    public getAdventurer(x: number, y: number) {
        return this._adventurers.find(adventurer => adventurer.x === x && adventurer.y === y);
    }

    public getCaseContentForMap(x: number, y: number) {
        const item = this.get(x, y);

        switch (item) {
            case EMapItem.MOUNTAIN:
                return EMapOutputCase.MOUNTAIN;
            case EMapItem.EMPTY:
                const adventurer = this.getAdventurer(x, y);

                return adventurer ? `${EMapOutputCase.ADVENTURER}(${adventurer.name})` : EMapOutputCase.EMPTY;
            default:
                return `${EMapOutputCase.TREASURE}(${item})`;
        }
    }

    public getCaseContentForFile(x: number, y: number) {
        const item = this.get(x, y);

        switch (item) {
            case EMapItem.MOUNTAIN:
                return EMapOutputCase.MOUNTAIN;
            case EMapItem.EMPTY:
                return '';
            default:
                return EMapOutputCase.TREASURE;
        }
    }

    public isEmpty(x: number, y: number) {
        return this.getCaseContentForFile(x, y) === '' && this.getAdventurer(x, y) === undefined;
    }

    public addAdventurer(name: TAdventurer['name'], x: number, y: number, orientation: string, moveSequence: string) {
        const moves = moveSequence.split('');
        const failIndex = moves.findIndex(move => !g_moves.includes(move as any));

        if (failIndex !== -1) {
            throw new Error(`${moves[failIndex]} is not a valid movement !`);
        }

        if (!g_orientation.includes(orientation as any)) {
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
            orientation: orientation as EOrientation,
            moves: moves as EMove[],
            nbTreasure: 0
        });
    }

    public render() {
        // Get maximum number of spaces (max length name + "A()" length + 2 spaces)
        const spaces = Array(this._maxNameLength + 5).fill(' ').join('');

        let output = '';
        let content!: string;

        for (let y = 0; y < this.height; ++y) {
            for (let x = 0; x < this.width; ++x) {
                if (x !== 0) {
                    output += spaces.substring(0, spaces.length - content.length);
                }
                content = this.getCaseContentForMap(x, y);
                output += content;
            }
            output += EOL;
        }
        return output;
    }
}

export default Map;