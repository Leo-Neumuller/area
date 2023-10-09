FROM node:20-buster

ARG EXPO_TOKEN
ENV EXPO_TOKEN $EXPO_TOKEN
ARG EXPO_PUBLIC_API_URL
ENV EXPO_PUBLIC_API_URL $EXPO_PUBLIC_API_URL

WORKDIR /app

COPY . .

RUN apt install git

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive \
    apt-get -y install default-jre-headless && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

ARG ANDROID_SDK_VERSION=7302050
ENV ANDROID_SDK_ROOT /opt/android-sdk
ENV ANDROID_HOME /opt/android-sdk
RUN mkdir -p ${ANDROID_SDK_ROOT}/cmdline-tools && \
    wget -q https://dl.google.com/android/repository/commandlinetools-linux-${ANDROID_SDK_VERSION}_latest.zip && \
    unzip *tools*linux*.zip -d ${ANDROID_SDK_ROOT}/cmdline-tools && \
    mv ${ANDROID_SDK_ROOT}/cmdline-tools/cmdline-tools ${ANDROID_SDK_ROOT}/cmdline-tools/tools && \
    rm *tools*linux*.zip

RUN yes | /opt/android-sdk/cmdline-tools/tools/bin/sdkmanager --licenses

RUN apt update

RUN apt install openjdk-11-jdk -y

WORKDIR App

RUN npm install

RUN npx eas secret:create --scope project --name EXPO_PUBLIC_API_URL --value ${EXPO_PUBLIC_API_URL} --type string --force

RUN npx eas build -p android --profile preview --local --non-interactive

RUN npx eas build:view | grep Artifact | awk '{system("wget " $2)}'