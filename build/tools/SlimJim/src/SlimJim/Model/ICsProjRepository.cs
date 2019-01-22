using System.Collections.Generic;

namespace SlimJim.Model
{
	public interface ICsProjRepository
	{
		List<Proj> LookupCsProjsFromDirectory(SlnGenerationOptions options);
	}
}