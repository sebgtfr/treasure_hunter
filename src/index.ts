import minimist from 'minimist';

import { getMapFromFile, setMapOnOutputFile } from './file';
import { parseFromDescriptionToMap, parseMapToDescription } from './parseMap';
import play from './play';

const args = minimist(process.argv);

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

const map = parseFromDescriptionToMap(getMapFromFile(mapParam));

if (args.r || args['render-map']) {
    console.log("========== INITIAL STATE ==========");
    console.log(map.render());
}

play(map);

if (args.r || args['render-map']) {
    console.log("========== FINAL STATE ==========");
    console.log(map.render());
}

setMapOnOutputFile(outputParam, parseMapToDescription(map));

process.exit(0);

