import { Task, TaskPriority } from '../../../domain/models/task/task'
import { AddTaskModel } from '../../../domain/usecases/task/add-task'
import { AddTaskRepository } from '../../protocols/db/add-task-repository'
import { DbAddTask } from './add-task'

const makeFakeTask = (): Task => ({
  id: 'any_id',
  name: 'any_name',
  category: 'any_category',
  creationDate: new Date('2022-01-01'),
  limitDate: new Date('2023-01-01'),
  priority: TaskPriority.medium,
  owner: 'any_owner',
  status: 'any_status'
})

const makeAddTaskRepositoryStub = (): AddTaskRepository => {
  class AddTaskRepositoryStub implements AddTaskRepository {
    async add(body: AddTaskModel): Promise<Task> {
      return new Promise(resolve => resolve(makeFakeTask()))
    }
  }

  return new AddTaskRepositoryStub()
}

const makeSut = (): DbAddTask => {
  const addTaskRepositoryStub = makeAddTaskRepositoryStub()
  return new DbAddTask(addTaskRepositoryStub)
}

describe('Db Add Task', () => {
  test('Should throw if DbAddTask throws', async () => {
    const sut = makeSut()

    jest.spyOn(sut, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promiseResponse = sut.add(makeFakeTask())
    await expect(promiseResponse).rejects.toThrow()
  })

  test('Should call DbAddTask with correct values', async () => {
    const sut = makeSut()
    const DbAddTaskSpy = jest.spyOn(sut, 'add')

    await sut.add(makeFakeTask())
    expect(DbAddTaskSpy).toHaveBeenCalledWith(makeFakeTask())
  })
})
