const server = require('./server/main.js');
const settings = require('./controllers/settings');

main();
async function main(){
    const setting = await settings.get();
server.run(setting.server.port,setting.server.roothost);
}