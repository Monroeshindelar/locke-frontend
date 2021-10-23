# Base Image
FROM node

# Set working directory
WORKDIR /lock-frontend

# Add node modules to $PATH
ENV PATH /lock-frontend/node_modules/.bin:$PATH

# Install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install 
RUN npm install react-scripts@4.0.3

# Add app
COPY . ./

# Start app
CMD ["npm", "start"]