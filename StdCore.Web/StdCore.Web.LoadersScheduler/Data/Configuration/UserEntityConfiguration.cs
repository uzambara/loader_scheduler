using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Std.WebClient.Data.Domain;

namespace Std.WebClient.Data.Configuration
{
    public class UserEntityConfiguration:  IEntityTypeConfiguration<UserEntity>
    {
        public void Configure(EntityTypeBuilder<UserEntity> builder)
        {
            builder.ToTable("Users");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Login).IsRequired();
            builder.Property(e => e.Name).IsRequired();
            builder.Property(e => e.LastName).IsRequired();
            builder.Property(e => e.Password).IsRequired();
            builder.HasData(new List<UserEntity>()
            {
                new UserEntity()
                {
                    Id = 1,
                    Name = "Admin",
                    LastName = "Admin",
                    Login = "Admin",
                    Password = "admin",
                    Created = new DateTime(2020, 01, 01, 1, 0, 0)
                }
            });
        }
    }
}
