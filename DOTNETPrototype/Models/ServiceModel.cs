namespace Models;

public partial class ServiceModel
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string? Image { get; set; }

    public int TokenCost { get; set; }

    public int? RegisteredBy { get; set; }

    public string Type { get; set; } = null!;

    public virtual UserModel? RegisteredByNavigation { get; set; }

    public virtual ICollection<ServicePurchaseModel> ServicePurchases { get; set; } = new List<ServicePurchaseModel>();
}
