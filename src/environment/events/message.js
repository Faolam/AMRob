// Importações
const adapter = require('../../components/database/adapter/adapter');
const { class1, class2, class3 } = require('../../components/include/permissions')
const { MessageEmbed } = require('discord.js');
const { client, owner } = require('../../components/config/general.json');
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
                // msg.channel.send("Esse servidor está em meu Banco de Dados")

                const args = msg.content.split(' ');
                let command = args.shift().slice(client.default_prefix.length).toLowerCase()

                command = bot.commands.get(command) || bot.commands.find(cmd => {
                    if (cmd.help.aliases.includes(command) === true) return cmd
                })

                if (command === undefined) return msg.channel.send("```❌ ERRO | Comando não encontrado!```");

                if (command.perms.permissions_level.length > 0) {
                    switch(command.perms.permissions_level) {
                        case "owner":
                            if (msg.author.id === owner.id) {
                                await PLAN(bot, msg, args)
                            } else {
                                msg.channel.send("```❌ ERRO | Esse comando é restrito à categoria OWNER (Administradores/Criador)```").then(() => {msg.react(Animados.Esclamação)})
                            }
                            break;
                        case "class1":
                            await VERIFY( class1 );
                            break;
                        case "class2":
                            await VERIFY( class2 );
                            break;
                        case "class3":
                            await VERIFY( class3 );
                            break;
                        case "any":
                            EXECUTE(bot, msg, args);
                            break;
                        default:
                            return console.log("Erro Ocorrido na leitura de permissões.\nNão foram encontradas categorias que correspondam a: " + command.perms.permissions_level)
                    }
                } else {
                    msg.channel.send("```Comando não possui permissões```")
                }

                async function VERIFY( TypeClass ) {
                    var n = 0;
                    var result = "Any";
                    var PermsNumber = TypeClass.length
                    
                    while (n < 1) {
                        let perm = TypeClass[PermsNumber -1];

                        if (msg.guild.member(msg.author).hasPermission(perm) === true) {
                            if (PermsNumber > 1) {
                                PermsNumber = PermsNumber - 1
                            } else {
                                result = true
                                n++
                            }
                        } else {
                            n++
                            result = false
                        }
                    }

                    switch (result) {
                        case true:
                            await PLAN(bot, msg, args)
                            break;
                        case false:
                            msg.channel.send("```❌ ERRO | Permissões não encontradas. Esse comando necessita de permissões '" + command.perms.permissions_level + "'```");
                            break;
                        default:
                            console.log(" { Como chegou aqui? } ");
                            break;
                    };
                }

                async function PLAN(bot, msg, args) {
                    let command_plan_type = await adapter.RequestValues(msg.guild.id, "plan");

                    let guild_plan_type = command.perms.plan
                    try {
                        if (command_plan_type == guild_plan_type) {
                            EXECUTE(bot, msg, args)
                        }
                        if (command_plan_type !== guild_plan_type) {
                            msg.channel.send("```🙁 ERRO Ocorrido:\n🔒 Parece que este servidor não possui o tipo de conta necessária para a realização do comando.\n🔑 Faça um Upgrade sempre que quiser!\n\n🔴 Conta para " + msg.guild.name + ": " + command_plan_type + "\n🟢 Conta necessária: " + guild_plan_type + "```")
                        }
                    } catch( err ) {
                        console.log("Erro detectado: \n" + err)
                    }
                    // console.log(command_plan_type, guild_plan_type)
                }

                function EXECUTE(bot, msg, args) {
                    command.exe(bot, msg, args)
                }

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

                                Animados.Dino + " Olá " + msg.author.toString() + "!\nÉ com grande prazer que lhe dou as Boas Vindas ao mundo ***AMRob*** para moderadores! Bem, mas antes de continuarmos preciso esclarecer-lhe alguns aspectos.\n" +Animados.Verified + " **Aspectos:**\n```Possuo inúmeras funcionalidades quando o assunto é administração e organização do servidor, para tanto, existem algumas que somente são disponibilizadas para organizadores que possuem uma conta premium para esse robô. Deseja entende-las? Consulte: '" + client.default_prefix + "MANUTENÇÂO'. A partir disso é preciso que sejam, mais a frente, esclarecidos todos os meus requisitos.```\n" + Estaticos.Link + " **Status de Conta:**\n```Plano = " + await adapter.RequestValues(msg.guild.id, "plan") + "```",

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