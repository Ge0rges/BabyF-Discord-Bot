const fs = require('fs')

module.exports = {
    name: 'remind',
    guildOnly: true,
    adminOnly: true,
    description: "Remind people who haven't entered their availibility.",
    execute(message, args) {
        return message.channel.send("Not implemented.")
    }
}
