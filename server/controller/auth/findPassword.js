const bcrypt = require('bcrypt');
const { User } = require('../../models');
const { config } = require('../../config');

const findPassword = async (req, res) => {
  const { USER_ID, USER_MAIL, inputNewPassword } = req.body;
  console.log(USER_MAIL);

  const userFind = await User.findOne({ where: { USER_ID, USER_MAIL } });
  console.log(userFind);

  if (!userFind) res.status(403).json({ message: 'Invalid user!!!' });
  else {
    bcrypt.hash(
      inputNewPassword,
      config.bcrypt.saltRounds,
      async (err, hashed) => {
        if (err) return console.error('Update is failed!!!', new Error(err));
        else {
          User.update(
            { USER_PASSWORD: hashed },
            {
              where: {
                USER_ID,
                USER_MAIL
              }
            }
          )
            .then((result) => {
              console.log(result);
              res.json({ data: result[0], message: 'Update successed!!!' });
            })
            .catch((err) => {
              if (err)
                return console.error('Update is failed!!!', new Error(err));
            });

          //   if (!created)
          //     res
          //       .status(409) // Conflict
          //       .json({ message: 'Signup failed' });
          //   else {
          //     const { USER_ID, USER_MAIL } = user;
          //     const accessToken = await genAccToken(user);
          //     const refreshToken = await genRefToken(user);

          //     res
          //       .status(201)
          //       .cookie('refreshToken', refreshToken, {
          //         httpOnly: true,
          //         sameSite: 'None',
          //         secure: true,
          //         maxAge: 72 * 60 * 60 * 10000 // 30d
          //       })
          //       .json({ data: { accessToken, USER_ID, USER_MAIL } });
          //     }
        }
      }
    );
  }
};

module.exports = { findPassword };
