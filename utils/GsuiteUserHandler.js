//const { createClient } =  require("@supabase/supabase-js")

// Create a single supabase client for interacting with your database
//const supabase = createClient('https://xyjeeuiqbzbfpysncogl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5amVldWlxYnpiZnB5c25jb2dsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk4NzY1NDYsImV4cCI6MjAxNTQ1MjU0Nn0.uhC9Pmo-9a6Y3TiciFD8b4RbqciWEQN5B6MRyf6uSzk')

// activateUser
const UserHandler = require("./UsersHandler");
const gsuite_users = 'gsuite_users';
const GsuiteSupabse = {
  getGsuiteUsersList: async (supabase) => {
    try {
      const gsuiteSupa = await supabase.from(gsuite_users).select("*");

      if (gsuiteSupa?.error) {
        return { status: false, data: null, message: gsuiteSupa.error };
      } else {
        return {
          status: true,
          data: gsuiteSupa.data.length <= 0 ? null : gsuiteSupa.data,
          message:
            gsuiteSupa.length <= 0 ? "No gsuiteSupa found." : "gsuiteSupa found.",
        };
      }
    } catch (e) {
      return { status: false, data: e, message: e.message };
    }
  },

  getGsuiteSinelUser: async (primaryEmail, supabase) => {
    try {
      const gsuiteSupa = await supabase
      .from(gsuite_users)
      .select("*")
      .eq("primaryEmail", primaryEmail);

      if (gsuiteSupa?.error) {
        return { status: false, data: null, message: gsuiteSupa.error };
      } else {
        return {
          status: gsuiteSupa.data.length  > 0  ,
          data:  gsuiteSupa.data.length  <= 0 ? null : gsuiteSupa.data[0],
          message:
            gsuiteSupa.length <= 0 ? "No gsuiteSupa found." : "gsuiteSupa found.",
        };
      }
    } catch (e) {
      return { status: false, data: e, message: e.message };
    }
  },

  createGsuiteUsersList: async (supabase, getGsuiteUserList,google) => {
    try {

      // console.log('creating record')

      // const userFound = await GsuiteSupabse.getGsuiteSinelUser('asad@kodxsystem.com', supabase)
      // console.log('chekc user found or not ')
      // return true
      // console.log(userFound.status)
      //return false
      console.log(getGsuiteUserList)
      const userData = getGsuiteUserList;
     
      if (userData.data.length > 0) {
        const fetchData = userData.data;
        let newArray = [];
        for (let i = 0; i < fetchData.length; i++) {

          const userFound = await GsuiteSupabse.getGsuiteSinelUser(fetchData[i].primaryEmail, supabase)
          
          UserHandler.activateUser(google,fetchData[i].primaryEmail)

          if(userFound.status){
            console.log('found updattion')
           
            try {
              const { data, error } = await supabase
              .from('gsuite_users')
              .update({ suspended_count: userFound.suspended_count +1 })
              .eq("primaryEmail", fetchData[i].primaryEmail)

              console.log(error)
              
            } catch (error) {
              console.log(error.message)
              
            }

          }else{
            console.log('found insertion')
            newArray.push({
              'name': fetchData[i].name.givenName,
              'suspended': fetchData[i].suspended,
              'reason': '',
              'suspended_count': 1,
              'primaryEmail': fetchData[i].primaryEmail,
              // 'isAdmin': fetchData[i].isAdmin,
              // 'suspended': fetchData[i].suspended,
              // 'name': fetchData[i].name.givenName
            });
          }
          
        }

       try {
        console.log(' inserting record - ')
         const { data, error } = await supabase
         .from('gsuite_users')
         .insert(newArray)
         
         console.log(error)

       } catch (error) {
        
        console.log(' {try catch} error insertion - ', error.message)
       }
        
        console.log('consoling new array')
        //console.log(newArray);
        return { status: true, data: null, message: 'users activated  sucessfully' };
      }else{
        return { status: false, data: null, message: 'no suspended user found' };
      }
     
    } catch (e) {
      return { status: false, data: null, message: e.message };
    }
  },

};

module.exports = GsuiteSupabse;
