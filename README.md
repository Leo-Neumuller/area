# AREA

## Description

This is a simple project to demonstrate the use of the Oauth2 and api that replicates zapier's app or ifttt's applet.

## Git description

This project is divided in 3 parts:
- API
- Website
- Mobile

That images show how branches are organized:

[![](https://mermaid.ink/img/pako:eNqVkbsOwjAMRX-l8twvyIzExMSGsriJaaKSh1IXhKr-O-Gpqg8QmSzf41zLtwcVNIGA2vI2YTTSF_mp4JzleV0l9MoUms4vzZBqQsejzpzGaFe1C1WtZfoyGxc2mrk6SjUtG33gVau1734P_LldnAAOrR8TkyNCCbmfIZ3z6e-KBDbkSILIpcbUSJB-yBx2HPZXr0Bw6qiELmpk2lisEzoQRzy1uUvacki7Z-CP3EuI6A8hvJnhBgcrrc8?type=png)](https://mermaid.live/edit#pako:eNqVkbsOwjAMRX-l8twvyIzExMSGsriJaaKSh1IXhKr-O-Gpqg8QmSzf41zLtwcVNIGA2vI2YTTSF_mp4JzleV0l9MoUms4vzZBqQsejzpzGaFe1C1WtZfoyGxc2mrk6SjUtG33gVau1734P_LldnAAOrR8TkyNCCbmfIZ3z6e-KBDbkSILIpcbUSJB-yBx2HPZXr0Bw6qiELmpk2lisEzoQRzy1uUvacki7Z-CP3EuI6A8hvJnhBgcrrc8)

The annotation of commit are:
- [*] : Modification of files or features
- [+] : Add of files or features
- [-] : Delete of files or features

## Environment

Create a .env file at the root of the project. It should look similar to this:

```sh
APP_NAME=AREA-API
APP_VERSION=1.0.0

SQL_URL=sqlite:///./area.db
SQL_TEST_URL=sqlite:///./area_test.db
JWT_SECRET=YOUR JWT SECRET
JWT_ALGORITHM=HS256
JWT_EXPIRE_DAYS=1
JWT_EXPIRE_SECONDS=3600

REDIRECT_URI=http://localhost:8000
```

## Docker run

```bash
./docker_compose.sh
```

## Documentation of parts

- [API](Api/README.md)
- [Website](Website/README.md)
- [Mobile](App/README.md)

