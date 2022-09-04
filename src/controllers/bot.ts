import { 
    Client as DiscordClient, 
    Interaction, 
    CommandInteraction, 
    MessageComponentInteraction 
} from 'discord.js';
import slashCommands from '../commands/index';

export class Bot extends DiscordClient {

    constructor(token: string) {
        super({intents:[]});
        this.login(token);
    }

    isReady() {
        return this.on("ready", async () => {
            if (!this.user || !this.application) return;
            await this.application.commands.set(slashCommands);
            console.log(`${this.user?.username} is online`);
        });
    }

    allowInteractions() {
        return this.on("interactionCreate", async (interaction: Interaction) =>{
            if (interaction.isCommand() || interaction.isContextMenuCommand()) {
                await this.handleSlashCommand(interaction);
                console.log(`Interaction ${interaction}`);
            }
            if (interaction.isButton()) {
                await this.handleButtonEvent(interaction);
            }
        });
    }

    private async handleSlashCommand(interaction: CommandInteraction) {
        const slashCommand = slashCommands.find(command => command.name === interaction.commandName);
        if (!slashCommand) {
            interaction.reply({content: "An error has ocurred"});
            return;
        }
        slashCommand.run(this, interaction);
    }

    private async handleButtonEvent(interaction: MessageComponentInteraction) {
        const filter = (i: MessageComponentInteraction) => i.customId == "test_button" ;
        // const procedEvent = buttonEvents.find((event) => event.name === interaction.customId);
        console.log(interaction);
        await interaction.update({content: 'The button was clicked'});
    }
}