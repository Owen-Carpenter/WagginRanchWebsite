const express = require("express");

const {google} = require("googleapis");

const app = express();

import { contactArr, selectedPlan, selectedDate, selectedArr} from './scripts/services';

app.get("/", async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    })

    //Create the client instance auth
    const client = await auth.getClient();

    //Instance of google sheets API
    const googleSheets = google.sheets({version: "v4", auth: client});

    const spreadsheetId = "1lQLKlnnaVXn3vWEALZpynWwHQEf-IzsWK_rUVHGVaQ0";

    //Get metadata via spreadsheets
    const metaData = await googleSheets.spreadsheets.get({
        auth, 
        spreadsheetId,

    })

    //Read rows from spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1"
    });

    //Write rows to spreadsheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:G",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[ contactArr[0] + " " + contactArr[1], contactArr[2], contactArr[3], selectedPlan, selectedDate, selectedArr, contactArr[4]]],
        }
    })

    res.send(getRows.data);
})

app.listen(1337, (req, res) => console.log("running on port 1337"));