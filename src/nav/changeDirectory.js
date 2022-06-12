import path from "path";
import { chdir, cwd } from "process";

export async function changeDirectory(input){
        const isAbsolute = path.isAbsolute(input);
        const currentDir = cwd();
        isAbsolute ? chdir(input) : chdir(path.resolve(currentDir, input));
}