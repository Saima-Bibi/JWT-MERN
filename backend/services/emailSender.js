import nodemailer from "nodemailer"

const emailSender=async(obj)=>{

   
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.USER,
        to: obj.email,
        subject: obj.subject,
        text: obj.text
    }

    try {
        const result = await transporter.sendMail(mailOptions)
        console.log('Email sent successfully', result)
        return result

    } catch (error) {
        console.log(error)
    }
}
export {emailSender}