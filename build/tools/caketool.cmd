@echo off
for /f "tokens=1,* delims= " %%a in ("%*") do set ALL_BUT_FIRST=%%b
%BuildFolder%\packages\%1\tools\%1.exe %ALL_BUT_FIRST%