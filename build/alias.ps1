function global:gotoRoot { set-location $env:RootFolder }
function global:runClean { 
    & build clean
}

Set-Alias nuget -Scope 'Global'  $env:BuildFolder\packages\nuget.exe
Set-Alias vswhere -Scope 'Global' $env:BuildFolder\packages\vswhere\tools\vswhere.exe
Set-Alias root -Scope 'Global' gotoRoot
Set-Alias clean -Scope 'Global' runClean

