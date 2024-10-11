// Do not delete credits @SudoR2spr By WOODcraft

require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const axios = require('axios');
const express = require('express');
const FormData = require('form-data');
const app = express();

const bot = new Telegraf(process.env.TOKEN);

app.use(express.json()); // By WOODcraft

// Do not delete credits @SudoR2spr
async function uploadToImgbb(fileLink, filename = 'Angel.jpg') {
  try {
    console.log('Uploading to Imgbb:', fileLink);
    const response = await axios.get(fileLink, { responseType: 'arraybuffer' });
    const formData = new FormData();
    formData.append('image', response.data, { filename }); // Do not delete credits @SudoR2spr
    formData.append('key', process.env.IMGBB_API_KEY);

    const uploadResponse = await axios.post('https://api.imgbb.com/1/upload', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    console.log('Imgbb upload successful:', uploadResponse.data.data.url);
    return uploadResponse.data.data.url;
  } catch (error) {
    console.error('Error uploading to imgbb:', error.message);
    return null;
  }
}

// Start command with welcome message, photo, and button WOODcraft
bot.start(async (ctx) => {
  const welcomeMessage = '🎉 Welcome to the Telegram Imgbb Bot! You can upload images and get links.';
  const photoUrl = 'https://graph.org/file/4e8a1172e8ba4b7a0bdfa.jpg'; // change your photo URL

  try {
    // Send photo first
    await ctx.replyWithPhoto(photoUrl, {
      caption: welcomeMessage,
      reply_markup: {
        inline_keyboard: [
          [{ text: '✨ Join our Channel ✨', url: 'https://t.me/Opleech_WD' }]
        ]
      }
    });
    console.log('Welcome message sent successfully');
  } catch (error) {
    console.error('Error sending welcome message:', error.message); // WOODcraft
  }
});

// Telegram bot Do not delete credits @SudoR2spr
bot.on('photo', async (ctx) => {
  try {
    const fileID = ctx.message.photo[ctx.message.photo.length - 1].file_id;
    console.log('Photo file ID:', fileID); // WOODcraft 

    const fileLink = await ctx.telegram.getFileLink(fileID);
    console.log('File link generated:', fileLink); // WOODcraft

    const imgbbUrl = await uploadToImgbb(fileLink);
    const photoUrl = 'https://i.ibb.co/KrBGcSS/Picsart-24-10-11-20-04-52-069.jpg'; // Photo link to be replied with the message

    if (imgbbUrl) {
      // Do not delete credits @SudoR2spr
      await ctx.replyWithPhoto(photoUrl, {
        caption: `⎙ Here is your image link:\n\〇 Copy your link\n\n\`${imgbbUrl}\``,
        parse_mode: 'MarkdownV2', // WOODcraft
        reply_markup: {
          inline_keyboard: [
            [{ text: '💾 View Image', url: imgbbUrl }] // WOODcraft 
          ]
        }
      });
      console.log('Photo and button sent successfully');
    } else {
      await ctx.reply('Failed to upload image to Imgbb.');
      console.error('Imgbb upload failed');
    }
  } catch (error) {
    console.error('Error handling photo message:', error.message); // Do not delete credits @SudoR2spr
  }
});

// Do not delete credits @SudoR2spr
app.post('/send-image', async (req, res) => {
  const { fileLink } = req.body;

  const imgbbUrl = await uploadToImgbb(fileLink);
  if (imgbbUrl) {
    res.json({ success: true, url: imgbbUrl });
  } else {
    res.json({ success: false, message: 'Failed to upload image to Imgbb.' });
  }
});

// Do not delete credits @SudoR2spr
app.get('/', (req, res) => {
  res.send('Welcome to the Telegram Imgbb Bot API!');
});

// Do not delete credits @SudoR2spr
bot.launch().then(() => console.log('Bot launched successfully')).catch(err => console.error('Bot launch error:', err.message));

// Do not delete credits @SudoR2spr
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Do not delete credits @SudoR2spr
