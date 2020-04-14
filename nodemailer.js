const nodemailer = require('nodemailer')


const transport = nodemailer.createTransport(
    {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'gerda.lubowitz32@ethereal.email',
        pass: '4Vg7uvm2HkHEBKuaDb'
    }
    
    
},{
    from: 'Mailer test <gerda.lubowitz32@ethereal.email>',
})

const mailer = message =>{
    transport.sentMail(message, (err, info) => {
     if(err) return console.log(err)
     console.log('Email sent:', info)
    })
}
module.exports = mailer