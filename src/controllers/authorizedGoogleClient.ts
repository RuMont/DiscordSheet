import { authenticate } from "@google-cloud/local-auth";
import { readFile, writeFile } from "fs/promises";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import path from "path";

export class AuthorizedGoogleClient {
    private TOKEN_PATH = path.join(process.cwd(), 'src\\config\\token.json');
    private CREDENTIALS_PATH = path.join(process.cwd(), 'src\\config\\credentials.json');
    private SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    private client: OAuth2Client;

    private async loadSavedCredentialsIfExist(): Promise<any> {
        try {
            const content = await readFile(this.TOKEN_PATH);
            const credentials = JSON.parse((content as unknown) as string);
            return google.auth.fromJSON(credentials);
        } catch (err) {
            return null;
        }
    }

    private async saveCredentials(client: OAuth2Client) {
        const content = await readFile(this.CREDENTIALS_PATH);
        const keys = JSON.parse((content as unknown) as string);
        const key = keys.installed || keys.web;
        const payload = JSON.stringify({
            type: 'authorized_user',
            client_id: key.client_id,
            client_secret: key.client_secret,
            refresh_token: client.credentials.refresh_token,
        });
        await writeFile(this.TOKEN_PATH, payload);
    }

    private async authorize() {
        let client = await this.loadSavedCredentialsIfExist();
        if (client) {
            this.client = client;
            return;
        }
        client = await authenticate({
            scopes: this.SCOPES,
            keyfilePath: this.CREDENTIALS_PATH,
        });
        if (client.credentials) {
            await this.saveCredentials(client);
        }
        this.client = client;
        return;
    }

    public async getClient() {
        await this.authorize();
        console.log('Logged into Google');
        return this.client;
    }
}