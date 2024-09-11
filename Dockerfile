FROM node:20-alpine

# Install necessary dependencies
RUN apk add --no-cache libc6-compat
RUN apk add supervisor

# Copy supervisor config file
COPY supervisord.conf /etc/supervisord.conf

# File setup Front End of Chat Application
WORKDIR /home/front
COPY . /home/front
RUN mv page.css page.tsx postcss.config.mjs layout.tsx .DS_Store favicon.ico globals.css /home/front/app/
RUN sed -i 's/Placeholder/placeholder/g' /home/front/app/Components/UserPage.tsx
RUN sed -i 's$next/Link$next/link$g' /home/front/app/page.tsx

# Command setup for Front End of Chat Application
RUN npm ci
RUN npm install react-icons
RUN npm run build
EXPOSE 3000

# Kick off supervisor to startup Front and Back End
WORKDIR /home
CMD ["/usr/bin/supervisord","-c","/etc/supervisord.conf"]
