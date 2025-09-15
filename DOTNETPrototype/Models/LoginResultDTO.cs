namespace Models
{
    public class LoginResultDTO
    {
        public string Token { get; set; } = null!;
        public UserModel User { get; set; } = null!;
    }
}

