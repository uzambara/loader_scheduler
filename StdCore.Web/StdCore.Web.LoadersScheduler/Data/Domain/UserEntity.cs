using System;
using Newtonsoft.Json;

namespace Std.WebClient.Data.Domain
{
    public class UserEntity: IEntityBase
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Login { get; set; }
        [JsonIgnore]
        public string Password { get; set; }
        public DateTime Created { get; set; }
        public DateTime? Deleted { get; set; }
    }
}
