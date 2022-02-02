"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMapOnOutputFile = exports.getMapFromFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const os_1 = require("os");
const getMapFromFile = (mapFile) => {
    const mapFileName = path_1.default.resolve(__dirname, '..', mapFile);
    try {
        return fs_1.default.readFileSync(mapFileName, {
            encoding: 'utf8',
            flag: 'r'
        });
    }
    catch (e) {
        console.error(`Failed to open "${mapFile}"${os_1.EOL}${e.message}`);
        process.exit(1);
    }
};
exports.getMapFromFile = getMapFromFile;
const setMapOnOutputFile = (output, mapDescription) => {
    const mapFileName = path_1.default.resolve(__dirname, '..', output);
    try {
        fs_1.default.writeFileSync(mapFileName, mapDescription, {
            encoding: 'utf8',
            flag: 'w+'
        });
    }
    catch (e) {
        console.error(`Failed to write on "${output}"${os_1.EOL}${e.message}`);
        process.exit(1);
    }
};
exports.setMapOnOutputFile = setMapOnOutputFile;
