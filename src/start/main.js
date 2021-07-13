// Todas as importações
const Discord = require('discord.js');
const bot = require("../components/admin/client");
const config = require("../components/config/general.json")
const { resolve, extname } = require("path");
const { readdir } = require("fs");

// Clear Console
console.clear()

// Categories --> Discord Maintenance Commands
bot.commands = new Discord.Collection();

// Listando o caminho principal para a pasta eventos
let events_directory = resolve(__dirname, "../environment/events");

// Listando e capturando informações do diretório events
readdir(events_directory, (e, archives) => {
    if (e) return console.log("Erro encontrado em 'readdir' \n--> Path: " + __filename)

    archives.forEach(archive => {
        if (extname(archive) === ".js") {
            let type = archive.split(".")[0];
            const running = require(events_directory + `/${archive}`);
            try {
                switch (type) {
                    case "message":
                        bot.on("message", (msg) => { running.exe( bot, msg ) });
                        break;
                    case "addcommands":
                        bot.on("ready", () => { running.exe( bot ) });
                        break;
                    case "mention":
                        bot.on("message", (msg) => { running.exe( bot, msg ) });
                        break;
                    default:
                        bot.on(`${type}`, (...tasks) => { running.exe( bot, ...tasks ) });
                        break;
                }
            } catch (err) {
                console.log(err)
            }
        } else {
            console.log("O arquivo/pasta correspondente a " + archive + ", em '../environment/events', não pode ser lido.")
        }
    })
})

// Login no bot
bot.login(config.client.token)