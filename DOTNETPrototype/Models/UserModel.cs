namespace Models;

public partial class UserModel
{
    public int Id { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? FirstName { get; set; }

    public string LastName { get; set; } = null!;

    public string UserType { get; set; } = null!;

    public int Tokens { get; set; }

    public virtual ICollection<ServicePurchaseModel> ServicePurchases { get; set; } = new List<ServicePurchaseModel>();

    public virtual ICollection<ServiceModel> Services { get; set; } = new List<ServiceModel>();
}
