const express = require("express");
const { google } = require("./config/googleAuth");
const UserHandler = require("./utils/UsersHandler");
const GsuiteSupabse = require("./utils/GsuiteUserHandler");
const bodyParser = require('body-parser');
// Use body-parser middleware to parse JSON data


const ACTIONS = require('./utils/actions.js');
const app = express();

app.use(bodyParser.json());
const { createClient } = require("@supabase/supabase-js")

// Create a single supabase client for interacting with your database
const supabase = createClient('https://xyjeeuiqbzbfpysncogl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5amVldWlxYnpiZnB5c25jb2dsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk4NzY1NDYsImV4cCI6MjAxNTQ1MjU0Nn0.uhC9Pmo-9a6Y3TiciFD8b4RbqciWEQN5B6MRyf6uSzk')


app.post("/", async (req, res) => {

  try {
    // if (req.method === "OPTIONS") {
    //   return new Response("ok", { headers: corsHeaders });
    // }
    const { action } = req.body;
    if (typeof action === "undefined" && !action) {
      res.status(200).json({
        message: "No action provided!"
      });
    }

    if (!Object.values(ACTIONS).includes(action)) {
      res.status(200).json({
        message: "Invalid type provided!"
      });

    }

    let status = false;
    let data = null;
    let message = "";

    if (action === ACTIONS.GET_GSUITE_SUPA) {

      const res = await GsuiteSupabse.getGsuiteUsersList(supabase);
      status = res.status;
      data = res.data;
      message = res.message;
    }
    if (action === ACTIONS.GET_GSUITE_ACTIVE_USER) {
      const res = await UserHandler.activateUser(google,'tahir@kodxsystem.com');
      //const res = await GsuiteSupabse.getGsuiteUsersList(supabase);
      status = res.status;
      data = res.data;
      message = res.message;
    }

    if (action === ACTIONS.GET_GSUITE_USER_LIST) {
      const res = await UserHandler.getUsersList(google);
      //const res = await GsuiteSupabse.getGsuiteUsersList(supabase);
      status = res.status;
      data = res.data;
      message = res.message;
    }
    if (action === ACTIONS.CREATE_GSUITE_USER) {
      const getGsuiteUserList =  await UserHandler.getUsersList(google);
      //console.log(getGsuiteUserList)

      const res = await GsuiteSupabse.createGsuiteUsersList(supabase,getGsuiteUserList,google);
      
      status = res.status;
      data = res.data;
      message = res.message;
    }

    
    

    
    const response = {
      response: `${action}`,
      status,
      data,
      message,
    };
    console.log(action)
    console.log(response)


    res.status(200).json({
      result: response,
    });

    
  } catch (err) {
    res.status(400).json({

      message: err.message
    });

    
  }

  
});


app.listen(80, () => {
  console.log("Server is running on http://localhost:80");
});
