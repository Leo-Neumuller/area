#!/bin/bash

echo "{
    \"build\": {
      \"preview\": {
        \"android\": {
          \"buildType\": \"apk\"
        },
        \"env\": {
          \"EXPO_PUBLIC_API_URL\": \"$EXPO_PUBLIC_API_URL\"
        }
      }
    }
}" > eas.json