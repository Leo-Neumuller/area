FROM node:18-alpine

WORKDIR /usr/src/app

COPY . .

RUN ./install.sh

RUN npm run build

CMD ["npx", "vite", "preview", "--host"]