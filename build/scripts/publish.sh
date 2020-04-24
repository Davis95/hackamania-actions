#!/bin/bash

echo "Building app..."
rm -rf dist
mkdir dist
cd dist
touch index.html
echo "<h1>Hello World On $POD</h1>" >> index.html
cat index.html
echo "BUILD SUCCESS"
