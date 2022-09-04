import { ActionRowBuilder, ApplicationCommandType, ButtonBuilder, ButtonStyle, CommandInteraction, SelectMenuBuilder } from 'discord.js';
import { slashCommand } from "../interfaces/slashCommand";
import { Bot } from '../controllers/bot';

export const test: slashCommand = {
    name: "test",
    description: "Test command",
    type: ApplicationCommandType.ChatInput,
    run: async (bot: Bot, interaction: CommandInteraction) => {
        const row1 = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("test_button")
                    .setLabel('Click me')
                    .setStyle(ButtonStyle.Primary),
            )
        const row2 = new ActionRowBuilder<SelectMenuBuilder>()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId("class_selector")
                    .setPlaceholder("Escoge tu clase principal")
                    .setMinValues(1)
                    .setMaxValues(3)
                    .addOptions(
                        {
                            label: "Warrior",
                            value: "warrior",
                            emoji: {
                                name: "warrior",
                                id: "767833760241549364"
                            }
                        },
                        {
                            label: "Paladin",
                            value: "paladin",
                            emoji: {
                                name: "paladin",
                                id: "767833689685229608"
                            }
                        },
                        {
                            label: "Death Knight",
                            value: "dk",
                            emoji: {
                                name: "dk",
                                id: "767833641307865099"
                            }
                        },
                        {
                            label: "Shaman",
                            value: "shaman",
                            emoji: {
                                name: "shaman",
                                id: "767833730802516078"
                            }
                        },
                        {
                            label: "Hunter",
                            value: "hunter",
                            emoji: {
                                name: "hunter",
                                id: "767834219762155562"
                            }
                        },
                        {
                            label: "Druid",
                            value: "druid",
                            emoji: {
                                name: "druid",
                                id: "767834010293370930"
                            }
                        },
                        {
                            label: "Rogue",
                            value: "rogue",
                            emoji: {
                                name: "rogue",
                                id: "767833715803160596"
                            }
                        },
                        {
                            label: "Mage",
                            value: "mage",
                            emoji: {
                                name: "mage",
                                id: "767833653282865182"
                            }
                        },
                        {
                            label: "Priest",
                            value: "priest",
                            emoji: {
                                name: "priest",
                                id: "767833700829888543"
                            }
                        },
                        {
                            label: "Warlock",
                            value: "warlock",
                            emoji: {
                                name: "warlock",
                                id: "767833747256901682"
                            }
                        }
                    )
            )
        await interaction.reply({ components: [row1, row2] });
    }
}