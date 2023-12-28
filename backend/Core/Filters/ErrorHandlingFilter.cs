using backend.Core.Logging;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Core.Filters
{
    public class ErrorHandlingFilter : IExceptionFilter
    {
        private readonly Logger _logger;


        public void OnException(ExceptionContext context)
        {
            var exception = context.Exception;
            _logger.Error(exception.Message, exception);
        }

        public ErrorHandlingFilter(Logger log)
        {
            _logger = log;
        }
    }
}
