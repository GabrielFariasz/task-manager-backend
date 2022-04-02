import { Task, TaskPriority } from '../../../domain/models/task/task'
import { AddTaskModel } from '../../../domain/usecases/task/add-task'
import { AddTaskRepository } from '../../protocols/db/add-task-repository'
import { DbAddTask } from './add-task'

const makeFakeTask = (): Task => ({
  id: 'any_id',
  name: 'any_name',
  category: 'any_category',
  creationDate: new Date(),
  limitDate: new Date('2023-01-01'),
  priority: TaskPriority.medium,
  owner: 'any_owner',
  status: 'any_status'
})

describe('Db Add Task', () => {
  test('Should throw if AddTaskRepository throws', async () => {
    class AddTaskRepositoryStub implements AddTaskRepository {
      async add (body: AddTaskModel): Promise<Task> {
        return new Promise(resolve => resolve(makeFakeTask()))
      }
    }

    const addTaskRepositoryStub = new AddTaskRepositoryStub()
    jest.spyOn(addTaskRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const sut = new DbAddTask(addTaskRepositoryStub)
    const promiseResponse = sut.add(makeFakeTask())
    await expect(promiseResponse).rejects.toThrow()
  })

  test('Should call AddTaskRepository with correct values', async () => {
    class AddTaskRepositoryStub implements AddTaskRepository {
      async add (body: AddTaskModel): Promise<Task> {
        return new Promise(resolve => resolve(makeFakeTask()))
      }
    }

    const addTaskRepositoryStub = new AddTaskRepositoryStub()
    const sut = new DbAddTask(addTaskRepositoryStub)
    const response = await sut.add(makeFakeTask())
    expect(response).toEqual(makeFakeTask())
  })
})
