import * as fs from 'fs';
import * as path from 'path';
import archiver from 'archiver';

async function zipExports() {
  const output = fs.createWriteStream('exports.zip');
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', () => {
    console.log(`🗜️ ZIP created: ${archive.pointer()} total bytes`);
  });

  archive.on('error', err => {
    throw err;
  });

  archive.pipe(output);
  archive.directory('exports/', false);
  await archive.finalize();
}

zipExports();
