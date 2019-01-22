using System.Collections.Generic;
using System.IO;
using log4net;
using SlimJim.Model;

namespace SlimJim.Infrastructure
{
	public class CsProjRepository : ICsProjRepository
	{
		private static readonly ILog Log = LogManager.GetLogger(typeof(CsProjRepository));

		public CsProjRepository()
		{
			Finder = new ProjectFileFinder();
			Reader = new ProjReader();
		}

		public virtual List<Proj> LookupCsProjsFromDirectory(SlnGenerationOptions options)
		{
            CsProjRepository.Log.Info($"Searching for projects in directory {options.ProjectsRootDirectory}");

            IgnoreConfiguredDirectoryPatterns(options);
			List<FileInfo> files = FindAllProjectFiles(options);
            CsProjRepository.Log.Info(
                $"Found files {string.Join(",", files)}");

            List<Proj> projects = ReadProjectFilesIntoCsProjObjects(files);
            CsProjRepository.Log.Info(
                $"Found projects {string.Join("\n", projects)}");

            return projects;
		}

		private void IgnoreConfiguredDirectoryPatterns(SlnGenerationOptions options)
		{
			if (options.IgnoreDirectoryPatterns.Count > 0)
			{
				Finder.IgnorePatterns(options.IgnoreDirectoryPatterns.ToArray());
			}
		}

		private List<FileInfo> FindAllProjectFiles(SlnGenerationOptions options)
		{
			List<FileInfo> files = Finder.FindAllProjectFiles(options.ProjectsRootDirectory);

			foreach (string path in options.AdditionalSearchPaths)
			{
				files.AddRange(Finder.FindAllProjectFiles(path));
			}

			return files;
		}

		private List<Proj> ReadProjectFilesIntoCsProjObjects(List<FileInfo> files)
		{
			List<Proj> projects = files.ConvertAll(f => Reader.Read(f));
			projects.RemoveAll(p => p == null);
			return projects;
		}

		public ProjectFileFinder Finder { get; set; }
		public ProjReader Reader { get; set; }
	}
}