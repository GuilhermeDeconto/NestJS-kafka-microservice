# Start with a Node.js base image that uses Node v13
FROM node:16
WORKDIR /usr/src/app

# Copy the package.json file to the container and install fresh node_modules
COPY package*.json tsconfig*.json ./
RUN yarn install

# Copy the rest of the application source code to the container
COPY src/ src/

# Transpile typescript and bundle the project
RUN yarn run build

# Remove the original src directory (our new compiled source is in the `dist` folder)
RUN rm -r src

# Assign `npm run start:prod` as the default command to run when booting the container
CMD ["yarn", "start:prod"]