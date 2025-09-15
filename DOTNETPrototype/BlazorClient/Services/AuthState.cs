using Models;

namespace BlazorClient.Services;

public class AuthState
{
    public UserModel? User { get; private set; }
    public bool IsLoggedIn => User != null;
    public string? Jwt {  get; private set; }

    public void Login(UserModel user, string jwt)
    {
        User = user;
        Jwt = jwt;
    }

    public void Logout()
    {
        User = null;
        Jwt = null;
    }
}
