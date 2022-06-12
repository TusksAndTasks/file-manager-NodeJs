import * as readline from 'node:readline';
import * as process from 'node:process';
import * as os from 'node:os'
import { up } from './nav/up.js';
import { cwd } from 'node:process';
import { changeDirectory } from './nav/changeDirectory.js';
import { listItems } from './nav/listItems.js';
import { readFile } from './files/readFile.js';
import { createFile } from './files/createFile.js';
import { renameFile } from './files/renameFile.js';
import { copyFile } from './files/copyFile.js';
import { moveFile } from './files/moveFile.js';
import { deleteFile } from './files/deleteFile.js';
import { operatingSystemStatus } from './os/operatingSystemStatus.js';
import { hash } from './hash/hash.js';
import { compress } from './brotliFuncs/compress.js';
import { decompress } from './brotliFuncs/decompress.js';

const homeDir = os.homedir();
process.chdir(homeDir);

const eqlIndex = process.argv[2].indexOf('=') + 1;
const username = process.argv[2].slice(eqlIndex);

console.log(`Welcome to the File Manager, ${username}!`);

const input = process.stdin; 
const output = process.stdout; 
const rl = readline.createInterface({ input, output, prompt: 'Please, print your command in console: '});

function printDir(){
    console.log(`You are currently in ${cwd()}`);
    rl.prompt();
};

function printError(){
    console.log('Operation failed');
}

printDir();

rl.on('line', (input) => {
    const blankIndex = input.indexOf(' ');
    const commandLine = blankIndex > 0 ? input.slice(0, blankIndex) : input;
    const dataLine = blankIndex > 0 ? input.slice(blankIndex + 1) : null;

    switch (commandLine){
        case 'up': 
          up();
          printDir();
          break;
        case 'cd':
          changeDirectory(dataLine).catch(() => printError()).finally(() => printDir());
          break;
        case 'ls':
          listItems().catch(() => printError()).finally(() => printDir());     
          break;
        case 'cat':
          readFile(dataLine, printError, printDir);  
          break;
        case 'add':
          createFile(dataLine, printError, printDir);  
          break;
        case 'rn':
          renameFile(dataLine, printError, printDir);
          break;
        case 'cp':
          copyFile(dataLine, printError, printDir);
          break;
        case 'mv':
          moveFile(dataLine, printError, printDir);
          break;
        case 'rm':
          deleteFile(dataLine, printError, printDir);
          break;
        case 'os':
          operatingSystemStatus(dataLine).catch(() => printError()).finally(() => printDir());
          break;
        case 'hash':
          hash(dataLine, printError, printDir);
          break;
        case 'compress':
          compress(dataLine, printError, printDir);
          break;
        case 'decompress':
          decompress(dataLine, printError, printDir);
          break;
        case '.exit':
          rl.close();
          break;               
        default:
          console.log('Invalid input');
          printDir();
          break;    
    }
})

rl.on('close', () => {
    console.log(`\nThank you for using File Manager, ${username}!`);
})