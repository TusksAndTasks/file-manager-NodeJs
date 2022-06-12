import path from "path";
import { cwd } from "process";
import * as fs from "fs";
import crypto from 'crypto';

export function hash(input, printError, printDir){
    const filePath = path.isAbsolute(input) ? input : path.resolve(cwd(), input);
    const readingStream = fs.createReadStream(filePath, "utf-8");

    let isEmpty = true;

    readingStream.on('data', (part) => {
        const hash = crypto.createHash('md5').update(part).digest('hex');
        isEmpty = false;
        console.log(hash)
    });

    readingStream.on('error',() => { 
        readingStream.destroy();
        printError();
        printDir();
    });
    
    readingStream.on('end',() => {
        if(isEmpty) console.log('d41d8cd98f00b204e9800998ecf8427e');
        printDir();
    });
}