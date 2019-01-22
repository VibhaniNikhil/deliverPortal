var target = Argument("target", "build");
var configuration = Argument("config", "debug");
var outputFolder = Argument("output", "") == "" ? Directory(EnvironmentVariable("OutputFolder")) : Directory(Argument("output", "."));
var sourceFolder = Directory(Argument("path", "."));

#load "build.environment.cake"

string buildId = null;
string buildTempFolder = null;
string tempSolutionFile = null;				
FilePath msBuildPathX64 = null;

Task("clean")
    .Does(() => {
	CleanDirectory(logFolder);
	CleanDirectory(tempFolder);
    CleanDirectory(outputFolder);
});

Task("nuke")
    .Does(() => {
	CleanDirectory(logFolder);
	CleanDirectory(tempFolder);
    CleanDirectory(outputFolder);
});

Task("preclean")    
	.Does(() => {
	CleanDirectory(logFolder);
});


Task("prebuild")
.IsDependentOn("preclean")
    .Does(() => {
	var vsRunPath = buildFolder.ToString() + "/vsrun.cmd";
	buildId = Guid.NewGuid().ToString("N");
	buildTempFolder = tempFolder.ToString() + "\\" + buildId;
	tempSolutionFile = string.Format("{0}/{1}", rootFolder.ToString(), "_src.sln");
	
	Information("Preparing build {0}", buildId);
	DirectoryPath vsLatest  = VSWhereLatest();
	msBuildPathX64 = vsLatest == null ? null : vsLatest.CombineWithFilePath("./MSBuild/15.0/Bin/amd64/MSBuild.exe");
	if (msBuildPathX64 == null){
		Error("Visual Studio 2017 is required by not found.");
	}
	
	
	Information("Generating project manifest.");
	var vsRunArgs = string.Format(
		"\"{0}\" false \"{1}\" true",
		sourceFolder.ToString().Replace("/", "\\"),
		tempSolutionFile);

	Verbose("VSRUN {0}", vsRunPath);	
	Verbose("VSRUN ARGS {0}", vsRunArgs);	
	Verbose("Solution File {0}", tempSolutionFile);
			
	var vsRunResult = StartProcess(File(vsRunPath), vsRunArgs);
	if (vsRunResult != 0)
	{
		Error("Error generating solution file.");
		Information("Exit code: {0}", vsRunResult);
	}
	
	Information("Solution: {0}", System.IO.File.ReadAllText(tempSolutionFile));	
});

Task("restorePackages")
	.IsDependentOn("prebuild")
    .Does(() => {
	var settings = new NuGetRestoreSettings();
	settings.PackagesDirectory = outputFolder.ToString() + "/packages";
	
    NuGetRestore(tempSolutionFile, settings);
});

Task("build")
    .IsDependentOn("restorePackages")
    .Does(() => {

	foreach (var project in ParseSolution(tempSolutionFile).Projects) {
		if (project.Type == SolutionFolder.TypeIdentifier){
			continue;
		}

		var projectRelative = ((DirectoryPath)srcRootFolder).GetRelativePath((DirectoryPath)project.Path.GetDirectory());
		var projectOutput = buildOutputFolder + projectRelative;
		var msbuildSettings = new DotNetCoreMSBuildSettings{
			Verbosity = DotNetCoreVerbosity.Normal
		};

		msbuildSettings.WithProperty("DefineConstants", "CAKE_BUILD");
		msbuildSettings.AddFileLogger(new MSBuildFileLoggerSettings {
			LogFile = logFolder.ToString() + "/msbuild.log",
			SummaryOutputLevel = MSBuildLoggerOutputLevel.Default,
			AppendToLogFile = true });
		msbuildSettings.AddFileLogger(new MSBuildFileLoggerSettings {
			LogFile = logFolder.ToString() + "/msbuild.wrn",
			SummaryOutputLevel = MSBuildLoggerOutputLevel.WarningsOnly,
			AppendToLogFile = true });				
		msbuildSettings.AddFileLogger(new MSBuildFileLoggerSettings {
			LogFile = logFolder.ToString() + "/msbuild.err",
			SummaryOutputLevel = MSBuildLoggerOutputLevel.ErrorsOnly,
			AppendToLogFile = true });

		msbuildSettings.WithProperty("BuildOutputPath", projectOutput.ToString());
		msbuildSettings.WithProperty("OutDir", projectOutput.ToString());
		
		DotNetCoreBuild(project.Path.ToString(), new DotNetCoreBuildSettings {
			Configuration = configuration,
			OutputDirectory = projectOutput.ToString(),
			MSBuildSettings = msbuildSettings,
			ArgumentCustomization = args => args.Append("/p:Version=" + "1.0.0")
		});
	}
});

