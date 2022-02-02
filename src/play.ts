import { EMapItem, EMove, EOrientation } from "./interfaces";
import Map from "./Map";

const g_orientation = Object.values(EOrientation);

const play = (map: Map) => {
    let nbAdventurerCompleteSequence = 0;
    let sequence = 0;

    while (nbAdventurerCompleteSequence < map.adventurers.length) {
        for (const adventurer of map.adventurers) {
            if (adventurer.moves.length > sequence) {
                const move = adventurer.moves[sequence];

                switch (move) {
                    case EMove.FORWARD:
                        let { x, y } = adventurer;

                        try {
                            switch (adventurer.orientation) {
                                case EOrientation.NORTH:
                                    --y;
                                    break;
                                case EOrientation.EAST:
                                    ++x;
                                    break;
                                case EOrientation.SOUTH:
                                    ++y;
                                    break;
                                case EOrientation.WEST:
                                    --x;
                                    break;
                            }
                        }
                        catch (_: any) {
                            // Out of range. Does nothing here.
                        }

                        const content = map.get(x, y);

                        if (content >= EMapItem.EMPTY && map.getAdventurer(x, y) === undefined) {

                            adventurer.x = x;
                            adventurer.y = y;
                            if (content !== EMapItem.EMPTY) {
                                map.set(x, y, content - 1);
                                adventurer.nbTreasure += 1;
                            }
                        }
                        break;
                    case EMove.RIGHT:
                        adventurer.orientation = g_orientation[(g_orientation.findIndex(orientation => orientation === adventurer.orientation)! + 1) % g_orientation.length];
                        break;
                    case EMove.LEFT:
                        let index = g_orientation.findIndex(orientation => orientation === adventurer.orientation)! - 1;

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

export default play;