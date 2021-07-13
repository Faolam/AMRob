// Importações
const { MessageEmbed } = require('discord.js')

// Exports
module.exports = {
    simple: (MsgAuthor, Color, Title, Thumbnail, Description, Footer, ImgAuthor, ImgFooter) => {
        const EMBED = new MessageEmbed()
            .setAuthor(MsgAuthor, (ImgAuthor ? ImgAuthor : "https://images.emojiterra.com/google/android-nougat/512px/2753.png"))
            .setColor(Color)
            .setTitle(Title)
            .setDescription(Description)
            .setThumbnail(Thumbnail)
            .setTimestamp()
            .setFooter(Footer, (ImgFooter ? ImgFooter : "https://images.emojiterra.com/google/android-nougat/512px/2753.png"))
        return EMBED
    }
}