
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/contact', (req, res) => {
    const name = req.body.name;
    const family = req.body.family;
    const email = req.body.email;
    const phone = req.body.phone;
    const message = req.body.message;

    const contactData = `Name: ${name}, Family: ${family}, Email: ${email}, Phone: ${phone}, Message: ${message}\n`;
    fs.appendFile('contacts.txt', contactData, (err) => {
        if (err) {
            console.error('Error saving contact data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.status(200).send('Contact information received');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const nodemailer = require('nodemailer');

// تنظیمات ایمیل
const transporter = nodemailer.createTransport({
    service: 'Gmail', // یا هر سرویس دیگری که می‌خواهید استفاده کنید
    auth: {
        user: 'sahrakarreza869@gmail.com', // ایمیل خود را وارد کنید
        pass: '1r2e3z4a5@', // رمز عبور ایمیل خود را وارد کنید
    },
});

// ارسال ایمیل
app.post('/contact', async (req, res) => {
    // ...
    // کد قبلی

    // ارسال ایمیل
    try {
        await transporter.sendMail({
            from: 'sahrakarreza869@gmail.com', // ایمیل خود را وارد کنید
            to: email, // ایمیل مخاطب را وارد کنید
            subject: 'پاسخ به پیام شما',
            text: `سلام ${name} ${family}،\n\nپیام شما دریافت شد. با تشکر!`,
        });
        res.status(200).send('Contact information received and email sent');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Internal Server Error');
    }
});

