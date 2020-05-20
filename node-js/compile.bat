@echo off
cls

echo EVENT:
echo Clean Folder...
rmdir /S /Q .\bin
mkdir .\bin

echo.
echo EVENT:
echo Compiling dotNetCore APP...
echo.

cd ../dot-net
call dotnet publish -r win-x86 -p:PublishSingleFile=True --self-contained true
call dotnet publish -r win-x64 -p:PublishSingleFile=True --self-contained true

echo.
echo EVENT:
echo Moving Files...
echo.

cd ../node-js
move .\bin\netcoreapp3.1\win-x64\publish\CMD-Printer.exe .\bin\CMD-Printer-x64.exe
move .\bin\netcoreapp3.1\win-x86\publish\CMD-Printer.exe .\bin\CMD-Printer-x86.exe
rmdir /S /Q .\bin\netcoreapp3.1

echo.
echo EVENT:
echo Transpile *.TS...
echo.

call tsc