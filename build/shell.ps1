param (
	[string]$rootFolder
)
	
Write-Host "Initializing build environment"

$env:RootFolder = $rootFolder
$env:OutputFolder = $rootFolder + "\bin"
$env:BuildLogFolder = $rootFolder + "\logs"
$env:BuildFolder = $rootFolder + "\build"
$env:BuildToolsFolder = $rootFolder + "\build\\tools"
$env:SourceFolder = $rootFolder + "\src"
$env:TempFolder = $rootFolder + "\tmp"
$env:ToolsFolder = $rootFolder + "\tmp"
$env:MSBuildToolsPath = $rootFolder + "\build\\msbuild"
$env:CAKE_PATHS_TOOLS = "./packages"

$env:Path += ";"
$env:Path += $rootFolder + "\build;"
$env:Path += $rootFolder + "\build\tools;"


if (!(Test-Path $env:BuildLogFolder))
{
	New-Item -ItemType Directory -Force -Path $env:BuildLogFolder
}

if (!(Test-Path $env:TempFolder))
{
	New-Item -ItemType Directory -Force -Path $env:TempFolder
}

$aliasScript = $env:BuildFolder + "\alias.ps1"
Write-Host "Loading aliases. " $aliasScript
invoke-expression -Command $aliasScript

$bootstrapScript = $env:BuildFolder + "\Bootstrap.ps1"
Write-Host "Executing cake boostrap. " $bootstrapScript
invoke-expression -Command $bootstrapScript

$vsPath = vswhere -latest -products * -requires Microsoft.VisualStudio.PackageGroup.TestTools.Core -property installationPath
$vsEnvCmd = join-path $vsPath '\VC\Auxiliary\Build\vcvars64.bat'

Write-Host "Preparing visual studio tools"
if (test-path $vsEnvCmd) {
	$env:Path += $vsPath + "\MSBuild\15.0\Bin\amd64;;"
	& $vsEnvCmd
}
else{
	Write-Host "Unable to load visual studio tools."
}




Write-Host "Ready"

 
 