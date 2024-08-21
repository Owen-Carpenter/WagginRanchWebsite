const express = require("express");
const { google } = require("googleapis");
const cors = require("cors");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors());

app.post("/data", async (req, res) => {
    const { selectedPlan, contactArr, formalDate, selectedArr, servicePage } = req.body;

    console.log(req.body);

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    // Create the client instance auth
    const client = await auth.getClient();

    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = "1lQLKlnnaVXn3vWEALZpynWwHQEf-IzsWK_rUVHGVaQ0";

    // Write rows to spreadsheet
    
    const services = [
        "daycare",
        "grooming",
        "boarding"
    ];

    if(servicePage == services[0]){
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "DaycareScheduling!A:G",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [
                        `${contactArr[0]} ${contactArr[1]}`,
                        contactArr[2],
                        contactArr[3],
                        selectedPlan,
                        formalDate,
                        selectedArr.join(', '),
                        contactArr[4]
                    ]
                ]
            }
        });
    }else if(servicePage == services[1]){
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "GroomingScheduling!A:G",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [
                        `${contactArr[0]} ${contactArr[1]}`,
                        contactArr[2],
                        contactArr[3],
                        selectedPlan,
                        formalDate,
                        selectedArr.join(', '),
                        contactArr[4]
                    ]
                ]
            }
        });
    }else if(servicePage == services[2]){
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "BoardingScheduling!A:G",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [
                        `${contactArr[0]} ${contactArr[1]}`,
                        contactArr[2],
                        contactArr[3],
                        selectedPlan,
                        formalDate,
                        selectedArr.join(', '),
                        contactArr[4]   
                    ]
                ]
            }
        });
    }else{
        console.log("Error getting the service type");
    }
    res.json({ message: "Data saved successfully!" });
});

// Start the server on port 1337
app.listen(1337, () => console.log("Server running on port 1337"));