import { ChatInputApplicationCommandData, CommandInteraction } from "discord.js";
import { Bot } from '../controllers/bot';

export interface slashCommand extends ChatInputApplicationCommandData {
    run: (bot: Bot, interaction: CommandInteraction) => void;
}