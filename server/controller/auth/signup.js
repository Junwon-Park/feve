const { User } = require('../../models');

const signup = async (req, res) => {
  const {
    USER_ID,
    USER_PASSWORD,
    USER_NAME,
    USER_MAIL,
    USER_PHONE,
    USER_ADDRESS1,
    USER_ADDRESS2,
    USER_DELETE,
    USER_ADMIN
  } = req.body;

  let now = new Date();
  const [user, created] = await User.findOrCreate({
    where: {
      USER_ID,
      USER_PASSWORD,
      USER_NAME,
      USER_MAIL,
      USER_PHONE,
      USER_ADDRESS1,
      USER_ADDRESS2,
      USER_DELETE,
      USER_ADMIN
    },
    defaults: {
      createdAt: now
    }
  });
  console.log(created);
};

module.exports = { signup };
