import nodemailer from 'nodemailer';


const sendMail= async({email,html}:{email: string , html: string })=>{
    // người giửi
    let transporter= nodemailer.createTransport({
        host: "smtp.ethereal.email",
        service: 'gmail',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_NAME, // generated ethereal user
          pass:process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      // nội dung cần giửi

      let info = await transporter.sendMail({
        from: '"Cuahangdientu" <foo@example.com>', // sender address
        to: email,// list of receivers
        subject: "forgot password", // Subject line
        text: "Hello world?", // plain text body
        html:html, // html body
      });
      transporter.sendMail(info, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
      });
    return  info
}


export default sendMail

