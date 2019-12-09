using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace IC_Talent.Server.Helpers
{
    public class Capitalize
    {
        public string ToCapitalize(string val)
        {
            CultureInfo cultureInfo = Thread.CurrentThread.CurrentCulture;
            TextInfo textInfo = cultureInfo.TextInfo;
            return (textInfo.ToTitleCase(val));
        }
    }
}
