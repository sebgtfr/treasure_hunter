"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMapOutputCase = exports.EMapItem = exports.EMove = exports.EOrientation = exports.EMapParsing = void 0;
// Enum use by Parser to create Map from file.
var EMapParsing;
(function (EMapParsing) {
    EMapParsing["MAP"] = "C";
    EMapParsing["MOUNTAIN"] = "M";
    EMapParsing["TREASURE"] = "T";
    EMapParsing["ADVENTURER"] = "A";
})(EMapParsing = exports.EMapParsing || (exports.EMapParsing = {}));
;
// Enum use for adventurers' orientation.
var EOrientation;
(function (EOrientation) {
    EOrientation["NORTH"] = "N";
    EOrientation["EAST"] = "E";
    EOrientation["SOUTH"] = "S";
    EOrientation["WEST"] = "O";
})(EOrientation = exports.EOrientation || (exports.EOrientation = {}));
;
// Enum use for adventurers' movements.
var EMove;
(function (EMove) {
    EMove["FORWARD"] = "A";
    EMove["LEFT"] = "G";
    EMove["RIGHT"] = "D";
})(EMove = exports.EMove || (exports.EMove = {}));
;
// Enum used by Map to define case content.
// The case will have 3 states possible:
// All minus numbers are for obstacles.
// Any 0 meant nothing.
// Any positive number is for the value of the treasures.
var EMapItem;
(function (EMapItem) {
    EMapItem[EMapItem["MOUNTAIN"] = -1] = "MOUNTAIN";
    EMapItem[EMapItem["EMPTY"] = 0] = "EMPTY";
})(EMapItem = exports.EMapItem || (exports.EMapItem = {}));
;
// Enum use by Map to create output format.
var EMapOutputCase;
(function (EMapOutputCase) {
    EMapOutputCase["MOUNTAIN"] = "M";
    EMapOutputCase["TREASURE"] = "T";
    EMapOutputCase["ADVENTURER"] = "A";
    EMapOutputCase["EMPTY"] = ".";
})(EMapOutputCase = exports.EMapOutputCase || (exports.EMapOutputCase = {}));
;
