"use strict";
const {
	MessageType,
	Presence
} = require("@adiwajshing/baileys");
const fs = require("fs");

const { getBuffer, sleep } = require("../lib/myfunc");

let setting = JSON.parse(fs.readFileSync('./setting.json'));
let { botName } = setting

module.exports = async(dha, anj, welcome, left) => {
    const isWelcome = welcome.includes(anj.jid)
    const isLeft = left.includes(anj.jid)
    const mdata = await dha.groupMetadata(anj.jid)
    const groupName = mdata.subject

    if (anj.action === 'add'){
        if (anj.participants[0] === dha.user.jid){
            await sleep(5000)
            dha.updatePresence(anj.jid, Presence.composing)
            dha.sendMessage(anj.jid, `Hai aku ${botName}, silahkan kirim #menu`, MessageType.text)
        } else if (isWelcome){
            try {
                var pic = await xinz.getProfilePicture(anj.participants[0])
            } catch {
                var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
            }
            dha.sendMessage(anj.jid, await getBuffer(pic), MessageType.image, {caption: `Hai @${anj.participants[0].split("@")[0]}, selamat datang di ${groupName}

*Intro Dulu Ye*
*🧸 Nama :*
*🧸 Umur :*
*🧸 Askot:*
*Jangan Lupa Baca Deks*
*do not get out :v*`, contextInfo: {"mentionedJid": [anj.participants[0]]}})
        }
    } else if (anj.action === 'remove' && isLeft){
        try {
            var pic = await xinz.getProfilePicture(anj.participants[0])
        } catch {
            var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
        }
        dha.sendMessage(anj.jid, await getBuffer(pic), MessageType.image, {caption: `Sayonara @${anj.participants[0].split("@")[0]}`, contextInfo: {"mentionedJid": [anj.participants[0]]}})
    }
}
