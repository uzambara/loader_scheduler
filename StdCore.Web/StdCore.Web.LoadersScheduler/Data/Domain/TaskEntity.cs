using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Std.Common.DateTime;
using Std.WebClient.Data.Enum;

namespace Std.WebClient.Data.Domain
{
    public class TaskEntity: IEntityBase
    {
        public int Id { get; set; }
        public DateTime Created { get; set; }
        public DateTime? Deleted { get; set; }
        public string Comment { get; set; }
        public int? LoaderId { get; set; }
        public LoaderEntity Loader { get; set; }
        public int CreateUserId { get; set; }
        public UserEntity CreateUser { get; set; }
        public int? DeleteUserId { get; set; }
        public UserEntity DeleteUser { get; set; }
        public TaskWorkStatus Status { get; set; }
        public TaskType Type { get; set; }
        public TaskDirection Direction { get; set; }
        public DateTime PlanStart { get; set; }
        public DateTime PlanEnd { get; set; }
        public DateTime? FactStart { get; set; }
        public DateTime? FactEnd { get; set; }
    }
}
