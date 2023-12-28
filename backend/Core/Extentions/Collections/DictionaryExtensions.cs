using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Core.Extentions.Collections
{
    public static class DictionaryExtensions
    {
        public static void Set<K, T>(this Dictionary<K, T> source, K key, T value, System.DateTime? expire = null)
        {
            if (!source.ContainsKey(key))
                source.Add(key, value);
            else
                source[key] = value;
        }

        public static T Get<K, T>(this Dictionary<K, T> source, K key)
        {
            if (source.ContainsKey(key))
                return source[key];

            return default(T);
        }

    }
}
