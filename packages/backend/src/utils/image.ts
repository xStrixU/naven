import axios from 'axios';
import fs from 'node:fs';

export const downloadImage = async (url: string, outputPath: string) => {
  const writer = fs.createWriteStream(outputPath);
  const response = await axios.get(url, {
    responseType: 'stream',
  });

  response.data.pipe(writer);
};
