import fs from 'node:fs';
import { pipeline } from 'stream';
import util from 'util';

import type { Readable } from 'stream';

const pump = util.promisify(pipeline);

export const saveFile = (stream: Readable, path: string) => {
  return pump(stream, fs.createWriteStream(path));
};
