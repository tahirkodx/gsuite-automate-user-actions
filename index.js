const express = require("express");
const { google } = require("./config/googleAuth");
const UserHandler = require("./utils/UsersHandler");
const app = express();

app.get("/", async (req, res) => {
  try {
    // First Fetch all suspended Users
    // const response = await UserHandler.getUsersList(google);
    // const response = await UserHandler.getUser(google);
    const response = await UserHandler.activateUser(google);
    if (response.status) {
      res.status(200).json({
        message: "Authentication and user listing successful!",
        result: response.data,
      });
    } else {
      res.status(400).json({
        status: response.status,
        message: `Error listing users: ${response.message}`,
        code: response.code,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: false,
      message: `{Try Catch} => Error listing users: ${err.message}`,
      code: err.code,
    });
  }
});
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
