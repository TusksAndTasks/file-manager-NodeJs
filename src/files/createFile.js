import path from "path";
import { cwd } from "process";
import * as fs from "fs";

export async function createFile(input, printError, printDir) {
    const filePath = path.isAbsolute(input) ? path.resolve(input) : path.resolve(cwd(), input);
    fs.open(filePath, 'a', (err) => {
        if(err){
            printError();
        } else {
            console.log('File created!');
        }
        printDir();
    });    
}