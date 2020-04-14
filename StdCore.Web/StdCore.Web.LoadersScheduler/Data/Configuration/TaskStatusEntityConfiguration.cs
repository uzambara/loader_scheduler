using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Std.WebClient.Data.Domain;
using Std.WebClient.Data.Enum;

namespace Std.WebClient.Data.Configuration
{
    public class TaskStatusEntityConfiguration: IEntityTypeConfiguration<TaskWorkStatusEntity>
    {
        public void Configure(EntityTypeBuilder<TaskWorkStatusEntity> builder)
        {
            builder.ToTable("TaskStatuses");
            builder.HasKey(e => e.Id);

            builder.HasData(new List<TaskWorkStatusEntity>()
            {
                new TaskWorkStatusEntity() {Id = (int) TaskWorkStatus.New, Name = "Новый"},
                new TaskWorkStatusEntity() {Id = (int) TaskWorkStatus.InProcess, Name = "В работе"},
                new TaskWorkStatusEntity() {Id = (int) TaskWorkStatus.Completed, Name = "Выполнен"},
            });
        }
    }
}