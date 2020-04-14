using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Std.WebClient.Data.Domain;
using Std.WebClient.Data.Enum;

namespace Std.WebClient.Data.Configuration
{
    public class TaskTypeConfiguration: IEntityTypeConfiguration<TaskTypeEntity>
    {
        public void Configure(EntityTypeBuilder<TaskTypeEntity> builder)
        {
            builder.ToTable("TaskTypes");
            builder.HasKey(e => e.Id);
            builder.HasData(new List<TaskTypeEntity>()
            {
                new TaskTypeEntity(){ Id = (int)TaskType.Plan, Name = "Плановое" },
                new TaskTypeEntity(){ Id = (int)TaskType.Unexpected, Name = "ФМ" },
                new TaskTypeEntity(){ Id = (int)TaskType.Break, Name = "Перерыв" }
            });
        }
    }
}
