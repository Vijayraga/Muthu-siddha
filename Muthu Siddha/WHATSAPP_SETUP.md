# WhatsApp Integration Setup Guide

## Current Setup (Frontend Only)
The form currently saves appointments locally and shows a success message. The message content is ready to be sent.

## To Enable Automatic WhatsApp Sending

### Option 1: Using Twilio (Recommended)

1. **Sign up for Twilio:**
   - Go to https://www.twilio.com/try-twilio
   - Create a free account
   - Get your Account SID and Auth Token from the dashboard

2. **Enable WhatsApp:**
   - In Twilio Console, go to Messaging > Try it out > Send an SMS
   - In the left menu, find "WhatsApp" and follow the setup
   - Get your Twilio WhatsApp number

3. **Install backend dependencies:**
   ```bash
   npm install twilio express cors dotenv
   ```

4. **Create .env file in project root:**
   ```
   TWILIO_ACCOUNT_SID=your_account_sid_here
   TWILIO_AUTH_TOKEN=your_auth_token_here
   TWILIO_WHATSAPP_NUMBER=whatsapp:+1234567890
   PORT=5000
   ```

5. **Run the backend server:**
   ```bash
   node server.js
   ```

6. **Update Vite config to proxy API requests:**
   - Edit `vite.config.js` and add:
   ```javascript
   server: {
     proxy: {
       '/api': 'http://localhost:5000'
     }
   }
   ```

### Option 2: Using Webhook Services

Use services like:
- **Zapier** - Connect form submission to WhatsApp
- **Make.com** - Automate WhatsApp messages
- **Form Submission Services** - Forward to WhatsApp API

### Option 3: WhatsApp Business API

- Use WhatsApp Business API directly (for business accounts)
- Requires monthly fees but professional solution

## Current Features Without Backend
✓ Form saves locally in browser
✓ Message formatted and ready to send
✓ Success notification shown
✓ Can be sent manually via WhatsApp link if needed

## Testing Locally
1. Fill the appointment form
2. Data saves locally (check DevTools > Application > Local Storage)
3. Message appears in browser console (for debugging)
