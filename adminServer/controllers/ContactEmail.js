//This whole code is for Form Details is send on email 

import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

export const ContactEmail = (req, res) => {
    const {
        firstName,
        lastName,
        email,
        contact,
        address1,
        address2,
      } = req.body;

    const mailOptions = {
        from: `"Contact Us Form" <${process.env.EMAIL}>`,
        to: process.env.EMAIL,
        subject: `New message from ${firstName}`,
        text: `Name: ${firstName}\nLastName: ${lastName} \nEmail: ${email} \nContact: ${contact} \nAddress-1: ${address1} \nAddress-2: ${address2}`,
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).send("Error: Unable to send email");
        } else {
          console.log("Email sent");
          // console.log("Email sent: " + info.response);
          res.status(200).send("Email sent");
        }
      });
};
