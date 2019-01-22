
var rootFolder = Directory(EnvironmentVariable("RootFolder"));
var logFolder = Directory(EnvironmentVariable("BuildLogFolder"));
var tempFolder = Directory(EnvironmentVariable("TempFolder"));
var buildFolder = Directory(EnvironmentVariable("BuildFolder"));
var srcRootFolder = Directory(EnvironmentVariable("RootFolder")) + Directory("src");

var buildOutputFolder = outputFolder + Directory(configuration);

if (target.ToLower().Equals("release")) {
	configuration = "release";
	target = "build";
}
else if (target.ToLower().Equals("debug")){
	configuration = "debug";
	target = "build";
}

Verbose("Environment variable:");
var envVars = EnvironmentVariables();
foreach(var envVar in envVars)
{
	Verbose("Key: {0}\tValue: \"{1}\"", envVar.Key, envVar.Value);
}


Information("Target: {0}", target);
Information("Configuration: {0}", configuration);
Information("Source Folder: {0}", sourceFolder);

Information("Output Folder: {0}", outputFolder);
Information("Log Folder: {0}", logFolder);
Information("Temp Folder: {0}", tempFolder);
