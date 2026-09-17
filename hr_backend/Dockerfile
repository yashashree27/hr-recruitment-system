# use image node:alpine 22
FROM node:22-alpine

# set /app as working directory for backend project → every command below runs inside this folder
WORKDIR /app

# copy package.json and package-lock.json to /app
COPY package*.json ./

RUN npm install

COPY . .

# expose port 8000 → tells Docker this container will listen on port 8000 (backend running on port 8000 )
EXPOSE 8000

# run "node server.js" when the container starts → this is what actually launches your backend app
CMD ["node", "server.js"]