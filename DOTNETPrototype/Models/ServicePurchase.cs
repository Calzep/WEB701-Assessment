namespace Models;

public partial class ServicePurchase
{
    public int Id { get; set; }

    public int Service { get; set; }

    public int User { get; set; }

    public DateTime Date { get; set; }

    public string? Status { get; set; }

    public int TemporalTokenCost { get; set; }

    public virtual Service ServiceNavigation { get; set; } = null!;

    public virtual User UserNavigation { get; set; } = null!;
}
