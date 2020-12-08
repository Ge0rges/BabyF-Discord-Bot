const fs = require('fs')
const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
const hourRegex = /^([01]?[0-9]|2[0-3])[Hh:]([0-5][0-9])?$/
const shortcuts = /^(week|all|weekend|we)$/
const week = ["monday", "tuesday", "wednesday", "thursday", "friday"]
const weekend = ["saturday", "sunday"]

module.exports = {
    name: 'avail',
    args: true,
    usage: "[group of days][group of hours]",
    guildOnly: true,
    adminOnly: false,
    description: "Marks you as free on the group of days at the hours given.", 
    execute(message, args) {
        const playerAdded = addPlayer(message.author, args)
        if (playerAdded) removePlayerFromUnavailablePlayers(message.author)
        message.react(playerAdded ? '✅' : '🚫')
    },
}

const addPlayer = (playerName, args) => {
    return false
}

const removePlayerFromUnavailablePlayers = playerName => {
    return false 
}
