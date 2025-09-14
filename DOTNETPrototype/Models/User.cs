namespace Models;

public partial class User
{
    public int Id { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? FirstName { get; set; }

    public string LastName { get; set; } = null!;

    public string UserType { get; set; } = null!;

    public int Tokens { get; set; }

    public virtual ICollection<ServicePurchase> ServicePurchases { get; set; } = new List<ServicePurchase>();

    public virtual ICollection<Service> Services { get; set; } = new List<Service>();
}
