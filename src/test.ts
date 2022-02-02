import { EOL } from "os";
import { getMapFromFile } from "./file";
import { EMapItem, EOrientation } from "./interfaces";
import { parseFromDescriptionToMap, parseMapToDescription } from "./parseMap";
import play from "./play";

const g_map = "./maps/3x4.txt";
const g_mapBis = "./maps/3x4_bis.txt";

describe(`Test algo on "${g_map}" and "${g_mapBis}". both have same content in different format.`, () => {
    const map = parseFromDescriptionToMap(getMapFromFile(g_map));
    const mapBis = parseFromDescriptionToMap(getMapFromFile(g_mapBis));

    it("Compare parsed map dimensions", () => {
        expect(map.width).toBe(3);
        expect(map.height).toBe(4);

        expect(mapBis.width).toBe(map.width);
        expect(mapBis.height).toBe(map.height);
    });

    it("Compare parsed map case content (mountains and treasures)", () => {
        expect(map.get(1, 0)).toBe(EMapItem.MOUNTAIN);
        expect(mapBis.get(1, 0)).toBe(EMapItem.MOUNTAIN);

        expect(map.get(2, 1)).toBe(EMapItem.MOUNTAIN);
        expect(mapBis.get(2, 1)).toBe(EMapItem.MOUNTAIN);

        expect(map.get(0, 3)).toBe(2);
        expect(mapBis.get(0, 3)).toBe(2);

        expect(map.get(1, 3)).toBe(3);
        expect(mapBis.get(1, 3)).toBe(3);
    });

    it("Compare parsed map adventurers", () => {
        expect(map.adventurers.length).toBe(1);
        expect(mapBis.adventurers.length).toBe(map.adventurers.length);

        const adventurer = map.adventurers[0];
        const adventurerBis = mapBis.adventurers[0];

        expect(adventurer.name).toBe("Lara");
        expect(adventurer.x).toBe(1);
        expect(adventurer.y).toBe(1);
        expect(adventurer.orientation).toBe(EOrientation.SOUTH);
        expect(adventurer.moves.join('')).toBe("AADADAGGA");
        expect(adventurer.nbTreasure).toBe(0);

        expect(adventurerBis.name).toBe(adventurer.name);
        expect(adventurerBis.x).toBe(adventurer.x);
        expect(adventurerBis.y).toBe(adventurer.y);
        expect(adventurerBis.orientation).toBe(adventurer.orientation);
        expect(adventurerBis.moves.join('')).toBe(adventurer.moves.join(''));
        expect(adventurerBis.nbTreasure).toBe(adventurer.nbTreasure);
    });

    it("Compare parsed map play result", () => {
        play(map);
        play(mapBis);

        expect(map.get(1, 0)).toBe(EMapItem.MOUNTAIN);
        expect(mapBis.get(1, 0)).toBe(EMapItem.MOUNTAIN);

        expect(map.get(2, 1)).toBe(EMapItem.MOUNTAIN);
        expect(mapBis.get(2, 1)).toBe(EMapItem.MOUNTAIN);

        expect(map.get(0, 3)).toBe(0);
        expect(mapBis.get(0, 3)).toBe(0);

        expect(map.get(1, 3)).toBe(2);
        expect(mapBis.get(1, 3)).toBe(2);

        const adventurer = map.adventurers[0];
        const adventurerBis = mapBis.adventurers[0];

        expect(adventurer.name).toBe("Lara");
        expect(adventurer.x).toBe(0);
        expect(adventurer.y).toBe(3);
        expect(adventurer.orientation).toBe(EOrientation.SOUTH);
        expect(adventurer.nbTreasure).toBe(3);

        expect(adventurerBis.name).toBe(adventurer.name);
        expect(adventurerBis.x).toBe(adventurer.x);
        expect(adventurerBis.y).toBe(adventurer.y);
        expect(adventurerBis.orientation).toBe(adventurer.orientation);
        expect(adventurerBis.nbTreasure).toBe(adventurer.nbTreasure);
    });

    it("Compare parsed map final render", () => {
        const render = `
.        M        .
.        .        M
.        .        .
A(Lara)  T(2)     .
        `.trim() + EOL;

        expect(map.render()).toBe(render);
        expect(mapBis.render()).toBe(render);
    });

    it("Compare parsed map final output", () => {
        const output = `
C - 3 - 4
M - 1 - 0
M - 2 - 1
T - 1 - 3 - 2
A - Lara - 0 - 3 - S - 3
        `.trim();

        expect(parseMapToDescription(map)).toBe(output);
        expect(parseMapToDescription(mapBis)).toBe(output);
    });
});