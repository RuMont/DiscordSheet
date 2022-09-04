import { ApplicationCommandType, CommandInteraction } from 'discord.js';
import { slashCommand } from "../interfaces/slashCommand";
import { Bot } from '../controllers/bot';
import { spreadsheet } from '../services/init';

export const showPlayers: slashCommand = {
    name: "showplayers",
    description: "Shows all players in the spreadsheet",
    type: ApplicationCommandType.ChatInput,
    run: async (bot: Bot, interaction: CommandInteraction) => {
        // 'Nombre' 'Rol', --, 'Participación', --, 'MainSpec', --, 'OffSpec', --
        let response = "";
        let response2 = "";
        let response3 = "";
        let totalPlayers = 0;
        spreadsheet?.map((row, i) => {
            if (!row[0]) return;
            totalPlayers++;
            if (response.length < 1900) response += `${i}. ${row[0] ? row[0] : ""} ${row[1] ? row[1] : ""} ${row[3] ? "(Participation " + row[3] + ")" : ""} ${row[5] ? '- MainSpec: ' + row[5] : ""} ${row[7] ? '- OffSpec: ' + row[7] : ""}\n`;
            if (response.length >= 1900) response2 += `${i}. ${row[0] ? row[0] : ""} ${row[1] ? row[1] : ""} ${row[3] ? "(Participation " + row[3] + ")" : ""} ${row[5] ? '- MainSpec: ' + row[5] : ""} ${row[7] ? '- OffSpec: ' + row[7] : ""}\n`;
            if (response2.length >= 1900) response3 += `${i}. ${row[0] ? row[0] : ""} ${row[1] ? row[1] : ""} ${row[3] ? "(Participation " + row[3] + ")" : ""} ${row[5] ? '- MainSpec: ' + row[5] : ""} ${row[7] ? '- OffSpec: ' + row[7] : ""}\n`;
        });
        [response, response2, response3].map(async (res) => {
            if (!res) return;
            return await interaction.reply({
                ephemeral: true,
                content: res
            });
        })
    }
}