import path from "path";
import { cwd } from "process";
import * as fs from "fs";

export async function readFile(input, printError, printDir) {
    const filePath = path.isAbsolute(input) ? input : path.resolve(cwd(), input);
    const readingStream = fs.createReadStream(filePath, "utf-8");

    let data = '';

    readingStream.on('data', (part) => data += part);

    readingStream.on('error',() => { 
        readingStream.destroy();
        printError();
        printDir();
    });
    
    readingStream.on('end',() => {
        console.log(data)
        printDir();
    });
}