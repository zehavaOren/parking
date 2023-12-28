using backend.Core.Extentions.Collections;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Core.Utils
{
    public class CacheManager<T> where T : class
    {
        #region Variables
        private const int ExpireCacheTime = 120;
        private static DateTime LastClear = DateTime.Now;

        private static Dictionary<string, T> _cache;
        private static Dictionary<string, T> Cache
        {
            get
            {
                if (LastClear <= DateTime.Now.AddMinutes(-1 * ExpireCacheTime))
                {
                    Cache.Clear();
                    LastClear = DateTime.Now;
                }

                if (_cache == null)
                    _cache = new Dictionary<string, T>();

                return _cache;
            }
        }


        #endregion

        public T SetItem(T value, string key = null)
        {
            Cache.Set(CacheKeyName(key), value);
            return value;
        }

        public T SetItem(T value, int key)
        {
            SetItem(value, key.ToString());
            return value;
        }

        public T GetItem(string key = null)
        {
            return Cache.Get(CacheKeyName(key)) as T;
        }

        public T GetItem(int key)
        {
            return GetItem(key.ToString());
        }

        public void Clear(string key = null)
        {
            Cache.Remove(CacheKeyName(key));
        }

        private string CacheKeyName(string key)
        {
            return $"{typeof(T).FullName}_{key}";
        }
    }
}
