using System.IO;
using log4net;
using log4net.Appender;
using log4net.Config;
using log4net.Core;
using log4net.Layout;
using SlimJim.Infrastructure;
using System;

namespace SlimJim
{
	public class SlimJimMain
	{
        public static void Main(string[] args)
		{
            var consoleAppender = ConfigureLogging();
            consoleAppender.Threshold = Level.Off;

            //args = new string[] {
            //    "--root",
            //    @"D:\src\test\",
            //    "--t",
            //    @"D:\src\test\",
            //    "--open",
            //    "--tp",
            //    @"C:\windows\system32\notepad.exe",
            //    "--rel"
            //};

            //args = new string[] {
            //"--root",
            //@"D:\src\ConsentPro2\\ConsentPro\src",
            //"--t",
            //@"D:\src\ConsentPro2\ConsentPro\src",
            //"-open",
            //"--tp",
            //@"C:\windows\system32\notepad.exe" };

            var log = LogManager.GetLogger(typeof(SlnFileGenerator));
            log.InfoFormat("SlimJim CommandLine: {0}", string.Join(",", args));
            var fileGenerator = new SlnFileGenerator();

			var optionsBuilder = new ArgsOptionsBuilder();
			var options = optionsBuilder.Build(args, Directory.GetCurrentDirectory());
            log.Info("Options:");
            log.Info(options.ToString());
            
            if (options.ShowHelp)
			{
				optionsBuilder.WriteHelpMessage();
				return;
			}

			var solutionPath = fileGenerator.GenerateSolutionFile(options);
				
			if (options.OpenInVisualStudio)
			{
				log.InfoFormat("Opening {0} in Visual Studio {1}", solutionPath, options.VisualStudioVersion.Year);
				VisualStudioIntegration.OpenSolution(solutionPath, options);
			}
		}

        private static ManagedColoredConsoleAppender ConfigureLogging()
        {
            var appender = new ManagedColoredConsoleAppender
            {
                Threshold = Level.All,
                Layout = new PatternLayout("%message%newline"),
            };
            appender.AddMapping(new ManagedColoredConsoleAppender.LevelColors { Level = Level.Info, ForeColor = ConsoleColor.Gray });
            appender.AddMapping(new ManagedColoredConsoleAppender.LevelColors { Level = Level.Debug, ForeColor = ConsoleColor.DarkCyan });
            appender.AddMapping(new ManagedColoredConsoleAppender.LevelColors { Level = Level.Warn, ForeColor = ConsoleColor.Yellow });
            appender.AddMapping(new ManagedColoredConsoleAppender.LevelColors { Level = Level.Error, ForeColor = ConsoleColor.Red });
            appender.ActivateOptions();
            BasicConfigurator.Configure(appender);
            return appender;
        }
    }
}
