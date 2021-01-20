const sTime: number = Date.now();

import * as logger from 'colorlogs';
import * as config from './config';
import { Client, Message } from 'discord.js';
import { commands } from './handlers/command';
import { bgBlue, bgGreen } from 'colorette';

const client: Client = new Client();

async function start(): Promise<void> {
  logger.warn('starting...');

  await client.login(config.token);
};

client.on('message', (message: Message): void => {
  if(!message.channel) return;
  logger.info(bgBlue(message.guild.name) + '>' + bgGreen(message.author.tag) + '>' + message.content);
  if(!message.content.startsWith(config.prefix)){ return; };
  if(message.content.startsWith(config.prefix)){
    const arr: Array<string> = message.content.split(' ');
    const cmd: string = arr[0].toLowerCase().split(config.prefix)[1];
    const args: Array<string> = arr.slice(1);

	try {
    	commands.forEach(command => {
    		if(command.cmd.name == cmd || command.cmd.alias == cmd){
    			return commands.get(command.cmd.name).cmd.run(client, message, args)
    		};
    	});
    } catch(err) {
      logger.error(err);
    	logger.error('unable to find/run command: ' + cmd);
    };
  };
});

client.once('ready', (): void => {
  logger.success(client.user.tag + ' is online');
  const eTime: number = Date.now();
  logger.info('took ' + (eTime - sTime) + 'ms to boot up');
});

start();