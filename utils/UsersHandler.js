const { customers } = require("../config/googleAuth");

const UsersHandler = {
  getUsersList: async (google) => {
    try {
      if (google) {
        const result = await google.users.list({
          customer: customers[0],
        });
        const suspendedUser = result.data.users.filter(
          (user) => user.suspended == true
        );
        return { status: true, data: suspendedUser };
      } else {
        return { status: false, message: "Unable to initialize google auth" };
      }
    } catch (e) {
      return { status: false, message: e.message, code: e.code };
    }
  },
  getUser: async (google) => {
    try {
      // return gapi.client.directory.users.get({
      //     "userKey": "accounts@kodxsystem.com"
      //   })
      if (google) {
        const result = await google.users.get({
          //   customer: customers[0],
          userKey: "tahir@kodxsystem.com",
        });
        return { status: true, data: result.data };
      } else {
        return { status: false, message: "Unable to initialize google auth" };
      }
    } catch (e) {
      return { status: false, message: e.message, code: e.code };
    }
  },
  activateUser: async (google, email) => {
    try {
      if (google) {
        const result = await google.users.update({
          //   customer: customers[0],
          userKey: email,
          resource: {
            suspended: false,
          },
        });
        return { status: true, data: result.data };
      } else {
        return { status: false, message: "Unable to initialize google auth" };
      }
    } catch (e) {
      return { status: false, message: e.message, code: e.code };
    }
  },
};

module.exports = UsersHandler;