Task("publish")
    .IsDependentOn("build")
    .Does(() => {

	foreach (var project in ParseSolution(tempSolutionFile).Projects) {
		if (project.Type == SolutionFolder.TypeIdentifier){
			continue;
		}

		var projectRelative = ((DirectoryPath)srcRootFolder).GetRelativePath((DirectoryPath)project.Path.GetDirectory());
		var projectOutput = buildOutputFolder + projectRelative;

		var msbuildSettings = new DotNetCoreMSBuildSettings{
			Verbosity = DotNetCoreVerbosity.Normal
		};

		msbuildSettings.WithProperty("DefineConstants", "CAKE_BUILD");
		msbuildSettings.AddFileLogger(new MSBuildFileLoggerSettings {
			LogFile = logFolder.ToString() + "/msbuild.log",
			SummaryOutputLevel = MSBuildLoggerOutputLevel.Default,
			AppendToLogFile = true });
		msbuildSettings.AddFileLogger(new MSBuildFileLoggerSettings {
			LogFile = logFolder.ToString() + "/msbuild.wrn",
			SummaryOutputLevel = MSBuildLoggerOutputLevel.WarningsOnly,
			AppendToLogFile = true });				
		msbuildSettings.AddFileLogger(new MSBuildFileLoggerSettings {
			LogFile = logFolder.ToString() + "/msbuild.err",
			SummaryOutputLevel = MSBuildLoggerOutputLevel.ErrorsOnly,
			AppendToLogFile = true });

			msbuildSettings.WithProperty("BuildOutputPath", projectOutput.ToString());
			msbuildSettings.WithProperty("OutDir", projectOutput.ToString());

		var settings = new DotNetCorePublishSettings{
			Configuration = configuration,
			OutputDirectory = projectOutput.ToString(),
			MSBuildSettings = msbuildSettings,
			ArgumentCustomization = args => args.Append("/p:Version=" + "1.0.0")
		};

		DotNetCorePublish(project.Path.ToString(), settings);	
	}
});

Task("pack")
    .IsDependentOn("build")
    .Does(() => {

	foreach (var project in ParseSolution(tempSolutionFile).Projects) {
		if (project.Type == SolutionFolder.TypeIdentifier){
			continue;
		}

		var projectRelative = ((DirectoryPath)srcRootFolder).GetRelativePath((DirectoryPath)project.Path.GetDirectory());
		var projectOutput = buildOutputFolder + projectRelative;

		var msbuildSettings = new DotNetCoreMSBuildSettings{
			Verbosity = DotNetCoreVerbosity.Normal
		};

		msbuildSettings.WithProperty("DefineConstants", "CAKE_BUILD");
		msbuildSettings.AddFileLogger(new MSBuildFileLoggerSettings {
			LogFile = logFolder.ToString() + "/msbuild.log",
			SummaryOutputLevel = MSBuildLoggerOutputLevel.Default,
			AppendToLogFile = true });
		msbuildSettings.AddFileLogger(new MSBuildFileLoggerSettings {
			LogFile = logFolder.ToString() + "/msbuild.wrn",
			SummaryOutputLevel = MSBuildLoggerOutputLevel.WarningsOnly,
			AppendToLogFile = true });				
		msbuildSettings.AddFileLogger(new MSBuildFileLoggerSettings {
			LogFile = logFolder.ToString() + "/msbuild.err",
			SummaryOutputLevel = MSBuildLoggerOutputLevel.ErrorsOnly,
			AppendToLogFile = true });

			msbuildSettings.WithProperty("BuildOutputPath", projectOutput.ToString());
			msbuildSettings.WithProperty("OutDir", projectOutput.ToString());

		var settings = new DotNetCorePackSettings{
			Configuration = configuration,
			OutputDirectory = projectOutput.ToString(),
			MSBuildSettings = msbuildSettings,
			ArgumentCustomization = args => args.Append("/p:Version=" + "1.0.0"),

		};

		DotNetCorePack(project.Path.ToString(), settings);	
	}
});

Task("runtests")
    .IsDependentOn("Build")
    .Does(() => { });

Task("release")
    .IsDependentOn("build");
	
Task("debug")
    .IsDependentOn("build");

Task("publishtest")
    .IsDependentOn("publish")
    .Does(() =>
{
	Information("Generating test manifest.");
	var manifestToolPath = buildOutputFolder + File("Framework/TestManifestTool/TestManifestTool.exe");
	var testManifestOutputFolder = outputFolder + Directory("test");
	var testManifestOutputFile = testManifestOutputFolder + File("TestManifest.json");
	if (!DirectoryExists(testManifestOutputFolder)){
		CreateDirectory(testManifestOutputFolder);
	}

	var args = string.Format(
		"--folder \"{0}\" --output \"{1}\"",
		buildOutputFolder.ToString().Replace("/", "\\"),
		testManifestOutputFile.ToString().Replace("/", "\\"));
			
	var toolResult = StartProcess(manifestToolPath, args);
	if (toolResult != 0)
	{
		Error("Error generating test manifest file.");
		Information("Exit code: {0}", toolResult);
	}

});

RunTarget(target);

