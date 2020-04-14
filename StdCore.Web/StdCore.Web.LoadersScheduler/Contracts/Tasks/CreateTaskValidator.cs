using FluentValidation;
using Std.WebClient.Data.Enum;

namespace Std.WebClient.Contracts.Tasks
{
    public class CreateTaskValidator: AbstractValidator<CreateTaskRequest>
    {
        public CreateTaskValidator()
        {
            RuleFor(req => req.Type)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .NotNull()
                .NotEmpty();
            When(req => req.Direction != TaskDirection.Baki && req.Direction != TaskDirection.Logistic && req.Type != TaskType.Unexpected, () =>
            {
                RuleFor(req => req.PlanStartUtc)
                    .Cascade(CascadeMode.StopOnFirstFailure)
                    .NotNull()
                    .NotEmpty();
                RuleFor(req => req.PlanEndUtc)
                    .Cascade(CascadeMode.StopOnFirstFailure)
                    .NotNull()
                    .NotEmpty();
                RuleFor(req => req.PlanStartUtc)
                    .Must((request, start) => start < request.PlanEndUtc)
                    .WithMessage("Время начала больше, чем время окончания");
            });

            When(req => req.Type != TaskType.Unexpected
                        || req.Direction == TaskDirection.Baki
                        || req.Direction == TaskDirection.Logistic, () =>
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
        }
    }
}
