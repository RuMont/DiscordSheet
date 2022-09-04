import { AuthorizedGoogleClient } from "../controllers/authorizedGoogleClient";
import { Bot } from "../controllers/bot";
import 'dotenv/config';
import { OAuth2Client } from 'google-auth-library';
import { SpreadSheet } from "../controllers/spreadsheet";

export let client: OAuth2Client;
export let bot: Bot;
export let spreadsheet: any[][] | null | undefined

export async function Init() {
    client = await (new AuthorizedGoogleClient()).getClient();
    spreadsheet = (await SpreadSheet.get(client)).data.values;
    bot = new Bot(process.env.DISCORD_CLIENT_TOKEN!);
    bot.isReady();
    bot.allowInteractions();
}