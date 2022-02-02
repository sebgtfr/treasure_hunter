"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMapToDescription = exports.parseFromDescriptionToMap = void 0;
const os_1 = require("os");
const helper_1 = require("./helper");
const interfaces_1 = require("./interfaces");
const Map_1 = __importDefault(require("./Map"));
const g_commentChar = '#';
const g_mapParsingItems = Object.values(interfaces_1.EMapParsing);
const g_mapOutputCase = Object.values(interfaces_1.EMapOutputCase);
const createMap = (pos, width, height) => {
    if (!(0, helper_1.isNumeric)(width)) {
        throw new Error(`
            Line ${pos + 1} invalid !${os_1.EOL}
            Width must be integer !
        `);
    }
    if (!(0, helper_1.isNumeric)(height)) {
        throw new Error(`
            Line ${pos + 1} invalid !${os_1.EOL}
            Height must be integer !
        `);
    }
    return new Map_1.default(parseInt(width), parseInt(height));
};
const AddMountain = (pos, map, ...parsingParams) => {
    if (parsingParams.length !== 2) {
        throw new Error(`
            Line ${pos + 1} invalid !${os_1.EOL}
            Mountain must have 2 parameters !
        `);
    }
    if (!(0, helper_1.isNumeric)(parsingParams[0])) {
        throw new Error(`
            Line ${pos + 1} invalid !${os_1.EOL}
            x must be integer !
        `);
    }
    if (!(0, helper_1.isNumeric)(parsingParams[1])) {
        throw new Error(`
            Line ${pos + 1} invalid !${os_1.EOL}
            y must be integer !
        `);
    }
    try {
        const x = parseInt(parsingParams[0]);
        const y = parseInt(parsingParams[1]);
        if (!map.isEmpty(x, y)) {
            throw new Error(`Mountain can't be insert at position ${x}-${y} !`);
        }
        map.set(x, y, interfaces_1.EMapItem.MOUNTAIN);
    }
    catch (e) {
        throw new Error(`
            Line ${pos + 1} invalid !${os_1.EOL}
            ${e.message}
        `);
    }
};
const AddTreasure = (pos, map, ...parsingParams) => {
    if (parsingParams.length !== 3) {
        throw new Error(`
            Line ${pos + 1} invalid !${os_1.EOL}
            Treasure must have 3 parameters !
        `);
    }
    if (!(0, helper_1.isNumeric)(parsingParams[0])) {
        throw new Error(`
            Line ${pos + 1} invalid !${os_1.EOL}
            x must be integer !
        `);
    }
    if (!(0, helper_1.isNumeric)(parsingParams[1])) {
        throw new Error(`
            Line ${pos + 1} invalid !${os_1.EOL}
            y must be integer !
        `);
    }
    if (!(0, helper_1.isNumeric)(parsingParams[2])) {
        throw new Error(`
            Line ${pos + 1} invalid !${os_1.EOL}
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
    catch (e) {
        throw new Error(`
            Line ${pos + 1} invalid !${os_1.EOL}
            ${e.message}
        `);
    }
};
const AddAdventurer = (pos, map, ...parsingParams) => {
    if (parsingParams.length !== 5) {
        throw new Error(`
            Line ${pos + 1} invalid !${os_1.EOL}
            Adventurer must have 5 parameters !
        `);
    }
    if (parsingParams[0].length === 0) {
        throw new Error(`
            Line ${pos + 1} invalid !${os_1.EOL}
            Name is required !
        `);
    }
    if (!(0, helper_1.isNumeric)(parsingParams[1])) {
        throw new Error(`
            Line ${pos + 1} invalid !${os_1.EOL}
            x must be integer !
        `);
    }
    if (!(0, helper_1.isNumeric)(parsingParams[2])) {
        throw new Error(`
            Line ${pos + 1} invalid !${os_1.EOL}
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
    catch (e) {
        throw new Error(`
            Line ${pos + 1} invalid !${os_1.EOL}
            ${e.message}
        `);
    }
};
const parseLines = (lines, map = null, pos = 0) => {
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
    if (!g_mapParsingItems.includes(parsingType)) {
        throw new Error(`
            Line ${pos + 1} invalid !${os_1.EOL}
            Type ${parsingType} Unknown !
        `);
    }
    // If line is a map
    if (parsingType === interfaces_1.EMapParsing.MAP) {
        if (map !== null) {
            throw new Error(`
                Line ${pos + 1} invalid !${os_1.EOL}
                Map can't be defined more than one time !
            `);
        }
        if (parsingParams.length !== 2) {
            throw new Error(`
                Line ${pos + 1} invalid !${os_1.EOL}
                Map must have 2 parameters !
            `);
        }
        return parseLines(lines, createMap(pos, parsingParams[0], parsingParams[1]), pos + 1);
    }
    else {
        // In order to allow map description to be anywhere
        // We started fill the map after the whole file is parse.
        map = parseLines(lines, map, pos + 1);
        switch (parsingType) {
            case interfaces_1.EMapParsing.MOUNTAIN:
                AddMountain(pos, map, ...parsingParams);
                break;
            case interfaces_1.EMapParsing.TREASURE:
                AddTreasure(pos, map, ...parsingParams);
                break;
            case interfaces_1.EMapParsing.ADVENTURER:
                AddAdventurer(pos, map, ...parsingParams);
                break;
        }
        return map;
    }
};
const parseFromDescriptionToMap = (mapDescription) => {
    try {
        return parseLines(mapDescription.split(os_1.EOL));
    }
    catch (e) {
        console.error(e.message);
        process.exit(1);
    }
};
exports.parseFromDescriptionToMap = parseFromDescriptionToMap;
const parseMapToDescription = (map) => {
    const output = [`${interfaces_1.EMapParsing.MAP} - ${map.width} - ${map.height}`];
    for (let y = 0; y < map.height; ++y) {
        for (let x = 0; x < map.width; ++x) {
            const content = map.getCaseContentForFile(x, y);
            switch (content) {
                case interfaces_1.EMapOutputCase.MOUNTAIN:
                    output.push(`${interfaces_1.EMapParsing.MOUNTAIN} - ${x} - ${y}`);
                    break;
                case interfaces_1.EMapOutputCase.TREASURE:
                    output.push(`${interfaces_1.EMapParsing.TREASURE} - ${x} - ${y} - ${map.get(x, y)}`);
                    break;
            }
        }
    }
    output.sort((a, b) => {
        const posA = g_mapOutputCase.indexOf(a[0]);
        const posB = g_mapOutputCase.indexOf(b[0]);
        return posA - posB;
    });
    for (const adventurer of map.adventurers) {
        output.push(`${interfaces_1.EMapOutputCase.ADVENTURER} - ${adventurer.name} - ${adventurer.x} - ${adventurer.y} - ${adventurer.orientation} - ${adventurer.nbTreasure}`);
    }
    return output.join(os_1.EOL);
};
exports.parseMapToDescription = parseMapToDescription;
