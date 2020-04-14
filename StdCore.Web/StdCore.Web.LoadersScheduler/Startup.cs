using System.Linq;
using AutoMapper;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Std.WebClient.Data;
using Std.WebClient.Data.Domain;
using Std.WebClient.Data.Repositories;
using Std.WebClient.Options;
using Std.WebClient.Services.Implementations;
using Std.WebClient.Services.Interfaces;
using Std.WebClient.SignalR;

namespace Std.WebClient
{
    public class
        Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {

            services
                .AddControllers()
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                })
                .AddFluentValidation(config => config.RegisterValidatorsFromAssemblyContaining<Startup>());

            services.AddCors();
            services.AddHttpContextAccessor();

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services
                .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options =>
                {
                    //options.Cookie.SameSite = SameSiteMode.None;
                    options.LoginPath = new PathString("/login");
                });

            services.AddHealthChecks().AddDbContextCheck<SchedulerDbContext>();
            services.AddDbContextPool<SchedulerDbContext>(options =>
            {
                options.UseSqlServer(_configuration.GetConnectionString("Scheduler"), builder =>
                {
                    builder.UseRelationalNulls(true);
                });
            });


            services.AddAutoMapper(typeof(Startup));
            services.AddSignalR()
                .AddNewtonsoftJsonProtocol();
            // services.Replace(new ServiceDescriptor(
            //     typeof(IUserIdProvider),
            //     typeof(TokenUserIdProvider),
            //     ServiceLifetime.Singleton));


            services.AddScoped(typeof(RepositoryBase<>));
            services.AddScoped<TaskRepository>();

            services.AddMediatR(typeof(Startup));
            services.AddScoped<TaskHubContextWrapper>();
            services.AddScoped<ITaskService, TaskService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ILoaderService, LoaderService>();

            services.AddSwaggerGen(options => options.SwaggerDoc("v1", new OpenApiInfo(){Title = "Scheduler API", Version = "v1"}));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILogger<Startup> logger)
        {
            var swaggerOptions = new SwaggerOptions();
            _configuration.GetSection(nameof(SwaggerOptions)).Bind(swaggerOptions);
            app.UseSwagger(options => options.RouteTemplate = swaggerOptions.RouteJson);
            app.UseSwaggerUI(options => options.SwaggerEndpoint(swaggerOptions.UiEndpoint, swaggerOptions.Description));

            app.UseExceptionHandler(errorApp =>
            {
                errorApp.Run(async context =>
                {
                    context.Response.StatusCode = 400;
                    context.Response.ContentType = "application/json";

                    var exceptionHandlerFeature =
                        context.Features.Get<IExceptionHandlerFeature>();

                    logger.LogError(exceptionHandlerFeature.Error, "UNHANDLED APP EXCEPTION");
                    await context.Response.WriteAsync(exceptionHandlerFeature.Error.Message + "\n" + exceptionHandlerFeature.Error.StackTrace);
                });
            });



            // подключаем CORS
            app.UseCors(builder =>
            {
                var credentials = _configuration.GetSection("AllowedHosts").Get<string[]>();
                builder
                    .WithOrigins(credentials.ToArray())
                    .AllowCredentials()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });

            app.UseHealthChecks("/health");

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGet("/test", async context =>
                {
                    var schedulerDbContext = context.RequestServices.GetService<SchedulerDbContext>();
                    var users = await schedulerDbContext.Set<UserEntity>().ToListAsync();
                    await context.Response.WriteAsync(JsonConvert.SerializeObject(users));
                });
                endpoints.MapHub<TaskHub>("/task-hub");
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";
            });
        }
    }
}
