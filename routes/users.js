var express = require('express');
var router = express.Router();

const User = require('../models/users');
const sequelize = require('../sequelize');
const bcrypt = require('bcrypt');

/* GET users listing. */
router.post('/', async function(req, res, next) {
  const registeredUser = await User.create(req.body);
  res.status(201);
  res.json(registeredUser);
});

// ログイン
router.post('/login', async function(req, res, next) {
  const {userName, password} = req.body;
  const [user, metadata] = await sequelize.query(`select * from users where username = '${userName}';`);
  if(user[0] ==null){
    res.send({status:false,jwt:""})
  }else{
    if(user[0].password ==password){
    res.send({status:true,jwt:"success"})
    }else {
      res.send({status:false,jwt:""})
    }
  }
});

// ユーザー登録
router.post('/signup', async function(req, res, next) {
  const registeredUser = await User.create(req.body);
  res.status(201);
  res.json(registeredUser);
});

// 全件検索
router.get('/', async function(req, res, next) {
  const allUsers = await User.findAll();
  res.json(allUsers);
});

// 1件検索(query文使用)
router.get('/:username', async function(req, res, next) {
  console.log('通過');
  const username = req.params.username;
  const [allUsers, metadata] = await sequelize.query(`select * from users where username = '${username}';`);
  console.log('allusers: ',allUsers);
  res.json(allUsers);
});

module.exports = router;
