import { cwd } from 'node:process';
import path from 'node:path';

export function dividePath(input){
    const dotInd = input.indexOf('.');
    const newIndex = input.indexOf(' ', dotInd);

    const prevPath = input.slice(0, newIndex);
    const newPath = input.slice(newIndex + 1);

    const prevName = path.isAbsolute(prevPath) ? path.resolve(prevPath) : path.resolve(cwd(), prevPath);
    const newName = path.isAbsolute(newPath) ? path.resolve(newPath) : path.resolve(cwd(), newPath);
    
    return [prevName, newName]
}