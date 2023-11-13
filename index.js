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
      const res = await UserHandler.activateUser(google);
      //const res = await GsuiteSupabse.getGsuiteUsersList(supabase);
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

    // return new Response(JSON.stringify(response), {
    //   // headers: { ...corsHeaders, "Content-Type": "application/json" },
    //   status: 200,
    // });
  } catch (err) {
    res.status(400).json({

      message: err.message
    });

    // return new Response(JSON.stringify({ message: err.message }), {
    //   // headers: { ...corsHeaders, "Content-Type": "application/json" },
    //   status: 400,
    // });
  }

  // try {
  //   // First Fetch all suspended Users
  //   // const response = await UserHandler.getUsersList(google);
  //   // const response = await UserHandler.getUser(google);
  //   const request = await req.json();
  //   const { name,action } = request;

  //   if (!action) {
  //     return new Response(JSON.stringify({ message: "No action provided!" }));
  //   } 

  //   // if (!action) {
  //   //   return new Response(JSON.stringify({ message: "No action provided!" }), {
  //   //     headers: { ...corsHeaders, "Content-Type": "application/json" },
  //   //   });
  //   // }
  //   if (!Object.values(ACTIONS).includes(action)) {
  //     return new Response(
  //       JSON.stringify({ message: "Invalid type provided!" })
  //     );
  //   }


  //   const response = await GsuiteSupabse.getGsuiteUsersList(supabase);
  //   //const response = await UserHandler.activateUser(google);

  //   let status = false;
  //   let data = null;
  //   let message = "";

  //   if (action === ACTIONS.GET_GSUITE_SUPA) {
  //     const res = await getAllProducts(supabase);
  //     status = res.status;
  //     data = res.data;
  //     message = res.message;
  //   }

  //   if (response.status) {
  //     res.status(200).json({
  //       message: "Authentication and user listing successful!",
  //       result: response.data,
  //     });
  //   } else {
  //     res.status(400).json({
  //       status: response.status,
  //       message: `Error listing users: ${response.message}`,
  //       code: response.code,
  //     });
  //   }
  // } catch (err) {
  //   res.status(400).json({
  //     status: false,
  //     message: `{Try Catch} => Error listing users: ${err.message}`,
  //     code: err.code,
  //   });
  // }
});


app.post("/testsupa", async (req, res) => {
  try {
    // console.log(req.body);
    const { action } = req.body;
    console.log(action)


    const response = await supabase
      .from('gsuite_users')
      .select('*')

    if (response) {
      res.status(200).json({
        message: "Db gsuitr user found",
        result: response.data,
      });
    } else {
      res.status(400).json({
        status: response.status,
        message: `Error gsuitr user not found: ${response.message}`,
        code: response.code,
      });
    }


    //const response = await supabase.activateUser(google);

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
