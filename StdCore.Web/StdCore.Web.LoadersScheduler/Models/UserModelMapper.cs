using AutoMapper;
using Std.WebClient.Data.Domain;

namespace Std.WebClient.Models
{
    public class UserModelMapper: Profile
    {
        public UserModelMapper()
        {
            CreateMap<UserEntity, UserModel>();
        }
    }
}
