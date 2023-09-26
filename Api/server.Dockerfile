FROM python:3.10-alpine

WORKDIR /usr/src/api

COPY . .

RUN apk add py3-virtualenv

RUN ./install.sh

CMD ["venv/bin/uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]