#!/bin/sh

FASTAPI_URL="http://127.0.0.1:8000/openapi.json"
DOC_DIR="doc"

if [ ! -d "venv" ]; then
    ./install.sh
fi



if [ "$1" = "tests" ]; then
  (. venv/bin/activate && coverage run --branch -m unittest discover -s tests -f && coverage report)
elif [ "$1" = "doc" ]; then
  if ! [ -x $(which widdershins) ]; then
      echo "widdershins is not installed. Installing..."
      npm install -g widdershins
  fi
  export DOC=true
  timeout 3 ./run.sh

  TEMP_JSON="$DOC_DIR/openapi.json"
  OUTPUT_README="$DOC_DIR/DOC.md"
  widdershins -y "$TEMP_JSON" -o "$OUTPUT_README" --language_tabs 'shell:Shell' 'javascript:JavaScript' --resolve -s --yaml false --summary true --omitHeader true --search true --expandBody true --headings 2

  echo "Documentation generated and placed in $OUTPUT_README"
else
  venv/bin/uvicorn main:app --reload
fi

