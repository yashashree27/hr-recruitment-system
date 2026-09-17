# ------ STAGE 1: Build the frontend image ------

# use image node:alpine 22
FROM node:22-alpine AS build

# set /app as working directory for frontend project → every command below runs inside this folder
WORKDIR /app

# copy package.json and package-lock.json to /app
COPY package*.json ./

RUN npm install

COPY . .

ARG VITE_API_URL


# run the production build → generates static HTML/CSS/JS files, into /app/build
RUN npm run build

# -------- STAGE 2: Serve the built files --------

# use image nginx:alpine 22
FROM nginx:alpine

# copy ONLY the built files from the "build" stage into Nginx's default folder for serving
COPY --from=build /app/dist /usr/share/nginx/html

# expose port 80 (Nginx default port) → tells Docker this container will listen on port 80
EXPOSE 80

# start Nginx in the foreground → keeps the container running instead of exiting immediately
CMD ["nginx", "-g", "daemon off;"]