import User from '@/models/userModels'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
interface props {
    email:string,
    emailType:string,
    userId: string
}

export const sendEmail = async({email,emailType,userId}:props) =>{
    try{
        const hashedToken = await bcrypt.hash(userId.toString(),10);
        const verificationMsg =
            `<div style="font-family: Arial, sans-serif; text-align: center;">
                <h2 style="color: #333;">Verify Your Email</h2>
                <p>Thank you for signing up! Please click the button below to verify your email address.</p>
                <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}" 
                    style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; 
                    background-color: #007bff; text-decoration: none; border-radius: 5px;">
                    Verify Emali
                </a>
                <br>
                <p>If the button doesn't work,Copy and paste the link below in your browser to verify the <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>
                <p>If you didn't request this, ignore this email.</p>
                <p style="color: gray; font-size: 12px;">This link will expire in one hour.</p>
            </div>`
          const forgettingMsg = 
            `<div style="font-family: Arial, sans-serif; text-align: center; max-width: 600px; margin: auto;">
              <h2 style="color: #333;">Forgot Your Password?</h2>
              <p>No worries! Click the button below to reset your password.</p>
              <a href="${process.env.DOMAIN}/passwordreset?token=${hashedToken}" 
                  style="display: inline-block; padding: 12px 20px; font-size: 16px; color: white; 
                  background-color: #ff5733; text-decoration: none; border-radius: 5px; margin: 10px 0;">
                  Reset Password
              </a>
              <p>If the button doesn't work,Copy and paste the link below in your browser to verify the <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>
              <p>If you didn’t request this, simply ignore this email.</p>
              <p style="color: gray; font-size: 12px;">This link will expire in one hour.</p>
            </div>`
        if(emailType==="VERIFY"){
          await User.findByIdAndUpdate(userId,{$set:{verifyToken:hashedToken,verifyTokenExpiry:Date.now()+3600000}})
        }else if(emailType==="RESET"){
          await User.findByIdAndUpdate(userId,{$set:{forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now()+3600000}})
        }

        const transporter = nodemailer.createTransport({
          host:"sandbox.smtp.mailtrap.io",
          port:2525,
          auth: {
            user:process.env.MAILTRAP_USERNAME,
            pass:process.env.MAILTRAP_PASS,
          }
        });
        const mailOption = {
            from: "srm@srmenterprises.com", // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password", // Subject line
            html: emailType === 'VERIFY' ? verificationMsg : forgettingMsg, // html body
          }
        const mailResponse = await transporter.sendMail(mailOption);
        return mailResponse;
    }catch(error){
        if(error instanceof Error){
            throw new Error(error.message)
        }
        console.log(error)
    }
}