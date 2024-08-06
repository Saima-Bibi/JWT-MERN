import nodemailer from "nodemailer"

const emailSender=async(obj)=>{

   
    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.EMAILPORT, // Use TLS
        secure: false, // Use TLS instead of SSL
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        },
        connectionTimeout: process.env.CONNECTIONTIMEOUT, // Increase timeout to 20 seconds
        debug: true // Enable debug mode
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