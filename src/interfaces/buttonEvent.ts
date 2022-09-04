import { MessageComponentInteraction } from 'discord.js';
import { Bot } from '../controllers/bot';

export interface ButtonEvent {
    name: string,
    run: (bot: Bot, interaction: MessageComponentInteraction) => void
}