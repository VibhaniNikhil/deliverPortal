using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Cake.Core.Diagnostics;

namespace ConsentPro.Build
{
    public class BuildLogger : ICakeLog
    {
        public Verbosity Verbosity { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public void Write(Verbosity verbosity, LogLevel level, string format, params object[] args)
        {
            throw new NotImplementedException();
        }
    }
}
