const { google } = require("googleapis");
const { JWT } = require("google-auth-library");
const express = require("express");
const app = express();

const keyFile = "./service-account.json";
const scopes = [
  "https://www.googleapis.com/auth/admin.directory.user",
  "https://www.googleapis.com/auth/admin.directory.user.readonly",
  "https://www.googleapis.com/auth/cloud-platform",
];

const auth = new JWT({
  keyFile,
  scopes,
});
const admin = google.admin({ version: "directory_v1", auth });

async function listUsers() {
  const admin = google.admin("directory_v1");

  try {
    // Authorize the client
    await auth.authorize();

    // Call the Directory API
    const response = await admin.users.list({
      auth,
      customer: "C03oey03l", // Use the correct customer ID
      maxResults: 10,
    });

    const users = response.data.users;
    console.log("Users:", users);
  } catch (error) {
    console.error("Error:", error.message);
    console.error("Error Details:", error.errors); // Log additional error details

    // Log the full response for further inspection
    console.error(
      "Full Response:",
      error.response ? error.response.data : "N/A"
    );
  }
}
app.get("/", async (req, res) => {
  //   await listUsers();
  admin.users.list(
    {
      customer: "C03oey03l", // The string "my_customer" can be used for the domain's primary domain or "customerId."
    },
    (err, response) => {
      if (err) {
        res.status(200).json({
          message: "Error listing users:",
          err: err.message,
        });
        return;
      }

      const users = response.data.users;
      // Process the list of users as needed
      //   console.log("Users:", users);
      res.status(200).json({
        message: "Authentication and user listing successful!",
        users,
      });
    }
  );
});
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
