import minimist from 'minimist';

import { getMapFromFile } from './file';
import { parseFromDescriptionToMap } from './parseMap';
import play from './play';

const args = minimist(process.argv);

if (!args.map) {
    console.error("Missing map !");
    process.exit(1);
}

const map = parseFromDescriptionToMap(getMapFromFile(args.map));

if (args.debug) {
    console.log("========== INITIAL STATE ==========");
    console.log(map.render());
}

play(map);

if (args.debug) {
    console.log("========== FINAL STATE ==========");
    console.log(map.render());
}

if (args.output) {
}

process.exit(0);

