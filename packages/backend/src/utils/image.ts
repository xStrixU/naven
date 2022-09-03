import axios from 'axios';
import fs from 'node:fs';

export const downloadImage = async (url: string, outputPath: string) => {
  const response = await axios.get(url, {
    responseType: 'stream',
  });
  const writer = fs.createWriteStream(outputPath);

  response.data.pipe(writer);
};
