FROM node:18-alpine

WORKDIR /app

COPY ./ ./ 

RUN npm install --only=production


# Expose the application port (change if needed)
EXPOSE 3001

CMD ["npm", "run", "start:prod"]
