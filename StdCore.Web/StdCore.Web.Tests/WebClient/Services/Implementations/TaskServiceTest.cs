using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;
using Std.Common.DateTime;
using Std.WebClient.Data;
using Std.WebClient.Data.Domain;
using Std.WebClient.Data.Enum;
using Std.WebClient.Data.Repositories;
using Std.WebClient.Services.Implementations;
using Std.WebClient.Settings;

namespace Std.Tests.WebClient.Services.Implementations
{
    [TestFixture]
    public class TaskServiceTest
    {
        private TaskRepository _taskRepository;
        private SchedulerDbContext _context;

        [SetUp]
        public void Init()
        {
            TaskSettings.MinutesBetweenTasks = 5;
            var options = new DbContextOptionsBuilder<SchedulerDbContext>()
                .UseInMemoryDatabase("Scheduler")
                .Options;

            _context = new SchedulerDbContext(options);
            _context.RemoveRange(_context.Set<TaskEntity>());
            _context.SaveChanges();


            _taskRepository = new TaskRepository(_context);

            _taskRepository.Add(new TaskEntity()
            {
                Id = -1,
                Comment = "Comment",
                Created = DateTime.Now,
                Direction = TaskDirection.Pvh,
                LoaderId = 1,
                Type = TaskType.Plan,
                PlanStart = new DateTime(2020, 01, 01, 5, 0, 0),
                PlanEnd = new DateTime(2020, 01, 01, 6, 0, 0)
            });

            _taskRepository.Add(new TaskEntity()
            {
                Id = -2,
                Comment = "Comment",
                Created = DateTime.Now,
                Direction = TaskDirection.Pvh,
                LoaderId = 1,
                Type = TaskType.Plan,
                PlanStart = new DateTime(2020, 01, 01, 7, 0, 0),
                PlanEnd = new DateTime(2020, 01, 01, 8, 0, 0)
            });

            _taskRepository.Add(new TaskEntity()
            {
                Id = -3,
                Comment = "Comment",
                Created = DateTime.Now,
                Direction = TaskDirection.Pvh,
                LoaderId = 1,
                Type = TaskType.Plan,
                PlanStart = new DateTime(2020, 01, 01, 9, 0, 0),
                PlanEnd = new DateTime(2020, 01, 01, 10, 0, 0)
            });

            _taskRepository.Add(new TaskEntity()
            {
                Id = -4,
                Comment = "Comment",
                Created = DateTime.Now,
                Direction = TaskDirection.Pvh,
                LoaderId = 1,
                Type = TaskType.Plan,
                PlanStart = new DateTime(2020, 01, 01, 11, 0, 0),
                PlanEnd = new DateTime(2020, 01, 01, 12, 0, 0)
            });

            _taskRepository.Add(new TaskEntity()
            {
                Id = -5,
                Comment = "Comment",
                Created = DateTime.Now,
                Direction = TaskDirection.Pvh,
                LoaderId = 1,
                Type = TaskType.Plan,
                PlanStart = new DateTime(2020, 01, 01, 16, 0, 0),
                PlanEnd = new DateTime(2020, 01, 01, 17, 0, 0)
            });

            _taskRepository.SaveChanges();
        }

        [Test]
        public async Task IfIntersectWithOneTask_UpdateTask_MoveForwardInsertedTask()
        {

            // [5-6, 7-8, 9-10, 11-12, 16-17]
            // Arrange
            var newTask = new TaskEntity()
            {
                Id = 1,
                Comment = "Comment",
                Created = DateTime.Now,
                Direction = TaskDirection.Pvh,
                LoaderId = 1,
                Type = TaskType.Plan,
                PlanStart = new DateTime(2020, 01, 01, 5, 0, 0),
                PlanEnd = new DateTime(2020, 01, 01, 5, 30, 0)
            };

            // Act
            var taskService = new TaskService(_taskRepository);
            await taskService.InsertTaskIntoPlanTimeline(newTask, false);

            // Asserts
            var expectedPlanStart = new DateTime(2020, 01, 1, 6, 0 + TaskSettings.MinutesBetweenTasks, 0);
            var expectedPlanEnd = new DateTime(2020, 01, 1, 6, 30 + TaskSettings.MinutesBetweenTasks, 0);
            Assert.That(newTask.PlanStart.ToUnixTimeStamp(), Is.EqualTo(expectedPlanStart.ToUnixTimeStamp()));
            Assert.That(newTask.PlanEnd.ToUnixTimeStamp(), Is.EqualTo(expectedPlanEnd.ToUnixTimeStamp()));
        }

        [Test]
        public async Task IfIntersectWithTwoTasks_UpdateTask_MoveForwardInsertedTaskAndSecondIntersectedTask()
        {
            // [5-6, 7-8, 9-10, 11-12, 16-17]
            // Arrange
            var newTask = new TaskEntity()
            {
                Id = 1,
                Comment = "Comment",
                Created = DateTime.Now,
                Direction = TaskDirection.Pvh,
                LoaderId = 1,
                Type = TaskType.Plan,
                PlanStart = new DateTime(2020, 01, 01, 9, 00, 0),
                PlanEnd = new DateTime(2020, 01, 01, 10, 30, 0)
            };

            // Act
            var taskService = new TaskService(_taskRepository);
            await taskService.InsertTaskIntoPlanTimeline(newTask, false);

            // Asserts
            var expectedPlanStart = new DateTime(2020, 01, 1, 10, 0 + TaskSettings.MinutesBetweenTasks, 0);
            var expectedPlanEnd = new DateTime(2020, 01, 1, 11, 30 + TaskSettings.MinutesBetweenTasks, 0);
            Assert.That(newTask.PlanStart.ToUnixTimeStamp(), Is.EqualTo(expectedPlanStart.ToUnixTimeStamp()));
            Assert.That(newTask.PlanEnd.ToUnixTimeStamp(), Is.EqualTo(expectedPlanEnd.ToUnixTimeStamp()));

            var secondIntersectedTask = await _taskRepository.GetOne(t => t.Id == -4);
            var duration = secondIntersectedTask.PlanDuration();
            expectedPlanStart = newTask.PlanEnd.AddMinutes(TaskSettings.MinutesBetweenTasks);
            expectedPlanEnd = expectedPlanStart.Add(duration);
            Assert.That(secondIntersectedTask.PlanStart, Is.EqualTo(expectedPlanStart));
            Assert.That(secondIntersectedTask.PlanEnd, Is.EqualTo(expectedPlanEnd));
        }
    }
}
