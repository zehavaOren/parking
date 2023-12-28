using System;

namespace Supervision.Core.Data
{
    public class InformationSchemaParameters
    {

        public string SPECIFIC_CATALOG { get; set; }
        public string SPECIFIC_SCHEMA { get; set; }
        public string SPECIFIC_NAME { get; set; }
        public int ORDINAL_POSITION { get; set; }
        public string PARAMETER_MODE { get; set; }
        public string IS_RESULT { get; set; }
        public string AS_LOCATOR { get; set; }
        public string PARAMETER_NAME { get; set; }
        public string DATA_TYPE { get; set; }
        public int CHARACTER_MAXIMUM_LENGTH { get; set; }
        public string CHARACTER_OCTET_LENGTH { get; set; }
        public string COLLATION_CATALOG { get; set; }
        public string COLLATION_SCHEMA { get; set; }
        public string COLLATION_NAME { get; set; }
        public string CHARACTER_SET_CATALOG { get; set; }
        public string CHARACTER_SET_SCHEMA { get; set; }
        public string CHARACTER_SET_NAME { get; set; }
        public int NUMERIC_PRECISION { get; set; }
        public int NUMERIC_PRECISION_RADIX { get; set; }
        public int NUMERIC_SCALE { get; set; }
        public int DATETIME_PRECISION { get; set; }
        public string INTERVAL_TYPE { get; set; }
        public string INTERVAL_PRECISION { get; set; }
        public string USER_DEFINED_TYPE_CATALOG { get; set; }
        public string USER_DEFINED_TYPE_SCHEMA { get; set; }
        public string USER_DEFINED_TYPE_NAME { get; set; }
        public string SCOPE_CATALOG { get; set; }
        public string SCOPE_SCHEMA { get; set; }
        public string SCOPE_NAME { get; set; }
    }

    public class SpScheme
    {
        public string SPECIFIC_NAME { get; private set; }

        internal static SpScheme GetScheme(string commandText)
        {
            var split = commandText.Replace("[", "").Replace("]", "").Split(".");

            SpScheme sc = new SpScheme();
            sc.SPECIFIC_NAME = split[split.Length - 1];

            return sc;
        }
    }
}