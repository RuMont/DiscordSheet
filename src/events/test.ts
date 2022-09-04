import { MessageComponentInteraction } from "discord.js";
import { Bot } from "../controllers/bot";
import { ButtonEvent } from "../interfaces/buttonEvent";

export const test: ButtonEvent = {
    name: "test_button",
    run: async (bot: Bot, interaction: MessageComponentInteraction) => {
        await interaction.update({
            content: 'The button was clicked'
        })
    }
}