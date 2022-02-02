import { EOL } from 'os';
import { isNumeric } from './helper';
import { EMapItem, EMapParsing, EOrientation } from './interfaces';

import Map from './Map';

const g_commentChar = '#';
const g_mapParsingItems = Object.values(EMapParsing);

const createMap = (pos: number, width: string, height: string) => {
    if (!isNumeric(width)) {
        throw new Error(`
            Line ${pos + 1} invalid !${EOL}
            Width must be integer !
        `);
    }

    if (!isNumeric(height)) {
        throw new Error(`
            Line ${pos + 1} invalid !${EOL}
            Height must be integer !
        `);
    }

    return new Map(parseInt(width), parseInt(height));
}

const AddMountain = (pos: number, map: Map, ...parsingParams: string[]) => {
    if (parsingParams.length !== 2) {
        throw new Error(`
            Line ${pos + 1} invalid !${EOL}
            Mountain must have 2 parameters !
        `);
    }

    if (!isNumeric(parsingParams[0])) {
        throw new Error(`
            Line ${pos + 1} invalid !${EOL}
            x must be integer !
        `);
    }

    if (!isNumeric(parsingParams[1])) {
        throw new Error(`
            Line ${pos + 1} invalid !${EOL}
            y must be integer !
        `);
    }

    try {
        const x = parseInt(parsingParams[0]);
        const y = parseInt(parsingParams[1]);

        if (!map.isEmpty(x, y)) {
            throw new Error(`Mountain can't be insert at position ${x}-${y} !`);
        }

        map.set(x, y, EMapItem.MOUNTAIN);
    }
    catch (e: any) {
        throw new Error(`
            Line ${pos + 1} invalid !${EOL}
            ${e.message}
        `);
    }
}

const AddTreasure = (pos: number, map: Map, ...parsingParams: string[]) => {
    if (parsingParams.length !== 3) {
        throw new Error(`
            Line ${pos + 1} invalid !${EOL}
            Treasure must have 3 parameters !
        `);
    }

    if (!isNumeric(parsingParams[0])) {
        throw new Error(`
            Line ${pos + 1} invalid !${EOL}
            x must be integer !
        `);
    }

    if (!isNumeric(parsingParams[1])) {
        throw new Error(`
            Line ${pos + 1} invalid !${EOL}
            y must be integer !
        `);
    }

    if (!isNumeric(parsingParams[2])) {
        throw new Error(`
            Line ${pos + 1} invalid !${EOL}
            Number of treasure must be integer !
        `);
    }

    try {
        const x = parseInt(parsingParams[0]);
        const y = parseInt(parsingParams[1]);
        const nbTreasure = parseInt(parsingParams[2]);

        if (!map.isEmpty(x, y)) {
            throw new Error(`Mountain can't be insert at position ${x}-${y} !`);
        }

        if (nbTreasure <= 0) {
            throw new Error(`The number of treasure must be positive !`);
        }

        map.set(x, y, nbTreasure);
    }
    catch (e: any) {
        throw new Error(`
            Line ${pos + 1} invalid !${EOL}
            ${e.message}
        `);
    }
}

const AddAdventurer = (pos: number, map: Map, ...parsingParams: string[]) => {
    if (parsingParams.length !== 5) {
        throw new Error(`
            Line ${pos + 1} invalid !${EOL}
            Adventurer must have 5 parameters !
        `);
    }

    if (parsingParams[0].length === 0) {
        throw new Error(`
            Line ${pos + 1} invalid !${EOL}
            Name is required !
        `);
    }

    if (!isNumeric(parsingParams[1])) {
        throw new Error(`
            Line ${pos + 1} invalid !${EOL}
            x must be integer !
        `);
    }

    if (!isNumeric(parsingParams[2])) {
        throw new Error(`
            Line ${pos + 1} invalid !${EOL}
            y must be integer !
        `);
    }

    try {
        const x = parseInt(parsingParams[1]);
        const y = parseInt(parsingParams[2]);

        if (!map.isEmpty(x, y)) {
            throw new Error(`Mountain can't be insert at position ${x}-${y} !`);
        }

        map.addAdventurer(parsingParams[0], x, y, parsingParams[3], parsingParams[4]);
    }
    catch (e: any) {
        throw new Error(`
            Line ${pos + 1} invalid !${EOL}
            ${e.message}
        `);
    }
}

const parseLines = (lines: string[], map: Map | null = null, pos = 0) : Map => {
    // If no more line, return final result.
    if (pos === lines.length) {
        if (map === null) {
            throw new Error('Map not defined !'); 
        }
        return map;
    }

    // Extract current line.
    const line = lines[pos].trim();

    // Check if the whole line is a comment or empty.
    if (line[0] === g_commentChar || line.length === 0) {
        return parseLines(lines, map, pos + 1);
    }

    const [parsingType, ...parsingParams] = line
        // Remove comment part if line contains a comment at the end.
        .split(g_commentChar)[0]
        .split('-')
        .map(fragment => fragment.trim());

    // Check if items is known by the parser.
    if (!g_mapParsingItems.includes(parsingType as any)) {
        throw new Error(`
            Line ${pos + 1} invalid !${EOL}
            Type ${parsingType} Unknown !
        `);
    }

    // If line is a map
    if (parsingType as EMapParsing === EMapParsing.MAP) {
        if (map !== null) {
            throw new Error(`
                Line ${pos + 1} invalid !${EOL}
                Map can't be defined more than one time !
            `);
        }

        if (parsingParams.length !== 2) {
            throw new Error(`
                Line ${pos + 1} invalid !${EOL}
                Map must have 2 parameters !
            `);
        }

        return parseLines(lines, createMap(pos, parsingParams[0], parsingParams[1]), pos + 1);
    }
    else {
        // In order to allow map description to be anywhere
        // We started fill the map after the whole file is parse.
        map = parseLines(lines, map, pos + 1);

        switch (parsingType as EMapParsing) {
            case EMapParsing.MOUNTAIN:
                AddMountain(pos, map, ...parsingParams);
                break;
            case EMapParsing.TREASURE:
                AddTreasure(pos, map, ...parsingParams);
                break;
            case EMapParsing.ADVENTURER:
                AddAdventurer(pos, map, ...parsingParams);
                break;
        }

        return map;
    }
};

export const parseFromDescriptionToMap = (mapDescription: string): Map => {
    try {
        return parseLines(mapDescription.split(EOL))!;
    }
    catch (e: any) {
        console.error(e.message);
        process.exit(1);
    }
};

export const parseMapToDescription = (map: Map): string => {
    let output = '';

    for (let y = 0; y < map.height; ++y) {
        for (let x = 0; x < map.width; ++x) {
            map.get(x, y);

            const content = map.getCaseContentForMap(x, y);

            output += content;
        }
        output += EOL;
    }

    return output;
};