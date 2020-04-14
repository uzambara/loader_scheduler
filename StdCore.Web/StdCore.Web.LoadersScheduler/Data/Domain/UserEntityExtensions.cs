using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Std.WebClient.Data.Domain
{
    public static class UserEntityExtensions
    {
        public static string GetFullName(this UserEntity user)
        {
            return $"{user.LastName} {user.Name}";
        }
    }
}
