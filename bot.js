const Discord = require('discord.js')
const fs = require('fs')
const { token, prefix } = require('./config.json')
const { version } = require('./package.json')
const client = new Discord.Client()
client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

client.on('ready', () => {
    client.user.setActivity(`Version ${version}`, { type: 'WATCHING' })
})

client.on('error', (error) => {
    console.error(error)
    client.user.setActivity(`Version ${version}`, { type: 'WATCHING' })
})

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const commandName = args.shift().toLowerCase()
    if (!client.commands.has(commandName)) return
    const command = client.commands.get(commandName)

    if (command.args && !args.length) {
        return message.channel.send(`${message.author}, missing arguments. More info do: \`${prefix}help ${commandName}\``)
    }

    if (command.guildOnly && !message.guild) {
        return message.reply('This command must be executed in a server.')
    }

    if (command.guildOnly && !message.member.roles.cache.find(role => role.name === "Baby Franklin")) {
        return message.reply('The bot can only be used by a Baby Franklin member.')
    }

    if (command.adminOnly && !message.member.roles.cache.find(role => role.name === 'Empereur')) {
        return message.reply('Seul l\'empereur peux donner cet ordre.')
    }


    try {
        command.execute(message, args)

    } catch (error) {
        console.error(error)
        console.error(`>> [${new Date()}] <${message.channel.name}> "${message.content}"`)
        message.reply("An error occured, most likely case is you're not cool enough. Sorry.")
    }
})

client.login(token)
