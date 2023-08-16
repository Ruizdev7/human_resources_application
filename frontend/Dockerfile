FROM node:alpine
WORKDIR /
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
#RUN npm run build
EXPOSE 3000
CMD ["npx","serve","dist"]