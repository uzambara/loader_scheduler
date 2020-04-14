using FluentValidation;
using Std.WebClient.Data.Enum;

namespace Std.WebClient.Contracts.Tasks
{
    public class UpdateTaskValidator: AbstractValidator<UpdateTaskRequest>
    {
        public UpdateTaskValidator()
        {
            RuleFor(req => req.PlanStartUtc)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .NotNull()
                .NotEmpty();
            RuleFor(req => req.PlanEndUtc)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .NotNull()
                .NotEmpty();
            When(req => req.TaskType != TaskType.Unexpected, () =>
            {
                RuleFor(req => req.LoaderId)
                    .Cascade(CascadeMode.StopOnFirstFailure)
                    .NotNull()
                    .NotEmpty();
            });
            RuleFor(req => req.Direction)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .NotNull()
                .NotEmpty();
            RuleFor(req => req.PlanStartUtc)
                .Must((request, start) => start < request.PlanEndUtc)
                .WithMessage("Время начала больше, чем время окончания");
        }
    }
}
