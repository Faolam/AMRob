// Exports
module.exports = {
    exe: (bot, msg, args) => {
        msg.channel.send("pong")
    },
    help: {
        name: "ping",
        aliases: ["p"]
    },
    perms: {
        permissions_level: "owner",
        plan: "Premium"
    }
}