using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Build.Tasks;

namespace ConsentPro.Msbuild
{
    public class ResolveSigningKeyTask : ResolveKeySource
    {
        public string CertificatePassword { get; set; }

        public override bool Execute()
        {
            if (!string.IsNullOrWhiteSpace(this.CertificateFile) && !string.IsNullOrWhiteSpace(this.CertificatePassword))
            {
                X509Certificate2 cert = new X509Certificate2(this.CertificateFile, this.CertificatePassword);
                this.ResolvedThumbprint = cert.Thumbprint;
                return true;
            }

            return base.Execute();
        }
    }
}
