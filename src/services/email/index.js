const nodemailer = require('nodemailer');
const config = require('../../config');

module.exports = {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    transporter: nodemailer.createTransport({
        host: config.email.host,
        port: config.email.port,
        secure: false,
        auth: {
            user: config.email.user,
            pass: config.email.pass
        }
    }),

    // send mail with defined transport object
    send: async function (mailOptions) {
        await this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                throw new Error(error.message);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
 
    })}
}
    
