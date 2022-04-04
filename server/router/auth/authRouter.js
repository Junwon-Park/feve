const express = require('express');
const router = express.Router();
const {
  loginValidator,
  signupValidator
} = require('../../middleware/validator.js');

const { auth } = require('../../controller/auth/auth.js');
const { login } = require('../../controller/auth/login.js');
const { logout } = require('../../controller/auth/logout.js');
const { signup } = require('../../controller/auth/signup.js');
const {
  googleOauth,
  kakaoOauth,
  githubOauth
} = require('../../controller/auth/oauth.js');

router.get('/checktoken', auth);
router.post('/login', loginValidator, login);
router.get('/logout', logout);
router.post('/signup', signupValidator, signup);
router.post('/google', googleOauth);
router.post('/kakao', kakaoOauth);
router.post('/github', githubOauth);

module.exports = router;
