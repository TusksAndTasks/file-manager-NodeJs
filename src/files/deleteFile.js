import path from "path";
import { cwd } from "process";
import * as fs from "fs";

export function deleteFile(input, printError, printDir){
    const filePath = path.isAbsolute(input) ? path.resolve(input) : path.resolve(cwd(), input);

    fs.unlink(filePath, (err) => {
        if(err){
            printError();
        } else {
            console.log('File deleted!');
        }
      printDir();
    })
}