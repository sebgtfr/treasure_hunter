"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("./interfaces");
const g_orientation = Object.values(interfaces_1.EOrientation);
const play = (map) => {
    let nbAdventurerCompleteSequence = 0;
    let sequence = 0;
    while (nbAdventurerCompleteSequence < map.adventurers.length) {
        for (const adventurer of map.adventurers) {
            if (adventurer.moves.length > sequence) {
                const move = adventurer.moves[sequence];
                switch (move) {
                    case interfaces_1.EMove.FORWARD:
                        let { x, y } = adventurer;
                        try {
                            switch (adventurer.orientation) {
                                case interfaces_1.EOrientation.NORTH:
                                    --y;
                                    break;
                                case interfaces_1.EOrientation.EAST:
                                    ++x;
                                    break;
                                case interfaces_1.EOrientation.SOUTH:
                                    ++y;
                                    break;
                                case interfaces_1.EOrientation.WEST:
                                    --x;
                                    break;
                            }
                        }
                        catch (_) {
                            // Out of range. Does nothing here.
                        }
                        const content = map.get(x, y);
                        if (content >= interfaces_1.EMapItem.EMPTY && map.getAdventurer(x, y) === undefined) {
                            adventurer.x = x;
                            adventurer.y = y;
                            if (content !== interfaces_1.EMapItem.EMPTY) {
                                map.set(x, y, content - 1);
                                adventurer.nbTreasure += 1;
                            }
                        }
                        break;
                    case interfaces_1.EMove.RIGHT:
                        adventurer.orientation = g_orientation[(g_orientation.findIndex(orientation => orientation === adventurer.orientation) + 1) % g_orientation.length];
                        break;
                    case interfaces_1.EMove.LEFT:
                        let index = g_orientation.findIndex(orientation => orientation === adventurer.orientation) - 1;
                        adventurer.orientation = g_orientation[index < 0 ? g_orientation.length - 1 : index];
                        break;
                }
            }
            else if (adventurer.moves.length === sequence) {
                ++nbAdventurerCompleteSequence;
            }
        }
        ++sequence;
    }
};
exports.default = play;
