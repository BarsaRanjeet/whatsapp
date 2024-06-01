import makeWASocket, { useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys'
import { Boom } from '@hapi/boom'

export const connectToWhatsApp = async () => {
  const { state, saveCreds } = await useMultiFileAuthState("auth_states");

  const sock = makeWASocket({
    printQRInTerminal: true,
    auth: {
      creds: state.creds,
      keys: state.keys
    }
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update
    if (connection === 'close') {
      const shouldReconnect = (lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect);
      // reconnect if not logged out
      if (shouldReconnect) {
        connectToWhatsApp();
      }
    } else if (connection === 'open') {
      console.log('opened connection')
    }
  });
  return sock;
}
