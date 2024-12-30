using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

internal class Program {
    private static void Main(string[] args) {
        var builder = WebApplication.CreateBuilder(args);

        // Configure CORS - Temporary allow all setup
        builder.Services.AddCors(options => {
            options.AddPolicy("AllowAny",
                policy => policy
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod());


        });

        // Add services to the container.
        builder.Services.AddAuthorization();

        // Add Identity services and register the DbContext
        builder.Services.AddIdentity<IdentityUser, IdentityRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

        // Load the connection string from environment variables if available
        var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection");

        if (string.IsNullOrEmpty(connectionString)) {
            connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
        }

        // Register ApplicationDbContext and configure SQL Server connection
        builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(connectionString,
                b => b.MigrationsAssembly("BakOverskriftene.DataAccess")));

        builder.Services.AddControllers()
            .AddJsonOptions(options => {
                options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
            });

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        // CORS middleware - this should be before authentication and authorization
        app.UseCors("AllowAny"); // Allow cross-origin requests

        // Static files middleware (needed to serve React app)
        app.UseStaticFiles();

        // HTTPS redirection - generally placed before authorization for secure connections
        app.UseHttpsRedirection();

        // Authentication middleware - should be before authorization
        app.UseAuthentication(); // This will authenticate the user

        // Authorization middleware - follows authentication, checking if the user has the right permissions
        app.UseAuthorization();

        // Swagger - only in development environment
        if (app.Environment.IsDevelopment()) {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        // Map controllers (routes for your API endpoints)
        app.MapControllers();

        // Fallback route for React (single-page app)
        app.MapFallbackToFile("index.html");

        app.Run();

    }
}

