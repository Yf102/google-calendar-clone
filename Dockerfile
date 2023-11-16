# Step 1: Build the application
ARG  NODE_VERSION
ARG EXPOSE_PORT
FROM node:${NODE_VERSION}-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build


# Step 2: Set up the production environment
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/*
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE $EXPOSE_PORT

# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD ["nginx", "-g", "daemon off;"]