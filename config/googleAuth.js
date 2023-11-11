const { google } = require("googleapis");
const { JWT } = require("google-auth-library");
const keyFile = "./service-account.json";
const scopes = [
  "https://www.googleapis.com/auth/admin.directory.user",
  "https://www.googleapis.com/auth/admin.directory.user.readonly",
  "https://www.googleapis.com/auth/cloud-platform",
  "https://www.googleapis.com/auth/admin.directory.user.security",
  "https://www.googleapis.com/auth/admin.directory.group",
];
const targetUserEmail = "admin@kodxsystem.com";

const authInit = () => {
  try {
    const auth = new JWT({
      keyFile,
      scopes,
      subject: targetUserEmail,
    });
    const admin = google.admin({ version: "directory_v1", auth });
    return admin;
  } catch (e) {
    console.log(e.message);
    return null;
  }
};

const customers = ["C03oey03l"];
const searchKeys = {
  suspended: "C03oey03l",
};

module.exports.google = authInit();
module.exports.customers = customers;
module.exports.searchKeys = searchKeys;
