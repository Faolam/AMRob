// Importações
const adapter = require('../../components/database/adapter/adapter');
const { MessageEmbed } = require('discord.js');
const { client } = require('../../components/config/general.json');
const { simple } = require('../../components/include/embeds');
const { Claras, Escuras } = require('../../components/config/colors.json')
const { Estaticos, Animados } = require('../../components/include/emojis.json')

// Exportações
module.exports = {
    exe: async (bot, msg) => {
        if (msg.author.bot) return;
        if (msg.channel.type == "dm") return msg.author.send(`Olá ${msg.author.toString()}! Ainda não posso respondê-lo(a) pela 'dm'.`);
        if (!msg.content.startsWith(`${client.default_prefix}`)) return;

        try {
            await adapter.SyncDB();

            if (await adapter.StatusServer( msg.guild.id ) == true) {
                msg.channel.send("Esse servidor está em meu Banco de Dados")
            }
            if (await adapter.StatusServer( msg.guild.id ) == false) {
                msg.channel.send(simple(
                    bot.user.username, 
                    Claras.Amarelo, 
                    Animados.Esclamação + "  Servidor Não Localizado",
                    `https://cdn.discordapp.com/icons/${msg.guild.id}/${msg.guild.icon}.png`,
                    Animados.Esmeralda + " Olá " + msg.author.toString() + "!\nNão foi possível encontrar esse servidor em meu ***Banco de Dados***. É aconselhado que seja criada uma nova **sessão** para esse fim. \n***Deseja faze-la agora?***",
                    "Mensagem para " + msg.author.username,
                    bot.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}),
                    msg.author.displayAvatarURL({dynamic: true, format: "png", size: 1024})
                )).then(Reaction => {
                    Reaction.react(Estaticos.Correto)
                    Reaction.react(Estaticos.Errado)
                    
                    let ReactEventCorreto = (reaction, user) => reaction.emoji.id === "836648743561854996" && user.id === msg.author.id;
                    let ReactEventErrado = (reaction, user) => reaction.emoji.id === "836648723282919494" && user.id === msg.author.id;

                    const ReactEventCorretoExe = Reaction.createReactionCollector(ReactEventCorreto);
                    const ReactEventErradoExe = Reaction.createReactionCollector(ReactEventErrado);

                    ReactEventCorretoExe.on("collect", async () => {
                        try {
                            await adapter.NewServer( msg );
                            Reaction.delete();
                            msg.channel.send(simple(
                                bot.user.username,
                                Claras.Verde,
                                Estaticos.Correto + " Sucesso ao Adicionar o Servidor",
                                `https://cdn.discordapp.com/icons/${msg.guild.id}/${msg.guild.icon}.png`,
                                Animados.Dino + " Olá " + msg.author.toString() + "!\nÉ com grande prazer que lhe dou as Boas Vindas ao mundo ***AMRob*** para moderadores! Bem, mais antes de continuarmos preciso esclarecer-lhe alguns aspectos.\n**Aspectos:**\n`Possuo inúmeras funcionalidades quando o assunto é administração e organização do servidor, para tanto, existem algumas que somente são disponibilizadas para organizadores que possuem uma conta premium para esse robô. Deseja entende-las? Consulte: '" + client.default_prefix + "MANUTENÇÂO'. A partir disso é preciso que sejam, mais a frente, esclarecidos todos os meus requisitos.`\n **Status de Conta:**\n" + Estaticos.Link + "Plano = " + await adapter.RequestValues(msg.guild.id, "plan"),
                                "Novo Status para " + msg.author.username,
                                bot.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}),
                                msg.author.displayAvatarURL({dynamic: true, format: "png", size: 1024})
                            ));
                        } catch(error) {
                            console.log(error);
                            Reaction.delete();
                            msg.channel.send(simple(
                                bot.user.username,
                                Claras.Vermelho,
                                Estaticos.Errado + "  Erro ao Adicionar o Servidor",
                                `https://cdn.discordapp.com/icons/${msg.guild.id}/${msg.guild.icon}.png`,
                                Estaticos.Computador + " Olá " + msg.author.toString() + "!\nNão foi possível criar uma conta em meu banco de dados para esse servidor. Me parece que foi um erro interno, por isso, contate meu **surpevisor/administrador**, ***Pedrão#1007***, e descreva o problema.\n" + Animados.DiscordLove + " Obrigado novamente pela ajuda, grande abraço!",
                                "Aviso para " + msg.author.username,
                                bot.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}),
                                msg.author.displayAvatarURL({dynamic: true, format: "png", size: 1024})
                            ));
                        }
                    });
                    ReactEventErradoExe.on("collect", () => {
                        Reaction.delete();
                        msg.channel.send(`${Estaticos.Guard} ${msg.author.toString()}, tudo bem. Mas já digo, não posso executar comandos em servidores aos quais não reconheço as contas.`);
                    });
                })
            }
        } catch(err) {
            console.log("Novo erro encontrado em " + __filename + "Erro: " + err)
        }
    }
}