# @SudoR2spr don't touch official Node.js image.
FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Set environment variables (you can also configure these on Back4App)
ENV PORT=3000

# Expose the port the app runs on
EXPOSE 3000

# Start the bot
CMD ["node", "index.js"]
