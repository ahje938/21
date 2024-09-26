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

        // Register ApplicationDbContext and configure SQL Server connection
        builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),
                b => b.MigrationsAssembly("BakOverskriftene.DataAccess")));

        builder.Services.AddControllers()
            .AddJsonOptions(options => {
                options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
            });

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        // Add the CORS middleware to the pipeline
        app.UseCors("AllowAny");

        // Serve static files (for React app)
        app.UseStaticFiles();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment()) {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();
        app.UseAuthorization();

        // Add routing to allow fallback to index.html for React app
        app.MapControllers();

        // This line allows your React app to be served
        app.MapFallbackToFile("index.html");

        app.Run();
    }
}
