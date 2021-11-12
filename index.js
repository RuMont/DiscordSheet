const fs = require('fs');
const { google } = require('googleapis'); //Using google sheets v4
const { Intents } = require('discord.js');
const Discord = require('discord.js') //Using discord.js v13
const { MessageEmbed } = require('discord.js')
const { client_token, prefix } = require("./config.json")
const credentials = require("./credentials.json");

const TOKEN_PATH = 'token.json';
const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
// const sheet = { spreadsheetId: "1otSMDNp4R3h5GCZrlA1GxDTl4LtglZ4n0QheN7EsZNM", range: "TEST2 (DO NOT TOUCH)!A2:K141" }
const sheet = { spreadsheetId: "11y6fvA177pUczHOJgGj0BeUX5n4uWIOeKPJCtqYDirY", range: "Hoja 1!A2:E141" }

//Check if credentials are ok within credentials.json
fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    authorize(JSON.parse(content), (auth) => {
        const sheets = google.sheets({ version: 'v4', auth });
        sheets.spreadsheets.values.get(sheet, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            if (!res.data.values.length) {
                console.log('No data found.');
            }
        });
    });
});

//This function calls to Sheets API
function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

//Shows column 1 and 2 from @sheet
function playerList(msg) {
    authorize(credentials, (auth) => {
        const sheets = google.sheets({ version: 'v4', auth });
        sheets.spreadsheets.values.get(sheet, (err, res) => {
            const rows = res.data.values;
            if (rows.length) {
                let reply = "";
                let reply2 = "";
                let reply3 = "";
                rows.map((row, i) => {
                    //Format: #number, $name, $role
                    //Max content length in a msg is 2000
                    if (reply.length < 1950) {
                        reply += `${(i + 1)}, ${row[0]}, ${row[1]} \n`;
                    } else if (reply.length >= 1950 && reply2.length < 1950) {
                        reply2 += `${(i + 1)}, ${row[0]}, ${row[1]} \n`;
                    } else if (reply2.length >= 1950 && reply3.length < 1950) {
                        reply3 += `${(i + 1)}, ${row[0]}, ${row[1]} \n`;
                    }

                });
                msg.reply(reply);
                if (reply2) {
                    msg.reply(reply2);
                }
                if (reply3) {
                    msg.reply(reply3);
                }
            }
        });
    });

}

//This makes possible looking for compound names just using single-quotes
function resolveCompound(args) {
    if (args[1].startsWith("'")) {
        while (!args[1].endsWith("'")) {
            if (args[2]) {
                args[1] += ` ${args[2]}`;
            } else {
                break;
            }
        }
        return args[1].slice(1, args[1].length - 1);
    }
    return
}

//Shows the given player info as an embed message
function showPlayer(msg, args) {
    authorize(credentials, (auth) => {
        const sheets = google.sheets({ version: 'v4', auth });
        sheets.spreadsheets.values.get(sheet, (err, res) => {

            let args2 = [...args];
            args2[1] = resolveCompound(args2);

            const rows = res.data.values;
            if (rows.length) {
                let bool = false;
                rows.map((row) => {
                    // ['Dakri', 'Damage', '', '', '', '42', 'Spear', '', 'Bow', '', '2']
                    if (row[0] === args2[1]) {
                        let mainwpn;
                        mainwpn = row[6].replace(/ /, '');

                        //This builds information as an embed message
                        const embed = new MessageEmbed()
                            .setTitle(`${row[0]}`)
                            .setThumbnail(`attachment://${mainwpn}.png`)
                            .setColor('WHITE')
                            .addFields(
                                { name: 'Role:', value: row[1] },
                                { name: 'Level:', value: row[2] },
                                { name: 'Main Weapon:', value: row[3], inline: true },
                                { name: 'Off Weapon:', value: row[4], inline: true }
                            )
                            .setTimestamp();

                        msg.reply({ embeds: [embed], files: [`./resources/nwiconsblack/${mainwpn}.png`] });
                        bool = true;
                    }
                });
                if (!bool) {
                    msg.reply(`Player not found, sorry :(, remember to use single-quote (') when looking for players' name.`);
                }
            }
        });
    });
}

//Sends a DM message with the instructions
function helpEmbed(msg) {
    const embed = new MessageEmbed()
        .setTitle('Available commands:')
        .setColor('NAVY')
        .setDescription('Here you can see the available commands for version 0.1v')
        .addFields(
            { name: '$showall:', value: 'Shows the entire list of the guild' },
            { name: '$show {name}', value: 'Shows an unique player. Name has to be given in {name} argument.' },
            { name: '$help:', value: 'Shows basic commands.' },
        )
        .setTimestamp();
    msg.author.send({ embeds: [embed] });
}

//Initialize the discord bot when 'node .' is typed
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
})

//Command handler
client.on('messageCreate', msg => {

    if (!msg.content.startsWith(prefix)) return;

    const args = msg.content.substring(prefix.length).split(/ +/);

    switch (args[0]) {
        case "showall":
            playerList(msg);
            break;

        case "show":
            showPlayer(msg, args);
            break;

        case "help":
            helpEmbed(msg);
            break;

        default:
            msg.reply('Wrong command. Use $help to get information about commands');
    }
})

//Token stored in config.json
client.login(client_token);