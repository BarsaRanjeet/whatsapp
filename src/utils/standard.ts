import * as readline from 'readline';
import * as process from 'process';
import { spawn } from 'child_process';

const ls = spawn('clear');


const  log = (data)=> {
    readline.cursorTo(process.stdout, 0, process.stdout.rows + 1)
    process.stdout.write(data.toString() + "\n")
  }

  const input = (wp) =>{
    ls.stdout.on('data', log)
    ls.stderr.on('data', log)
    
    let rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout, 
      prompt: ''
    })
    
    rl.on('line', (line) => {
    //   ls.stdin.write(line.trim() + '\n');
      rl.prompt()
      if(line.trim()){
        (async()=>{await wp.sendMessage("<wp-mobile-number>@s.whatsapp.net", { text:  line.trim()})})();
      }
    })
  }
  
export {
    log,
    input
}