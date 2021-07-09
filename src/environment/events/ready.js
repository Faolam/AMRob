// Exports Functions
module.exports = {
    exe: (bot) => {
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