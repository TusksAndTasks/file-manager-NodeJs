import { cwd } from 'node:process';
import path from 'node:path';

export function dividePath(input){
    const extension = path.extname(input);
    const extIndex = input.indexOf(extension) + extension.length;
    const firstPath = input.slice(0, extIndex);
    const secondPath = input.slice(extIndex + 1);
   
   const prevName = path.isAbsolute(firstPath) ? path.resolve(firstPath) : path.resolve(cwd(), firstPath);
   const newName = path.isAbsolute(secondPath) ? path.resolve(secondPath) : path.resolve(cwd(), secondPath);

   return [prevName, newName];
}