
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  // Destructure the form data from the request body
  const { name, email, message } = await req.json();

  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Replace with your email service
    auth: {
      user: 'dinakanwamu@gmail.com', // Replace with your email
      pass: 'jmslpmjegniwuuvc', // Replace with your email password
    },
  });

  // Set up email data
  const mailOptions = {
    from: `"${name}" <${email}>`, // Sender address
    to: 'dinakanwamu@gmail.com', // List of receivers
    subject: 'New Message from Contact Form', // Subject line
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // Plain text body
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: 'Email sent successfully!' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Failed to send email.' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

