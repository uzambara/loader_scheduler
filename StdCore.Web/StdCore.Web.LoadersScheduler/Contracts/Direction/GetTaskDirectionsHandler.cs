using System.Reflection.PortableExecutable;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Std.WebClient.Data.Domain;
using Std.WebClient.Data.Repositories;

namespace Std.WebClient.Contracts.Direction
{
    public class GetTaskDirectionsHandler: IRequestHandler<GetTaskDirectionsRequest, GetTaskDirectionsResponse>
    {
        private RepositoryBase<TaskDirectionEntity> _directionRepository;

        public GetTaskDirectionsHandler(RepositoryBase<TaskDirectionEntity> directionRepository)
        {
            _directionRepository = directionRepository;
        }

        public async Task<GetTaskDirectionsResponse> Handle(GetTaskDirectionsRequest request, CancellationToken cancellationToken)
        {
            var result = await _directionRepository.GetAll().ToListAsync(cancellationToken);

            return new GetTaskDirectionsResponse()
            {
                Directions = result
            };
        }
    }
}
