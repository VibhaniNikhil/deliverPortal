@echo off
SET PROJFOLDER=%1
SET START_VS=%2
SET SOLUTION_NAME=%3
SET RELATIVE_PATHS=%4
SET INCLUDE_REFERENCEING=%5
SET VS_ARGS=-open
SET VS_RELATIVE=

for /f "usebackq tokens=*" %%i in (`%BuildFolder%\packages\vswhere\tools\vswhere.exe -latest -products * -requires Microsoft.Component.MSBuild -property installationPath`) do (
  set VS_PATH=%%i\Common7\IDE\devenv.exe
)

IF "%PROJFOLDER%"=="" (
	SET PROJFOLDER=%cd%
)

if "%START_VS%"=="false" (
	SET VS_ARGS=
)

if "%RELATIVE_PATHS%"=="true" (
	SET VS_RELATIVE="--rel"
)


if "%SOLUTION_NAME%"=="" (
	SET SOLUTION_ARGS=
) else (
	SET SOLUTION_ARGS=-n %SOLUTION_NAME%
)


%BuildFolder%\tools\slimjim\tools\slimjim.exe --root %SourceFolder% --t %PROJFOLDER% %SOLUTION_ARGS% %VS_ARGS% --tp "%VS_PATH%" %VS_RELATIVE%