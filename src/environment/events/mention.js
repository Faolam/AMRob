// Exportações
module.exports = {
    exe: (bot, msg) => {
        if (msg.mentions.users.size !== 1) return;
        if (msg.content.split(' ').length != 1) return;
        if (msg.mentions.users.first().id != bot.user.id) return;
        if (!msg.mentions.users.first()) return;
        msg.channel.send("Olá " + msg.author.toString())
    }
}