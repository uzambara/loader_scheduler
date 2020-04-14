using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Std.WebClient.Data.Domain;

namespace Std.WebClient.Data.Configuration
{
    public class LoaderEntityConfiguration: IEntityTypeConfiguration<LoaderEntity>
    {
        public void Configure(EntityTypeBuilder<LoaderEntity> builder)
        {
            builder.ToTable("Loaders");
            builder.HasKey(e => e.Id);
            builder.HasData(new List<LoaderEntity>()
            {
                new LoaderEntity()
                {
                    Id = 1,
                    Name = "Погрузчик 1"
                },
                new LoaderEntity()
                {
                    Id = 2,
                    Name = "Погрузчик 2"
                }
            });
        }
    }
}
