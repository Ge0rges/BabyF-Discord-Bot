const fs = require('fs')
const { dataFile} = require('../config.json')

module.exports = {
    name: 'cancelall',
    args: false,
    usage: "",
    guildOnly: true,
    adminOnly: true,
    description: "Erases all availability for this week.",
    execute(message, args) {
        let isDeleted = true
        
        fs.unlink(dataFile, (err) => {
            if (err) {
                isDeleted = false
                throw err;
            }
        })

        message.react(isDeleted ? '✅' : '🚫')
    },
}
