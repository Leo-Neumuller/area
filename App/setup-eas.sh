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

echo '#!/bin/bash

# This is a file called "pre-install" in the root of the project

set-env EXPO_PUBLIC_API_URL '$EXPO_PUBLIC_API_URL'

if [[ "$EAS_BUILD_PLATFORM" == "android" ]]; then
  echo "Run commands for Android builds here"
  sudo apt-get --quiet update --yes

  sudo apt-get --quiet install --yes libncurses5

elif [[ "$EAS_BUILD_PLATFORM" == "ios" ]]; then
  echo "Run commands for iOS builds here"
fi' > pre-install