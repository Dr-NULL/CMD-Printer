rm -rf ./dist

mkdir -p ./dist/cjs
echo "{
    \"type\": \"commonjs\"
}" >> ./dist/cjs/package.json

mkdir -p ./dist/esm
echo "{
    \"type\": \"module\"
}" >> ./dist/esm/package.json
