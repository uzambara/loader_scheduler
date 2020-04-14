using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Std.WebClient.Data.Domain;
using Std.WebClient.Data.Enum;

namespace Std.WebClient.Data.Configuration
{
    public class UserGroupEntityConfiguration: IEntityTypeConfiguration<UserGroupEntity>
    {
        public void Configure(EntityTypeBuilder<UserGroupEntity> builder)
        {
            builder.ToTable("UserGroups");
            builder.HasKey(e => e.Id);
            builder.HasData(new List<UserGroupEntity>()
            {
                new UserGroupEntity()
                {
                    Id = (int)UserGroup.Admin,
                    Name = "Администратор"
                }
            });
        }
    }
}