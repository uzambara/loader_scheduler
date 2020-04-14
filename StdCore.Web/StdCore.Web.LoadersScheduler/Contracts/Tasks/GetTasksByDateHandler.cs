using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Std.Common.DateTime;
using Std.WebClient.Data.Domain;
using Std.WebClient.Data.Repositories;
using Std.WebClient.Models;

namespace Std.WebClient.Contracts.Tasks
{
    public class GetTasksByDateHandler: IRequestHandler<GetTasksByDateRequest, GetTasksByDateResponse>
    {
        private RepositoryBase<TaskEntity> _tasksRepository;
        private readonly IMapper _mapper;

        public GetTasksByDateHandler(RepositoryBase<TaskEntity> tasksRepository, IMapper mapper)
        {
            _tasksRepository = tasksRepository;
            _mapper = mapper;
        }

        public async Task<GetTasksByDateResponse> Handle(GetTasksByDateRequest request, CancellationToken cancellationToken)
        {
            var q = _mapper.Map<UserModel>(new UserEntity()
            {
                Id = 1,
                Name = "name",
                LastName = "lastname"
            });
            var date = request.Date.UnixTimeStampToDateTime().Date;
            var tasks = await _tasksRepository
                .GetAll(t => (t.PlanStart.Date == date || t.FactStart.Value.Date == date) && t.Deleted == null)
                .Include(t => t.CreateUser)
                .ToListAsync(cancellationToken);
            return new GetTasksByDateResponse()
            {
                Tasks = _mapper.Map<IEnumerable<TaskModel>>(tasks),
                Status = ResponseStatus.Success
            };
        }
    }
}
