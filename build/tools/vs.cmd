@echo off

for /f "usebackq tokens=*" %%i in (`%BuildFolder%\packages\vswhere\tools\vswhere.exe -latest -products * -requires Microsoft.Component.MSBuild -property installationPath`) do (
  set VS_PATH=%%i\Common7\IDE\devenv.exe
)

START "Foo"  "%VS_PATH%"