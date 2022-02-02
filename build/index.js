"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minimist_1 = __importDefault(require("minimist"));
const file_1 = require("./file");
const parseMap_1 = require("./parseMap");
const play_1 = __importDefault(require("./play"));
const args = (0, minimist_1.default)(process.argv);
const mapParam = args['_'][2];
const outputParam = args['_'][3];
if (!mapParam || !outputParam || args.h || args.help) {
    console.log(`
yarn start [OPTIONS] <map> <output>
\t<map>             File containing the input map.
\t<output>          Generated output file name.
OPTIONS:
\t-r | --render-map Output the initial map and the final map on the console.
\t-h | --help       Render the help.
    `.trim());
    process.exit(0);
}
const map = (0, parseMap_1.parseFromDescriptionToMap)((0, file_1.getMapFromFile)(mapParam));
if (args.r || args['render-map']) {
    console.log("========== INITIAL STATE ==========");
    console.log(map.render());
}
(0, play_1.default)(map);
if (args.r || args['render-map']) {
    console.log("========== FINAL STATE ==========");
    console.log(map.render());
}
(0, file_1.setMapOnOutputFile)(outputParam, (0, parseMap_1.parseMapToDescription)(map));
process.exit(0);
