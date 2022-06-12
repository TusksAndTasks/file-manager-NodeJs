import * as os from 'node:os'

export async function operatingSystemStatus(input){
   switch (input){
     case '--EOL':
        console.log(JSON.stringify(os.EOL));
        break;
    case '--cpus':
        const cpus = os.cpus();
          console.log(`CPUs amount = ${cpus.length}`);
          cpus.forEach((cpu) => console.log(`model: ${cpu.model} \n clock rate: ${cpu.speed/1000}`));
        break;
    case '--homedir':
        console.log(os.homedir());
        break;
    case '--username':
        console.log(os.hostname());
        break;
    case '--architecture':
        console.log(os.arch());
        break;
    default: 
      console.log('Invalid input');                   
   }
}