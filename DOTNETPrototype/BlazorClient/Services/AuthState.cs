using Models;

namespace BlazorClient.Services;

public class AuthState
{
    public UserModel? User { get; private set; }
    public bool IsLoggedIn => User != null;

    public void Login(UserModel user)
    {
        User = user;
    }

    public void Logout()
    {
        User = null;
    }
}
