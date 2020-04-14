using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Std.WebClient.Data.Domain;

namespace Std.WebClient.Data.Configuration
{
    public class TaskEntityConfiguration: IEntityTypeConfiguration<TaskEntity>
    {
        public void Configure(EntityTypeBuilder<TaskEntity> builder)
        {
            builder.ToTable("Tasks");
            builder.HasKey(e => e.Id);
        }
    }
}
