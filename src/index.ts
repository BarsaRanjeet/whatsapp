import { connectToWhatsApp } from './services/whatsapp';
import { log, input } from './utils/standard';
import { exec } from 'child_process';


void (async () => {
  try{
    const wp = await connectToWhatsApp();
    wp.ev.on("messages.upsert", ({ messages }) => {
      for (const msg of messages) {
        const { pushName, message } = msg;
        log(`${pushName} => ${JSON.stringify(message)}`);
        if (message && pushName === "Ilan Kuwar"){
          exec("notify-send 💬");
        }
          
      }
    });
    input(wp);
  }catch(error){
    console.log(/error/, error);
  }
})()
