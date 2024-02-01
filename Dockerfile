# Use the official Node.js 14 image as a parent image
FROM node:18.14.0-alpine3.14

LABEL "com.github.actions.name"="Log Commit Message"
LABEL "com.github.actions.description"="Logs the message of the current commit"
LABEL "com.github.actions.icon"="terminal"
LABEL "com.github.actions.color"="blue"
CMD ["npm", "run", "start"]

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install any dependencies
RUN npm install

# Copy the rest of your action's code
COPY . .

# Run the Node.js script
ENTRYPOINT ["node", "/usr/src/app/index.js"]
