// Importações
const Sequelize = require('sequelize');
const mysql = require('../secure/sequelize');

// Tables
const Servers = require('../tables/servers')

class MysqlAdapter {
    constructor() {};

    // Sincronizando ao Banco de Dados
    async SyncDB() { // Sincroniza com as tabelas, colunas e todos os elementos do Banco de Dados
        await mysql.sync();
    }

    // Funções da Tabela Servers
    async NewServer( msg ) { // Criando um novo servidor no Bbanco de Dados
        const Guild = await Servers.create({
            OwnerName: (msg.guild.owner.nickname ? msg.guild.owner.nickname : msg.guild.owner.user.username),
            OwnerId: msg.guild.owner.id,
            GuildName: msg.guild.name,
            GuildId: msg.guild.id, // Erro
            Plan: "Basic",
            TimeOutRole: 111111111111111111// Erro
        });

        console.log("Novo SERVIDOR adicionado ao Banco de Dados, descrição:\n" + Guild);
    }

    async StatusServer( id ) {
        const Guild = await Servers.findAll({
            where: {
                GuildId: id
            }
        });

        if (Guild.length > 0) {
            return true;
        };
        if (Guild.length == 0) {
            return false;
        };
    }

    async RequestValues( id, suplic ) {
        if (await this.StatusServer( id ) == true) {

            const component = await Servers.findOne({ where: { GuildId: id } });

            switch (suplic) {
                case "ownername":
                    let NOwnerName = component.OwnerName
                    return NOwnerName;
                case "ownerid":
                    let NOwnerId = component.OwnerId
                    return NOwnerId;
                case "guildname":
                    let NGuildName = component.GuildName
                    return NGuildName;
                case "guildid":
                    let NGuildId = component.GuildId
                    return NGuildId;
                case "plan":
                    let NPlan = component.Plan
                    return NPlan;
                case "timeoutrole":
                    let NTimeOutRole = component.TimeOutRole
                    return NTimeOutRole;
                default:
                    return console.log("Erro detectado.");
            }
        }
        if (await this.StatusServer( id ) == false) {
            return "| ERROR | 'Guild Inexistente.'"
        }
    }

    async ModifyValue( id, suplic, mod ) {
        if (await this.StatusServer( id ) == true) {

            const component = await Servers.findOne({ where: { GuildId: id } });

            switch(suplic) {
                case "ownername":
                    try {
                        component.OwnerName = mod;
                        await component.save
                        return true
                    } catch (error) { 
                        console.log("Erro: \n" + error);
                        return false;
                    }
                case "ownerid":
                    try {
                        component.OwnerId = mod;
                        await component.save
                        return true
                    } catch (error) { 
                        console.log("Erro: \n" + error);
                        return false;
                    }
                case "guildname":
                    try {
                        component.GuildName = mod;
                        await component.save
                        return true
                    } catch (error) { 
                        console.log("Erro: \n" + error);
                        return false;
                    }
                case "guildid":
                    try {
                        component.GuildId = mod;
                        await component.save
                        return true
                    } catch (error) { 
                        console.log("Erro: \n" + error);
                        return false;
                    }
                case "plan":
                    try {
                        component.Plan = mod;
                        await component.save
                        return true
                    } catch (error) { 
                        console.log("Erro: \n" + error);
                        return false;
                    }
                case "timeoutrole":
                    try {
                        component.TimeOutRole = mod;
                        await component.save
                        return true
                    } catch (error) { 
                        console.log("Erro: \n" + error);
                        return false;
                    }
                default:
                    return console.log("Erro detectado.");
            }
        }
        if (await this.StatusServer( id ) == false) {
            return "| ERROR | 'Guild Inexistente.'"
        }
    }
}

module.exports = new MysqlAdapter()