#!/bin/bash

echo "Building app..."
rm -rf dist
mkdir dist
cd dist
touch index.html
echo "<h1>Hello World</h1>" >> index.html
echo "BUILD SUCCESS"
