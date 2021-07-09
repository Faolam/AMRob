// Importações
const { readdir } = require('fs');
const { resolve, extname } = require('path')

// Pasta de comandos 
let dir_commands = resolve(__dirname, "../commands") 

// Exportações
module.exports = {
    exe: ( bot ) => {
        readdir(dir_commands, (err, files) => {
            if (err) return console.log("Error: " + err);
            // console.log(files)
            
            files.forEach(file => {
                // console.log(dir_commands + `/` + file)
                readdir(dir_commands + `/` + file, (err, archives) => {
                    if (err) return console.log("Error: " + err);

                    archives.forEach(archive => {
                        if (extname(archive) === ".js") {
                            try {
                                const { exe, help, perms } = require(dir_commands + "/" + file + "/" + archive)

                                if (!exe) {
                                    console.log(archive + " não possui a função principal de execução! ( 'exe' )");
                                }
                                else if (!help) {
                                    console.log(archive + " não possui a função principal de ajuda! ( 'help' )");
                                }
                                else if (!perms) {
                                    console.log(archive + " não possui a função principal de permissões! ( 'perms' )")
                                } else {

                                    bot.commands.set(help.name, { exe, help, perms })

                                    console.log(archive + " carregado com sucesso!")
                                }
                            } catch(err) {
                                console.log(archive + " apresentou problemas sérios em seu carregamento. \nDescrição do Erro: " + err)
                            }
                        } else {
                            console.log("O arquivo que você deseja ler de '" + dir_commands + "\\" + file + "\\" + archive + "' não é um executavel '.js'")
                        }
                    })
                })
            })
        })
    }
};