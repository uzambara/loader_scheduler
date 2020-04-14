using AutoMapper;
using Std.Common.Enum;
using Std.WebClient.Data.Domain;

namespace Std.WebClient.Models
{
    public class TaskModelMapper: Profile
    {
        public TaskModelMapper()
        {
            CreateMap<TaskEntity, TaskModel>()
                .ForMember(
                    dest => dest.StatusName,
                    src =>
                        src.MapFrom(e => e.Status.GetDescription()))
                .ForMember(
                    dest => dest.DirectionName,
                    src =>
                        src.MapFrom(e => e.Direction.GetDescription()));
        }
    }
}
