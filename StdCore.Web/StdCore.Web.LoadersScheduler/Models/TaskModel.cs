using System;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Std.Common.DateTime;
using Std.WebClient.Data.Enum;

namespace Std.WebClient.Models
{
    public class TaskModel
    {
        public int Id { get; set; }
        [JsonIgnore]
        public TaskDirection Direction { get; set; }
        [JsonPropertyName("Direction")]
        public string DirectionName { get; set; }
        public int? LoaderId { get; set; }
        [JsonIgnore]
        public DateTime PlanStart { get; set; }
        [JsonIgnore]
        public DateTime PlanEnd { get; set; }
        [JsonIgnore]
        public DateTime? FactStart { get; set; }
        [JsonIgnore]
        public DateTime? FactEnd { get; set; }
        [JsonIgnore]
        public DateTime Created { get; set; }
        [JsonIgnore]
        public TaskStatus Status { get; set; }
        [JsonPropertyName("Status")]
        public string StatusName { get; set; }
        public TaskType Type { get; set; }
        [JsonPropertyName("Type")]
        public string TypeName { get; set; }
        public string Comment { get; set; }
        public int CreatedUserId { get; set; }
        public UserModel CreateUser { get; set; }
        public long PlanStartUtc
        {
            get => PlanStart.ToUnixTimeStamp();
            set => PlanStart = value.UnixTimeStampToDateTime();
        }
        public long PlanEndUtc
        {
            get => PlanEnd.ToUnixTimeStamp();
            set => PlanEnd = value.UnixTimeStampToDateTime();
        }
        public long? FactStartUtc
        {
            get => FactStart?.ToUnixTimeStamp();
            set => FactStart = value?.UnixTimeStampToDateTime();
        }
        public long? FactEndUtc
        {
            get => FactEnd?.ToUnixTimeStamp();
            set => FactEnd = value?.UnixTimeStampToDateTime();
        }
    }
}


