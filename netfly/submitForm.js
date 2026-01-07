const { google } = require("googleapis");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  }

  try {
    const data = JSON.parse(event.body);

    const auth = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      null,
      process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Sheet1!A1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          new Date().toISOString(),

          data.email || "",
          data.fullName || "",
          data.contact || "",
          data.address || "",
          data.dob || "",
          data.hobbies || "",
          data.riId || "",
          data.clubType || "",
          data.currentClub || "",
          data.joinYear || "",

          data.pastRoles || "",
          data.achievements || "",

          data.primaryRole || "",
          data.primaryWhy || "",
          data.secondaryRole || "",
          data.secondaryWhy || "",

          data.districtWhy || "",
          data.strengths || "",
          data.time || ""
        ]]
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};