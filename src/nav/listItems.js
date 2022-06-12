import { cwd } from "node:process";
import * as fsPromise from "node:fs/promises"

export async function listItems(){
    const currentDir = cwd();
    const files = await fsPromise.readdir(currentDir);
    files.forEach(file => console.log(file));
}