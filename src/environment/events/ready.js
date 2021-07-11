// Importações
const { activity, status } = require('../../components/admin/perfil')

// Exports Functions
module.exports = {
    exe: (bot) => {
        // Activity, Status e Perfil de Informações do Robô
        activity (
            bot, 
            [
                "🚧 Sou um robô de moderação!",
                "⏰ Fui criado recentemente!",
                "📋 Estou na versão v0.01",
                "💎 Tentarei deixar tudo mais organizado."
            ],
            "COMPETING", // PLAYING // STREAMING // LISTENING // WATCHING // CUSTOM_STATUS // COMPETING
            20000
        );
        status (
            bot,
            "idle" //dnd //idle //invisible //online
        );

        // Console Informations
        console.log(`|||||||||||||||||||||||||||||||||||||||||||||`)
        console.log(`=============================================`)
        console.log(``)
        console.log(`--> My Bot : ${bot.user.username}            `)
        console.log(``)
        console.log(`--> Id : ${bot.user.id}                      `)
        console.log(``)
        console.log(`--> Discriminator : ${bot.user.discriminator}`)
        console.log(``)
        console.log(`--> Status : ${bot.user.presence.status}     `)
        console.log(``)
        console.log(`=============================================`)
        console.log(`|||||||||||||||||||||||||||||||||||||||||||||`)
    }
}