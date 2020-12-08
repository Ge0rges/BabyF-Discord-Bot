const { prefix } = require('../config.json')

module.exports = {
    name: 'help',
    description: 'Lists all commands. When a command is specified, shows usage, description and permission info.',
    usage: '[command name]',
    guildOnly: false,
    execute(message, args) {
        const data = []
        const { commands } = message.client

        if (!args.length) {
            data.push('List of commands:')
            data.push(commands.map(command => command.name).join(', '))
            data.push(`For more detailed information, do \`${prefix}help [command name]\`.`)

            return message.author.send(data, { split: true })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error)
                    message.reply('Could not send you a DM.?')
                })
        }

        let fullCommand = args[0].toLowerCase()
        for (let i=1; i<args.length; i++) {
            fullCommand += args[i].toLowerCase()
        }

        const name = args[0].toLowerCase()
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name))
        
        if (!command && fullCommand === "ineedsomebody") {
            return message.channel.send('Not just anybody!')
        
        } else if (!command) {
            return message.reply('This is not a valid command.')
        }

        data.push(`**Name:** ${command.name}`)

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`)
        if (command.description) data.push(`**Description:** ${command.description}`)
        if (command.usage) data.push(`**Use:** ${prefix}${command.name} ${command.usage}`)
        if (command.adminOnly) data.push('*Can only be used by the emperor.*')

        message.author.send(data, { split: true })
    },
}
