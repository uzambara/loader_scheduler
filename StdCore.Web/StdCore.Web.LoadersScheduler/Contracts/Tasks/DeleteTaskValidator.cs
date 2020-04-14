using FluentValidation;

namespace Std.WebClient.Contracts.Tasks
{
    public class DeleteTaskValidator: AbstractValidator<DeleteTaskRequest>
    {
        public DeleteTaskValidator()
        {
            RuleFor(req => req.TaskId).NotEmpty();
        }
    }
}
