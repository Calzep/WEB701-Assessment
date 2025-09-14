namespace Models;

public partial class Service
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string? Image { get; set; }

    public int TokenCost { get; set; }

    public int? RegisteredBy { get; set; }

    public string Type { get; set; } = null!;

    public virtual User? RegisteredByNavigation { get; set; }

    public virtual ICollection<ServicePurchase> ServicePurchases { get; set; } = new List<ServicePurchase>();
}
