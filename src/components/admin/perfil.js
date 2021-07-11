// Exportações
module.exports = {
    activity: (bot, PerfilActivity, type, interval) => {
        try {
            let TypeType = ["PLAYING", "STREAMING", "LISTENING", "WATCHING", "CUSTOM_STATUS", "COMPETING"]
            
            if (!TypeType.includes(type)) return console.log("Erro detectado. Não é possivel atribuir uma atividade igual a " + type + ". Por favor, verifique se essa fora escrita corretamente.")
            
            if (interval < 20000) return console.log("O Discord permite que valores para a rotação de status menores que 25 seg. Os " + interval/1000 + " segundos ferem esse requisito.")
            
            let authNumber = 0; 
            setInterval(() => {
                bot.user.setActivity(`${PerfilActivity[authNumber++ % PerfilActivity.length]}`, {
                    type: type
                })
            }, interval);
        } catch(err) {
            console.log(`Erro detectado: \n${err}`);
        }
    },
    status: (bot, PerfilStatus) => {
        try {
            let Types = ["dnd", "idle", "invisible", "online"]

            if (!Types.includes(PerfilStatus)) return console.log("Erro detectado. " + PerfilStatus + " não pode ser atribuido, verifique sua ortografia.");

            bot.user.setStatus(PerfilStatus);
        } catch(err) {
            console.log(`Erro detectado: \n${err}`)
        }
    }    
}