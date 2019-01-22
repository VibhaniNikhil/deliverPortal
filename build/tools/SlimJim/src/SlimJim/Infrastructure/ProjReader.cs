using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml.Linq;
using SlimJim.Model;
using log4net;
using System.Reflection;

namespace SlimJim.Infrastructure
{
	public class ProjReader
	{
        private static readonly ILog Log = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
        private static readonly XNamespace Ns = "http://schemas.microsoft.com/developer/msbuild/2003";

		public Proj Read(FileInfo csProjFile)
		{
            if (csProjFile.Extension.Equals(".csproj", StringComparison.OrdinalIgnoreCase))
            {
                return this.ReadCsProj(csProjFile);
            }
            else if (csProjFile.Extension.Equals(".jsproj", StringComparison.OrdinalIgnoreCase))
            {
                return this.ReadJsProj(csProjFile);
            }
            else if (csProjFile.Extension.Equals(".njsproj", StringComparison.OrdinalIgnoreCase))
            {
                return this.ReadJsProj(csProjFile);
            }

            return null;
		}


        private Proj ReadJsProj(FileInfo csProjFile)
        {
            var xml = LoadXml(csProjFile);
            var properties = xml.Element(Ns + "PropertyGroup");

            if (properties == null) return null;

            string projectGuid = FindProjectProperty(xml, "ProjectGuid");
            if (string.IsNullOrWhiteSpace(projectGuid))
            {
                projectGuid = Guid.NewGuid().ToString();
            }
            


            return new Proj
            {
                AssemblyName = Path.GetFileNameWithoutExtension(csProjFile.Name),
                Path = csProjFile.FullName,
                Guid = "{" + projectGuid.ToUpper() + "}",
                UsesMSBuildPackageRestore = FindImportedNuGetTargets(xml)
            };
        }

        private static string FindProjectProperty(XElement xml, string name)
        {
            foreach (var prop in xml.Elements(Ns + "PropertyGroup"))
            {
                string value = prop.Element(Ns + name).ValueOrDefault();
                if (!string.IsNullOrWhiteSpace(value))
                {
                    return value;
                }
            }

            return null;
        }

        private bool TryReadCoreProject(FileInfo csProjFile, XElement element, out Proj proj)
        {
            XAttribute sdkAttribute = element.Attribute("Sdk");
            if (sdkAttribute == null || 
                (sdkAttribute.Value != "Microsoft.NET.Sdk" && sdkAttribute.Value != "Microsoft.NET.Sdk.Web"))
            {
                proj = null;
                return false;
            }

            string assemblyName = Path.GetFileNameWithoutExtension(csProjFile.Name);
            var properties = element.Element("PropertyGroup");
            //XElement assemblyNameElement = null;

            //if (properties != null &&
            //    (assemblyNameElement = properties.Element("AssemblyName")) != null)
            //{
            //    assemblyName = assemblyNameElement.Value;
            //}


            string projectGuid = properties.Element("ProjectGuid").ValueOrDefault();
            if (string.IsNullOrEmpty(projectGuid))
            {
                projectGuid = "{" + Guid.NewGuid().ToString() + "}";
            }

            proj = new Proj
            {
                Path = csProjFile.FullName,
                AssemblyName = assemblyName,
                TargetFrameworkVersion = properties.Element("TargetFrameworkVersion").ValueOrDefault(),
                Guid = projectGuid.ToUpper(),
                //ReferencedAssemblyNames = ReadReferencedAssemblyNames(element),
                //ReferencedProjectGuids = ReadReferencedProjectGuids(element, csProjFile),
                //UsesMSBuildPackageRestore = FindImportedNuGetTargets(element)
            };

            return true;
        }

        private Proj ReadCsProj(FileInfo csProjFile)
        {
            var xml = LoadXml(csProjFile);
            Proj proj = null;

            if (this.TryReadCoreProject(csProjFile, xml, out proj))
            {
                return proj;
            }

            var properties = xml.Element(Ns + "PropertyGroup");

            if (properties == null) return null;

            var assemblyName = properties.Element(Ns + "AssemblyName");

            if (assemblyName == null) return null;

            return new Proj
            {
                Path = csProjFile.FullName,
                AssemblyName = assemblyName.Value,
                Guid = properties.Element(Ns + "ProjectGuid").ValueOrDefault()?.ToUpper(),
                TargetFrameworkVersion = properties.Element(Ns + "TargetFrameworkVersion").ValueOrDefault(),
                ReferencedAssemblyNames = ReadReferencedAssemblyNames(xml),
                ReferencedProjectGuids = ReadReferencedProjectGuids(xml, csProjFile),
                UsesMSBuildPackageRestore = FindImportedNuGetTargets(xml)
            };
        }

        private XElement LoadXml(FileInfo csProjFile)
		{
			XElement xml;
			using (var reader = csProjFile.OpenText())
			{
				xml = XElement.Load(reader);
			}
			return xml;
		}

		private List<string> ReadReferencedAssemblyNames(XElement xml)
		{
			var rawAssemblyNames = (from r in xml.DescendantsAndSelf(Ns + "Reference")
											 where r.Parent.Name == Ns + "ItemGroup"
											 select r.Attribute("Include").Value).ToList();
			var unQualifiedAssemblyNames = rawAssemblyNames.ConvertAll(UnQualify);
			return unQualifiedAssemblyNames;
		}

		private string UnQualify(string name)
		{
			if (!name.Contains(",")) return name;

			return name.Substring(0, name.IndexOf(","));
		}

		private List<string> ReadReferencedProjectGuids(XElement xml, FileInfo csprojFile)
		{
			return (from pr in xml.DescendantsAndSelf(Ns + "ProjectReference")
					  select ReadProjectGuid(pr, csprojFile)).ToList();
		}

        private string ReadProjectGuid(XElement projectReference, FileInfo csprojFile)
        {
            var project = projectReference.Element(Ns + "Project");
            if (project == null)
            {
                Log.WarnFormat("No project Guid for {0}. Fixing..." , projectReference.Element(Ns + "Name").Value);
                var filename = projectReference.Attribute("Include")?.Value;
                if (filename == null)
                {
                    Log.WarnFormat("No Include= attribute for project {0}.", projectReference.Element(Ns + "Name").Value);
                    return null;
                }
                filename = Path.Combine(csprojFile.Directory.FullName, filename);
                var projectFile = LoadXml(new FileInfo(filename));
                var projectGuid = projectFile?.Element(Ns + "PropertyGroup")?.Element(Ns + "ProjectGuid");
                if (projectGuid == null)
                {
                    Log.WarnFormat("ProjectGuid not found in {0}", filename);
                    return null;
                }
                return projectGuid.Value.ToUpper();
            }
            return project.Value.ToUpper();
        }

		private bool FindImportedNuGetTargets(XElement xml)
		{
			var importPaths = (from import in xml.DescendantsAndSelf(Ns + "Import")
					select import.Attribute("Project").Value);
			return importPaths.Any(p => p.EndsWith(@"\.nuget\nuget.targets", StringComparison.InvariantCultureIgnoreCase));
		}


	}
}