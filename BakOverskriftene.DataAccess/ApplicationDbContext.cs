using BakOverskriftene.Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System.Reflection;

public class ApplicationDbContext : IdentityDbContext<IdentityUser> {

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :
        base(options) { }

    public DbSet<Player> Players { get; set; }
    public DbSet<Results> Results { get; set; }
    public DbSet<Section> Sections { get; set; }
    public DbSet<Question> Questions { get; set; }
    public DbSet<Answer> Answers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
        optionsBuilder.UseSqlServer(
             @"Server = (localdb)\MSSQLLocalDB; " +
             "Database = Hk-BakOverskrifteneDb; " +
            "Trusted_Connection = True;");

    }
    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        base.OnModelCreating(modelBuilder); // Call the base method to configure ASP.NET Core Identity entities

        // Configure primary key for IdentityUserLogin<string> entity
        modelBuilder.Entity<IdentityUserLogin<string>>(entity => {
            entity.HasKey(e => new { e.LoginProvider, e.ProviderKey });
        });
        foreach (IMutableEntityType entityType in modelBuilder.Model.GetEntityTypes()) {
            MethodInfo? method = entityType.ClrType.GetMethod("OnModelCreating",
            BindingFlags.Static | BindingFlags.NonPublic);
            if (method != null) {
                method.Invoke(null, new object[] { modelBuilder });
            }
        }
    }
}