// Importações
const { MessageEmbed } = require('discord.js')
const { Claras, Escuras } = require('../../../components/config/colors.json')
const { Animados, Estaticos } = require('../../../components/include/emojis.json')
const adapter = require('../../../components/database/adapter/adapter')

// Exports
module.exports = {
    exe: async (bot, msg, args) => {
        let EMBED = new MessageEmbed()
            .setAuthor(bot.user.username, bot.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
            .setTimestamp()
            .setThumbnail(`https://cdn.discordapp.com/icons/${msg.guild.id}/${msg.guild.icon}.png`)
            .setColor(Claras.Amarelo)
            .setTitle(Estaticos.Guard + " Server Account")
            .setDescription("👋  ***Olá " + msg.author.username + "!***\n```Conta Atual do Servidor: " + (await adapter.RequestValues(msg.guild.id, "plan") == "Premium" ? "⭐" : "🔩") + " " + await adapter.RequestValues(msg.guild.id, "plan") + "```\n```Para saber mais clique em [ 🟢 ]\nDeseja sair? Clique em [ 🔴 ]```")
            .setFooter("Status de Servidor para " + msg.author.username, msg.author.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
        msg.channel.send(EMBED).then(Reaction => {
            Reaction.react("🟢");
            Reaction.react("🔴");

            const green = (reaction, user) => reaction.emoji.name === `🟢` && user.id === msg.author.id;
            const red = (reaction, user) => reaction.emoji.name === `🔴` && user.id === msg.author.id;

            const greenrun = Reaction.createReactionCollector(green)
            const redrun = Reaction.createReactionCollector(red)

            greenrun.on('collect', async () => {
                Reaction.delete();
                msg.author.send(
                    new MessageEmbed()
                        .setAuthor(bot.user.username, bot.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
                        .setColor(Escuras.Laranja)
                        .setTimestamp()
                        .setThumbnail(`https://cdn.discordapp.com/icons/${msg.guild.id}/${msg.guild.icon}.png`)
                        .setTitle("Benefícios Premium")
                        .setDescription("```🔑 Servidor: " + msg.guild.name + "\n" + (await adapter.RequestValues(msg.guild.id, "plan") == "Premium" ? "⭐" : "🔩") + " " + " Conta do Servidor: " + await adapter.RequestValues(msg.guild.id, "plan") + "\n👤 Usuário detectado: " + msg.author.username + "```\n👋 Salve!\nO Plano **Premium** oferece, dentre outros muitos aspectos, a possibilidade de uso de todos os meus comandos. Minha lista de comandos abrange uma gama de possibilidades bastante diversificada, que será destacada, caso você queira, ao ser clicado o botão [ " + Animados.Download + " ]\n\nVocê deseja adquirir uma conta **Premium** para o servidor " + msg.guild.name + "? Se sim, siga em frente em [ " +Animados.Arrow  + " ]\n\nSaia por aqui [ 🔴 ]")
                        .setFooter("Premium para " + msg.author.username, msg.author.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
                ).catch(err => msg.channel.send("```❌ ERRO | Não posso enviar mensagens em seu privado do discord, " + msg.author.username + ". Por favor abra-o para mim. Dessa forma conseguirei apresenta-lo os benefícios de uma conta Premium.```"))
            });
            redrun.on('collect', () => {
                Reaction.delete();
            })
        })
    },
    help: {
        name: "account",
        aliases: ["conta", "serveraccount", "contadoservidor", "contaservidor", "sacc"]
    },
    perms: {
        permissions_level: "any",
        plan: "Basic"
    }
}