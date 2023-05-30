/** 
 * emailService.js
 * @description :: exports function used in sending mails using mailgun provider
 */

const nodemailer = require('nodemailer');
const Email = require('email-templates');
//const { json } = require('sequelize/types');

const transporter = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
    user: process.env.MAILGUN_USER,
    pass: process.env.MAILGUN_PASSWORD
  }
});

const sendMail = async (emailObject) => {
  try {
    const email = new Email({
      message: {
        subject: emailObject.subject,
        from: emailObject.from || 'admin@riotechz.com',
        cc: emailObject.cc || [],
        bcc: emailObject.bcc || [],
        attachments: emailObject.attachments || [],
        replyTo: emailObject.replyTo || []
      },
      send: true,
      transporter: transporter,
      views: { options: { extension: 'ejs' } }
    });
    const emailStatus = await email.send({
      template: emailObject.template,
      message: { to: emailObject.data.email, },
      locals: emailObject.data,
    }); 
    return emailStatus;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { sendMail };