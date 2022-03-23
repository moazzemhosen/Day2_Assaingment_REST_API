const nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user:"283c8d24e841a3",  // generated ethereal user
      pass: "8e076c76decbf5", // generated ethereal password
    },
  });

  module.exports=transporter;