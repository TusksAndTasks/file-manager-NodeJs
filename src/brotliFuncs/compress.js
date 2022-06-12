import * as fs from "fs";
import path from "path";
import zlib from 'zlib';
import { dividePath } from '../helpers/dividePaths.js';

export function compress(input, printError, printDir){
   const [prevName, newName] = dividePath(input);
   console.log(prevName, newName);
   const fileName = path.parse(prevName).base
   
   const readingStream = fs.createReadStream(prevName, "utf-8");
   const writeStream = fs.createWriteStream(path.resolve(newName, fileName + '.br'));
   const compressor = zlib.createBrotliCompress();

   readingStream.on('error',() => {
    readingStream.destroy();
    printError();
    printDir();
});
  
  writeStream.on('error',() => {
    readingStream.destroy();
    printError();
    printDir();
});

writeStream.on('finish', () => {
    console.log('Compress successful!')
    printDir();
})
   
readingStream.pipe(compressor).pipe(writeStream);

}