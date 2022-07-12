#!/bin/sh
fn_prepare() {
    CJS='{ "type": "commonjs" }'
    ESM='{ "type": "module" }'

    # Delete ./dist folder
    rm -rf ./dist

    # Create CJS folder
    mkdir -p ./dist/cjs/
    echo $CJS >> ./dist/cjs/package.json

    # Create ESM folder
    mkdir -p ./dist/esm/
    echo $ESM >> ./dist/esm/package.json
}

fn_cleanup() {
    find . -name "*.tsbuildinfo" -type f -delete
}

## -------------------------------------------------
## BEGIN PROGRAM
clear
echo \#============------------············
echo \# \>\> PACKAGE-CLI
echo \#============------------············
echo

case $1 in
    begin)
        echo \> Initializing project...
        echo '{\n  "type": "module",\n  "version": "0.1.1"\n}' > ./package.json
        npm i --save-dev typescript ts-node ava @types/node
        ;;

    clean)
        echo \> Clean project folder...
        fn_cleanup
        rm -rf ./dist
        ;;

    build)
        echo \> Build project...
        fn_prepare
        npx tsc --build ./tsconfig.build.json
        fn_cleanup
        ;;

    watch)
        echo \> "Build & watch project..."
        fn_prepare
        npx tsc --build ./tsconfig.build.json --watch
        fn_cleanup
        ;;

    *)
        echo Commands:
        echo --------------------------------------------------------------------
        echo \> begin: Create the package.json file and install dev-dependencies.
        echo \> clean: Remove the ./dist folder and the *.tsbuildinfo files.
        echo \> build: Build your project.
        echo \> watch: Build and watch your project.
        ;;
esac
        
