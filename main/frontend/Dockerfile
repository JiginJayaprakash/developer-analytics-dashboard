# FROM node:20.9.0

# WORKDIR /frontend

# COPY . .

# RUN npm install

# CMD ["npm", "run", "start"]


FROM node:15.13-alpine
WORKDIR /frontend
COPY . .
RUN npm install

CMD ["npm", "run", "build"]