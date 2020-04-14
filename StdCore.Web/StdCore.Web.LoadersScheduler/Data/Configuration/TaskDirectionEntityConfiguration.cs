using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Std.WebClient.Data.Domain;
using Std.WebClient.Data.Enum;

namespace Std.WebClient.Data.Configuration
{
    public class TaskDirectionEntityConfiguration: IEntityTypeConfiguration<TaskDirectionEntity>
    {
        public void Configure(EntityTypeBuilder<TaskDirectionEntity> builder)
        {
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Name).IsRequired();
            builder.HasData(new List<TaskDirectionEntity>()
            {
                new TaskDirectionEntity()
                {
                    Id =  (int)TaskDirection.Pvh,
                    Name = "ПВХ"
                },
                new TaskDirectionEntity()
                {
                    Id =  (int)TaskDirection.Mebel,
                    Name = "Мебель"
                },
                new TaskDirectionEntity()
                {
                    Id =  (int)TaskDirection.Metal,
                    Name = "Металл"
                },
                new TaskDirectionEntity()
                {
                    Id =  (int)TaskDirection.Extruzia,
                    Name = "Экструзия"
                },
                new TaskDirectionEntity()
                {
                    Id =  (int)TaskDirection.Furnitura,
                    Name = "Фурнитура"
                },
                new TaskDirectionEntity()
                {
                    Id =  (int)TaskDirection.Baki,
                    Name = "Баки"
                },
                new TaskDirectionEntity()
                {
                    Id =  (int)TaskDirection.Logistic,
                    Name = "Логисты"
                },
            });
        }
    }
}
