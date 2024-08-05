const express = require("express");

const {google} = require("googleapis");

const app = express();

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

    //Write rows to spreadsheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:F",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[]],
        }
    })
})

app.listen(1337, (req, res) => console.log("running on port 1337"));