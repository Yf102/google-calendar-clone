# Google Calendar Clone

React + TypeScript + Vite + Docker + Nginx

## First time
```bash
npm i
```

## Run a development server
```bash
npm run dev
```

## Run a production build

```bash
npm build
npm run preview
```

## Docker
Only First time run
```bash
docker network create --subnet=10.5.0.0/16 docker_network
```

Build Docker image
```bash
docker-compose up --build -d
```

From the second time onwards run Docker image
```bash
docker-compose up -d
```
