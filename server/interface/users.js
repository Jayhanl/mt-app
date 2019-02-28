import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import User from '../dbs/models/users'
import Email from '../dbs/config'
import Passport from './utils/passport'
import axios from './utils/axios'

let router = new Router({
  prefix: '/users'
})

let Store = new Redis().client
//注册
router.post('/signup', async (ctx) => {
  const {
    username,
    password,
    email,
    code
  } = ctx.request.body

  if (code) {
    const saveCode = await Store.hget(`nodemail:${username}`, 'code')
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
    if (code === saveCode) {
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期，请重新尝试'
        }
        return false
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请填写正确的验证码'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
  }
  let user = await User.find({username})
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '用户已被注册'
    }
    return
  }
  let nuser = await User.create({username, password, email})
  if (nuser) {
    let res = await axios.post('/users/signin', {
      username,
      password
    })
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'error'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }
})
//登录
router.post('/signin', async (ctx, next) => {
  return Passport.authenticate('local', function (err, user, info, status) {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          msg: '登录成功',
          user
        }
        return ctx.login(user)
      } else {
        ctx.body = {
          code: 1,
          msg: info
        }
      }
    }
  })(ctx, next)
})
//发送邮箱验证码
router.post('/verify', async (ctx, next) => {
  let username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
  console.log(saveExpire)
  let obj = await Store.hgetall(`nodemail:${username}`)
      console.dir(obj);
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '请求过于频繁，请1分钟后再试'
    }
    return false
  }
  let transporter = nodeMailer.createTransport({ //基本配置
    service: 'qq',
    // host: Email.smtp.host,
    // secureConnection: true,//SSL连接
    // port: 465,
    //secure: true, //true,监听465端口
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  })
  //设置好收件人
  let ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }
  //发送邮件
  let mailOptions = {
    from: `"认证邮件"<${Email.smtp.user}>`, //发件方
    to: ko.email,
    subject: '《jayhan》验证码',
    html: `您在jayhan高仿美团网中注册的验证码为：${ko.code}`
  }
  await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return console.log(err)
    } else {
      Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
    }
  })
  ctx.body = {
    code: 0,
    msg: '验证码已发送，可能会有延迟，有效时间1分钟'
  }
})
//退出登录（注销）
router.get('/exit', async (ctx, next) => {
  await ctx.logout()
  if (!ctx.isAuthenticated()) { //isAuthenticated,检查是否处于登录状态
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'error'
    }
  }
})
//获取用户信息
router.get('/getUser', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const {
      username,
      email
    } = ctx.session.passport.user
    ctx.body = {
      user: username,
      email
    }
  } else {
    ctx.body = {
      user: '',
      email: ''
    }
  }
})

export default router
