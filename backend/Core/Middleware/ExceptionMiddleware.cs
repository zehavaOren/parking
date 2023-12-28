using backend.Core.Config;
using backend.Core.Logging;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace backend.Core.Middleware
{
    public class ExceptionMiddleware
    {
        private Logger logger;
        private readonly RequestDelegate _next;
        private ConfigurationManager _cm;
        private readonly bool _isDev;


        public ExceptionMiddleware(RequestDelegate next, ConfigurationManager cm, bool isDev, Logger log)
        {
            _next = next;
            _cm = cm;
            _isDev = isDev;
            logger = log;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                logger.Error($"Something went wrong: {ex}", ex);
                await HandleExceptionAsync(httpContext, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            long errorNumber = 0;
            logger.Error(exception.Message, exception);

            if (_isDev)
                return context.Response.WriteAsync(new ErrorDetails()
                {
                    StatusCode = context.Response.StatusCode,
                    Message = $"Internal Server Error from the {exception.Message}.",
                    ErrorNumber = errorNumber
                }.ToString());

            return context.Response.WriteAsync("Internal Server Error");

        }
    }

    internal class ErrorDetails
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public long ErrorNumber { get; set; }

        public ErrorDetails()
        {
        }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
