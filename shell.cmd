ECHO OFF
CLS

SET ROOTFOLDER=%1

IF [%ROOTFOLDER%]==[] (
	SET ROOTFOLDER=%~dp0
)

IF NOT EXIST %ROOTFOLDER% (
	ECHO Build root folder not found. '%ROOTFOLDER%'
	GOTO :EOF
)

ECHO Starting....
powershell -noexit %~dp0build\shell.ps1 %ROOTFOLDER%

