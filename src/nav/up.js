import path from "path";
import { chdir, cwd } from "process";

export function up() {
    const currentDir = cwd();
    const newDir = path.parse(currentDir).dir;
    chdir(newDir);
}