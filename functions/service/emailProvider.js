const nodemailer= require('nodemailer')


const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

const sendOtpToEmail = async(email,otp) =>{
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your email verification otp",
            text: `Your otp is ${otp}. It will expire in 10 minutes`,
            html: `<b>Your otp is ${otp}. It will expire in 10 minutes</b>`, 
          });
        
          console.log("Message sent: %s", info.messageId);
          return info;
    } catch (error) {
        console.error(error,'error sending email otp')
        throw new Error(error.message,'failed to send email' )
    }
}
module.exports = {sendOtpToEmail}