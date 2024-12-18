FROM python:3.10-alpine

WORKDIR /usr/src/api

RUN apk add py3-virtualenv

COPY requirements.txt .

COPY install.sh .

RUN sed -i -e 's/\r$//' install.sh

RUN ./install.sh

COPY . .

CMD rm /usr/src/api/*.apk; cp /apk/*.apk /usr/src/api/; venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000