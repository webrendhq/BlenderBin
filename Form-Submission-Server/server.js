const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle form submission
app.post('/submit-email', async (req, res) => {
    const { email } = req.body;

    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'Gmail', // or another email service
        auth: {
            user: process.env.EMAIL_USER, // your email address
            pass: process.env.EMAIL_PASS  // your email password
        }
    });

    // Email options
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'recipient@example.com', // recipient's email address
        subject: 'New Subscriber',
        text: `New subscriber email: ${email}`
    };

    try {
        // Send the email
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

