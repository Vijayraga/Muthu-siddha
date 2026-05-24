// Simple backend endpoint for sending WhatsApp messages
// Install these packages first:
// npm install twilio dotenv express cors

import express from 'express';
import twilio from 'twilio';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const normalizeWhatsAppNumber = (value) => {
  if (!value) return '';
  const withoutPrefix = value.startsWith('whatsapp:') ? value.slice('whatsapp:'.length) : value;
  const formattedNumber = withoutPrefix.startsWith('+') ? withoutPrefix : `+${withoutPrefix}`;
  return `whatsapp:${formattedNumber}`;
};

app.post('/api/send-whatsapp', async (req, res) => {
  try {
    const { phone, message, appointment } = req.body;
    const from = normalizeWhatsAppNumber(process.env.TWILIO_WHATSAPP_NUMBER);
    const to = normalizeWhatsAppNumber(phone);

    if (!from || !to || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing phone, message, or WhatsApp sender number.'
      });
    }

    const result = await client.messages.create({
      from,
      to,
      body: message
    });

    console.log(`Message sent with SID: ${result.sid}`);

    res.json({
      success: true,
      message: 'Appointment notification sent to WhatsApp',
      sid: result.sid,
      appointment
    });
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
