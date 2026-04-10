const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const app = express();

// require('dotenv').config({ path: path.resolve(__dirname, '..//.env') });

app.use(cors());
app.use(express.json());

app.post('/enviar', async (req, res) => {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', //'smtp-mail.outlook.com',
        port: 465, //587,
        secure: true, // false,
        auth: {
            user: '',
            pass: ''//process.env.EMAIL_PASS
        }
    });

    try {
        await transporter.sendMail({
            from: email,
            to: '',
            replyTo: email,
            subject: subject,
            text: `Nome: ${name} \nMenssagem: ${message}`
        })
        res.status(200).send('E-mail enviado com sucesso!')
    } catch (error) {
        return res.status(500).send(error.toString());
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});