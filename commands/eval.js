const Discord = require('discord.js')
const util = require('util')
const fs = require('fs')
const owner_id = require('../config.json').owner_id
let code,sTime, eTime, _eTime, _sTime, embed

module.exports = {
  name : 'eval',
  run : (client, message, args) => {
  	if(message.author.id != owner_id) return
  	code = message.content.replace('m.eval', '')
  	sTime = Date.now()
  	try {
  		code = util.inspect(eval(code))
		
  	} catch(err) {
  		message.react('<:red_cross:740859896135942156>')
  		return message.channel.send('An error occured :' + '```\n' + err + '```')
  	}
  	eTime = Date.now()
	
  	time = `${eTime - sTime}ms`
  	embed = new Discord.MessageEmbed()
	  	.addField('Output : ', '```js\n'  + code + '```')
  		.addField('_ _', '`' + '⏱ time taken: ' + time + '`')

  	message.react('<:green_tick:740860240769056828>')
  	return message.channel.send(embed)
  },
  help : 'Evaluates provided code, owner only.'
}
