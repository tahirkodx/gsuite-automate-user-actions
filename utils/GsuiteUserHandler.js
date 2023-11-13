//const { createClient } =  require("@supabase/supabase-js")

// Create a single supabase client for interacting with your database
//const supabase = createClient('https://xyjeeuiqbzbfpysncogl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5amVldWlxYnpiZnB5c25jb2dsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk4NzY1NDYsImV4cCI6MjAxNTQ1MjU0Nn0.uhC9Pmo-9a6Y3TiciFD8b4RbqciWEQN5B6MRyf6uSzk')

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

};

module.exports = GsuiteSupabse;
