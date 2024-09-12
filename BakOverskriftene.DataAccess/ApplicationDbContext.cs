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

        // Configure one-to-many relationship between Section and Question
        modelBuilder.Entity<Question>()
            .HasOne(q => q.Section)
            .WithMany(s => s.Questions)
            .HasForeignKey(q => q.SectionId)
            .OnDelete(DeleteBehavior.Cascade);

        // Configure one-to-many relationship between Question and Answer
        modelBuilder.Entity<Answer>()
            .HasOne(a => a.Question)
            .WithMany(q => q.Answers)
            .HasForeignKey(a => a.QuestionId)
            .OnDelete(DeleteBehavior.Cascade);

        // Configure many-to-many relationship between Section and Player via Results
        modelBuilder.Entity<Results>()
            .HasKey(r => new { r.SectionId, r.PlayerId });

        modelBuilder.Entity<Results>()
            .HasOne(r => r.Section)
            .WithMany(s => s.Results)
            .HasForeignKey(r => r.SectionId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Results>()
            .HasOne(r => r.Player)
            .WithMany(p => p.Results)
            .HasForeignKey(r => r.PlayerId)
            .OnDelete(DeleteBehavior.Cascade);

        // Configure primary key for IdentityUserLogin<string> entity
        modelBuilder.Entity<IdentityUserLogin<string>>(entity => {
            entity.HasKey(e => new { e.LoginProvider, e.ProviderKey });
        });

        // Invoke static methods for additional configuration
        foreach (IMutableEntityType entityType in modelBuilder.Model.GetEntityTypes()) {
            MethodInfo? method = entityType.ClrType.GetMethod("OnModelCreating",
            BindingFlags.Static | BindingFlags.NonPublic);
            if (method != null) {
                method.Invoke(null, new object[] { modelBuilder });
            }
        }
    }
}
