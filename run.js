const server = require('./server/main.js');
const settings = require('./controllers/settings');
const api = require('./server/api/main.js');

main();
async function main(){
    const setting = await settings.get();
server.run(setting.server.port,setting.server.roothost);
api.run(setting.api.port,setting.api.key);
}