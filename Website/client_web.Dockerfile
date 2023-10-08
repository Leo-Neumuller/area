FROM node:18-alpine

ARG VITE_API_URL
ENV VITE_API_URL $VITE_API_URL

WORKDIR /usr/src/app

COPY . .

RUN ./install.sh

RUN npm run build

CMD ["npx", "vite", "preview", "--host"]