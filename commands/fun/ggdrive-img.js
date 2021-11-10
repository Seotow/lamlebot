const Discord = require('discord.js');
const fs = require('fs');
const { google } = require('googleapis');
const errors = require('../../errors.json');
const driveToken = require('../../config.json');
const credentials = require('../../credentials.json');
require("dotenv").config();

module.exports = {
    name: 'img',
    aliases: ['gai', 'girl', 'g'],
    category: 'fun',
    run: async (client, message, args) => {
        // if(message.author.id != 680039671765532756){
        //     return message.reply({ 
        //         content: `Chỉ nguyentrunghjeu mới có thể dùng`
        //     })
        // };
        const { client_secret, client_id, redirect_uris } = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
        oAuth2Client.setCredentials(driveToken);

        const drive = google.drive({ version: 'v3', auth: oAuth2Client })

        const randomArrElement = (list = []) => list[Math.floor(Math.random() * (list.length - 1))]


        try {
            drive.files.list({
                folderId: process.env.DRIVE_DIR,
                q: "mimeType contains 'image' and trashed = false"
                }, (error, response) => {
                    if (error) {
                        return console.log("ERROR", error);
                    }
                    const list = response;

                    if (!!list.data.files.length) {
                        const index = Math.floor(Math.random() * (list.data.files.length - 1));
                        const fID = list.data.files[index].id;
                        const mimeType = list.data.files[index].mimeType;

                        const data = drive.files.get(
                            {
                                fileId: fID,
                                alt: "media"
                            },
                            { responseType: "stream" },
                            (err, res) => {
                                const fileName = fID + "." + mimeType.split("/")[1];
                                const file = fs.createWriteStream(fileName);
                                res.data
                                    .on('end', () => {
                                        message
                                        .reply(
                                            {files: [fileName]},
                                        )
                                        .then(() => {
                                            file.end()
                                            fs.unlinkSync(fileName)
                                        })

                                    })
                                    .on("error", error => message.reply(randomArrElement(errors) + " Error: " + error.message))
                                    .pipe(file)
                            }
                        );
                       
                    }
                    else {
                        message.reply(randomArrElement(errors), { files: [process.env.FOF] });
                    }
                })
        } catch (error) {
            console.log(error)
            message.reply(randomArrElement(errors) + " Error: " + error.message)
        }

    }
}