const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const path = require('path')
const { host, port, user, pass } = require('../config/mail.json')

var transport = nodemailer.createTransport({
  host,
  port,
  auth: {
    user, pass
  }
});


transport.use('compile', hbs({
  viewEngine: {
    extname: '.html',
    layoutsDir: './src/resources/mail/auth',
    defaultLayout: 'forgot_password',
  },
  viewPath: path.resolve('./src/resources/mail/'),
  extName: '.html'
}))

module.exports = transport