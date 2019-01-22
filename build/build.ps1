##########################################################################
# This is the Cake bootstrapper script for PowerShell.
# This file was downloaded from https://github.com/cake-build/resources
# Feel free to change this file to fit your needs.
##########################################################################

<#

.SYNOPSIS
This is a Powershell script to bootstrap a Cake build.

.DESCRIPTION
This Powershell script will download NuGet if missing, restore NuGet tools (including Cake)
and execute your Cake build script with the parameters you provide.

.PARAMETER Script
The build script to execute.
.PARAMETER Target
The build script target to run.
.PARAMETER Configuration
The build configuration to use.
.PARAMETER Verbosity
Specifies the amount of information to be displayed.
.PARAMETER Experimental
Tells Cake to use the latest Roslyn release.
.PARAMETER WhatIf
Performs a dry run of the build script.
No tasks will be executed.
.PARAMETER Mono
Tells Cake to use the Mono scripting engine.
.PARAMETER SkipToolPackageRestore
Skips restoring of packages.
.PARAMETER ScriptArgs
Remaining arguments are added here.

.LINK
https://cakebuild.net

#>

[CmdletBinding()]
Param(
	[Parameter(Position=0,Mandatory=$false)]
    [string]$Target = "build",
	[ValidateSet("Release", "Debug")]
	[Parameter(Position=1, Mandatory=$false)]
    [string]$Configuration = "Debug",
    [ValidateSet("Quiet", "Minimal", "Normal", "Verbose", "Diagnostic")]
    [string]$Verbosity = "Diagnostic",
    [switch]$Experimental,
    [switch]$Mono,
    [Parameter(Mandatory=$false,ValueFromRemainingArguments=$true)]
    [string[]]$ScriptArgs
)

Write-Host "Preparing to run build script..."

$BUILD_DIR = $env:BuildFolder
$BUILD_PACKAGES_DIR = Join-Path $BUILD_DIR "packages"
$TOOLS_DIR = Join-Path $BUILD_DIR "tools"
$CAKE_EXE = Join-Path $BUILD_PACKAGES_DIR "Cake/Cake.exe"
$CAKE_SCRIPT = Join-Path $BUILD_DIR "build.cake"

# Should we use mono?
$UseMono = "";
if($Mono.IsPresent) {
    Write-Verbose -Message "Using the Mono based scripting engine."
    $UseMono = "-mono"
}

# Should we use the new Roslyn?
$UseExperimental = "";
if($Experimental.IsPresent -and !($Mono.IsPresent)) {
    Write-Verbose -Message "Using experimental version of Roslyn."
    $UseExperimental = "-experimental"
}

# Make sure that Cake has been installed.
if (!(Test-Path $CAKE_EXE)) {
    Throw "Could not find Cake.exe at $CAKE_EXE"
}

# Start Cake
Write-Host "Running build script..."
Invoke-Expression "& `"$CAKE_EXE`" `"$CAKE_SCRIPT`" -target=`"$Target`" -configuration=`"$Configuration`" -path=`"$pwd`" -verbosity=`"$Verbosity`" $UseMono $UseExperimental $ScriptArgs"
exit $LASTEXITCODE