using Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer;

public partial class ModelContext : DbContext
{
    public ModelContext()
    {
    }

    public ModelContext(DbContextOptions<ModelContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ServiceModel> Services { get; set; }

    public virtual DbSet<ServicePurchaseModel> ServicePurchases { get; set; }

    public virtual DbSet<UserModel> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ServiceModel>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Service");

            entity.ToTable("Service");

            entity.Property(e => e.Description)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.Image)
                .HasMaxLength(256)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Type)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.RegisteredByNavigation).WithMany(p => p.Services)
                .HasForeignKey(d => d.RegisteredBy)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK__Service__User");
        });

        modelBuilder.Entity<ServicePurchaseModel>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ServicePurchase");

            entity.ToTable("ServicePurchase");

            entity.Property(e => e.Date).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasDefaultValue("pending");

            entity.HasOne(d => d.ServiceNavigation).WithMany(p => p.ServicePurchases)
                .HasForeignKey(d => d.Service)
                .HasConstraintName("FK__ServicePurchase__Service");

            entity.HasOne(d => d.UserNavigation).WithMany(p => p.ServicePurchases)
                .HasForeignKey(d => d.User)
                .HasConstraintName("FK__ServicePurchase_User");
        });

        modelBuilder.Entity<UserModel>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__User");

            entity.ToTable("User");

            entity.HasIndex(e => e.Email, "UQ__User_Email").IsUnique();

            entity.Property(e => e.Email)
                .HasMaxLength(256)
                .IsUnicode(false);
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.LastName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(256)
                .IsUnicode(false);
            entity.Property(e => e.Tokens).HasColumnName("tokens");
            entity.Property(e => e.UserType)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("userType");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
