// Enum use by Parser to create Map from file.
export enum EMapParsing {
    MAP = 'C',
    MOUNTAIN = 'M',
    TREASURE = 'T',
    ADVENTURER = 'A'
};

// Enum use for adventurers' orientation.
export enum EOrientation {
    NORTH = 'N',
    EAST = 'E',
    SOUTH = 'S',
    WEST = 'O',
};

// Enum use for adventurers' movements.
export enum EMove {
    FORWARD = 'A',
    LEFT = 'G',
    RIGHT = 'D',
};

// Enum used by Map to define case content.
// The case will have 3 states possible:
// All minus numbers are for obstacles.
// Any 0 meant nothing.
// Any positive number is for the value of the treasures.
export enum EMapItem {
    MOUNTAIN = -1,
    EMPTY = 0,
};

// Enum use by Map to create output format.
export enum EMapOutputCase {
    MOUNTAIN = 'M',
    TREASURE = 'T',
    ADVENTURER = 'A',
    EMPTY = '.',
};

export type TAdventurer = {
    /**
     * Adventurer's name
     */
    name: string;

    /**
     * Position X of the adventurer
     */
    x: number;

    /**
     * Position Y of the adventurer
     */
    y: number;

    /**
     * Adventurer's orientation.
     * It can be NORTH, SOUTH, EAST or WEST.
     */
    orientation: EOrientation;

    /**
     * Adventurers' movements.
     */
    moves: EMove[];

    /**
     * Adventurers' number of treasures.
     */
    nbTreasure: number;
}

export type TAdventurers = TAdventurer[];