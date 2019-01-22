using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using log4net.Core;

namespace SlimJim.Model
{
	public class SlnGenerationOptions
	{
		private const string DefaultSolutionName = "SlimJim";
		private string projectsRootDirectory;
		private string solutionName;
		private string slnOutputPath;
		private readonly List<string> additionalSearchPaths;
		private readonly List<string> ignoreDirectoryPatterns;

		public SlnGenerationOptions(string workingDirectory)
		{
			ProjectsRootDirectory = workingDirectory;
			additionalSearchPaths = new List<string>();
			ignoreDirectoryPatterns = new List<string>();
			TargetProjectNames = new List<string>();
			VisualStudioVersion = VisualStudioVersion.VS2015;
			LoggingThreshold = Level.Debug;
		}


        public List<string> TargetProjectNames { get; private set; }

		public string ProjectsRootDirectory
		{
			get { return projectsRootDirectory; }
			set
			{
				projectsRootDirectory = ResolvePath(value);
			}
		}

		public VisualStudioVersion VisualStudioVersion { get; set; }
		public bool IncludeReferencing { get; set; }
		public bool SkipReferences { get; set; }
		public bool ShowHelp { get; set; }
		public bool ConvertReferences { get; set; }
		public bool RestoreReferences { get; set; }
		public bool FixHintPaths { get; set; }
		public bool RestoreHintPaths { get; set; }
		public bool OpenInVisualStudio { get; set; }
		public Level LoggingThreshold { get; set; }

		public List<string> AdditionalSearchPaths
		{
			get
			{
				return additionalSearchPaths.ConvertAll(ResolvePath);
			}
		}

		private string ResolvePath(string p)
		{
			return !Path.IsPathRooted(p) ? Path.Combine(ProjectsRootDirectory, p) : p;
		}

		public string SlnOutputPath
		{
			get { return slnOutputPath != null ? ResolvePath(slnOutputPath) : ProjectsRootDirectory; }
			set { slnOutputPath = value; }
		}

		public string SolutionName
		{
			get
			{
				if (string.IsNullOrEmpty(solutionName))
				{
                    return Path.Combine(
                        this.BaseFolder,
                        "_auto.sln");

					//if (TargetProjectNames.Count > 0)
					//{
					//	return string.Join("_", TargetProjectNames);
					//}

					//if (!string.IsNullOrEmpty(ProjectsRootDirectory))
					//{
					//	return GetLastSegmentNameOfProjectsRootDirectory();
					//}

					//return DefaultSolutionName;
				}

				return solutionName;
			}
			set { solutionName = value; }
		}

		private string GetLastSegmentNameOfProjectsRootDirectory()
		{
			var dir = new DirectoryInfo(ProjectsRootDirectory);
            
			if (string.IsNullOrEmpty(dir.Name) || dir.FullName == dir.Root.FullName)
			{
				return DefaultSolutionName;
			}
			return dir.Name;
		}

		public SlnGenerationMode Mode
		{
			get
			{
				return TargetProjectNames.Count == 0
					? SlnGenerationMode.FullGraph
					: SlnGenerationMode.PartialGraph;
			}
		}

		public List<string> IgnoreDirectoryPatterns
		{
			get { return ignoreDirectoryPatterns; }
		}

        public string BaseFolder { get; internal set; }
        public string ToolPath { get; internal set; }
        public bool UseRelativePaths { get; internal set; }

        public void AddAdditionalSearchPaths(params string[] searchPaths)
		{
			additionalSearchPaths.AddRange(searchPaths);
		}

		public void AddTargetProjectNames(params string[] targetProjectNames)
		{
			TargetProjectNames.AddRange(targetProjectNames);
		}

		public void AddIgnoreDirectoryPatterns(params string [] patterns)
		{
			ignoreDirectoryPatterns.AddRange(patterns);
		}


        public override string ToString()
        {
            StringBuilder builder = new StringBuilder();
            builder.Append($"AdditionalSearchPaths = {string.Join(",", this.AdditionalSearchPaths)}\n");
            builder.Append($"BaseFolder = {this.BaseFolder}\n");
            builder.Append($"ConvertReferences = {this.ConvertReferences}\n");
            builder.Append($"FixHintPaths = {this.FixHintPaths}\n");
            builder.Append($"IgnoreDirectoryPatterns = {string.Join(",", this.IgnoreDirectoryPatterns)}\n");
            builder.Append($"IncludeReferencing = {this.IncludeReferencing}\n");
            builder.Append($"LoggingThreshold = {this.LoggingThreshold}\n");
            builder.Append($"Mode = {this.Mode}\n");
            builder.Append($"OpenInVisualStudio = {this.OpenInVisualStudio}\n");
            builder.Append($"ProjectsRootDirectory = {this.ProjectsRootDirectory}\n");
            builder.Append($"RestoreHintPaths = {this.RestoreHintPaths}\n");
            builder.Append($"RestoreReferences = {this.RestoreReferences}\n");
            builder.Append($"ShowHelp = {this.ShowHelp}\n");
            builder.Append($"SkipReferences = {this.SkipReferences}\n");
            builder.Append($"SlnOutputPath = {this.SlnOutputPath}\n");
            builder.Append($"SolutionName = {this.SolutionName}\n");
            builder.Append($"TargetProjectNames = {string.Join(",", this.TargetProjectNames)}\n");
            builder.Append($"ToolPath = {this.ToolPath}");

            return builder.ToString();
        }
    }
}
