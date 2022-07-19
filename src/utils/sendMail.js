const nodemailer = require('nodemailer');
const {google} = require('googleapis');


const email = process.env.EMAIL
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const redirectUri = process.env.REDIRECT_URI
const refreshToken = process.env.REFRESH_TOKEN

const OAuth2Client = new google.auth.OAuth2(clientId, clientSecret,redirectUri);
OAuth2Client.setCredentials({refreshToken:refreshToken});

const sendMail = async (userEmail) => {
    try {
    
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: email,
                pass: process.env.EMAIL_PASSWORD,
                clientId: clientId,
                clientSecret: clientSecret,
                refreshToken: refreshToken,
            }
        })

        const mailOptions = {
            from: 'Aptest',
            to: userEmail,
            subject: 'Welcome Message',
            text:'This is a welcome message to you,our newly gained user. We hope you have a lovely time here with us',
            html: '<h1>Welcome Aboard</h1> <p>We hope you have a lovely time here with us</p>'
        }

        const result = await transport.sendMail(mailOptions)
        return result;
    
    } catch (e) {
        // console.log(e)
        throw new Error(e);
    }
}


module.exports = sendMail;