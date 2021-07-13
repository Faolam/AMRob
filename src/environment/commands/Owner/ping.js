// Exports
module.exports = {
    exe: (bot, msg, args) => {
        msg.channel.send("pong")
    },
    help: {
        name: "ping",
        aliases: []
    },
    perms: {
        permissions_level: "class1"
    }
}