const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Create a transporter object using your SMTP server
let transporter = nodemailer.createTransport({
    host: 'smtp.yourdomain.com', // Replace with your SMTP server
    port: 587,                   // Use 465 for secure connection
    secure: false,              // Use true for port 465
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Route to handle form submission
app.post('/submit-email', async (req, res) => {
    const { email } = req.body;

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'recipient@example.com',
        subject: 'New Subscriber',
        text: `New subscriber email: ${email}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send('Thank you for subscribing!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending email.');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


