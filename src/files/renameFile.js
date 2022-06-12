import * as fs from "fs";
import { dividePath } from "../helpers/dividePaths.js";

export function renameFile(input, printError, printDir){
   const [prevName, newName] = dividePath(input);

   fs.rename(prevName, newName, (err) => {
        if(err){
            printError();
        } else {
            console.log('File renamed!');
        }
        printDir();
   });
}