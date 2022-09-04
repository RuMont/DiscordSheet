import { ActionRowBuilder, ApplicationCommandType, CommandInteraction, SelectMenuBuilder } from "discord.js";
import { slashCommand } from "../interfaces/slashCommand";
import { spreadsheet } from '../services/init';
import { Bot } from '../controllers/bot';

export const show: slashCommand = {
    name: "show",
    description: "Shows the selected player",
    type: ApplicationCommandType.ChatInput,
    run: async (bot: Bot, interaction: CommandInteraction) => {
        // 'Nombre' 'Rol', --, 'Participación', --, 'MainSpec', --, 'OffSpec', --
        let options: any[] = [];

        spreadsheet?.forEach((row) => {
            if (row[0]) {
                options.push({
                    label: row[0],
                    value: row[0],
                    description: row[5]
                })
            };
        });

        const row = new ActionRowBuilder<SelectMenuBuilder>()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId("player_selector")
                    .setPlaceholder("Selecciona un personaje")
                    .addOptions(options)
            )

        await interaction.reply({ components: [row] });
    }
}