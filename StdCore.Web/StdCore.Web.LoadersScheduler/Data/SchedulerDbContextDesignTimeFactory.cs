using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Std.WebClient.Data
{
    public class SchedulerDbContextDesignTimeFactory: IDesignTimeDbContextFactory<SchedulerDbContext>
    {
        public SchedulerDbContext CreateDbContext(string[] args)
        {
            var configuration = Program.Configuration;
            string connectionString = configuration.GetConnectionString("scheduler");

            var builder = new DbContextOptionsBuilder<SchedulerDbContext>();
            builder.UseSqlServer(connectionString, optionsBuilder => optionsBuilder.UseRelationalNulls(true));
            return new SchedulerDbContext(builder.Options);
        }
    }
}
