import { google } from "googleapis";
import 'dotenv/config';

export abstract class SpreadSheet {

    public static async get(auth: any) {
        const sheets = google.sheets({version: 'v4', auth: auth});
        console.log('Connected to Google Sheets API');
        return sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SPREADSHEET_ID!,
            range: process.env.SPREADSHEET_RANGE!
        });
    }
}