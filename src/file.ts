import fs from 'fs';
import path from 'path';
import { EOL } from 'os';

import Map from './Map';

export const getMapFromFile = (mapFile: string) => {
    const mapFileName = path.resolve(__dirname, '..', mapFile);

    try {
        return fs.readFileSync(mapFileName, {
            encoding: 'utf8',
            flag: 'r'
        });
    }
    catch (e: any) {
        console.error(`Failed to open "${mapFile}"${EOL}${e.message}`);
        process.exit(1);
    }
}

export const setMapOnOutputFile = (output: string, map: Map) => {
    const mapFileName = path.resolve(__dirname, '..', output);

    fs.writeFileSync(mapFileName, "", {
        encoding: 'utf8',
        flag: 'w+'
    });
};