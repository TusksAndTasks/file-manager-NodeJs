import * as fs from "fs";
import path from "path";
import zlib from 'zlib';
import { dividePath } from '../helpers/dividePaths.js';

export function decompress(input, printError, printDir){
   const [prevName, newName] = dividePath(input);
   const fileName = path.parse(prevName).base.slice(0, -3);

   const readingStream = fs.createReadStream(prevName);
   const writeStream = fs.createWriteStream(path.resolve(newName, fileName));
   const decompressor = zlib.createBrotliDecompress();

   readingStream.on('error',(err) => {
    console.log(err); 
    readingStream.destroy();
    printError();
    printDir();
});
  
  writeStream.on('error',(err) => {
    console.log(err); 
    readingStream.destroy();
    printError();
    printDir();
});

writeStream.on('finish', () => {
    console.log('Decompress successful!')
    printDir();
})
   readingStream.pipe(decompressor).pipe(writeStream);
}