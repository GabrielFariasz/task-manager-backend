import { AddTaskRepository } from '../../../data/protocols/db/add-task-repository'
import { Task, TaskPriority } from '../../../domain/models/task/task'
import { AddTaskModel } from '../../../domain/usecases/task/add-task'
import { Controller } from '../../protocols/controller'
import { AddTaskController } from './add-task-controller'

interface SutType {
  sut: Controller
  addTaskRepositoryStub: AddTaskRepository
}

const makeFakeTask = (): Task => ({
  id: 'fake_id',
  name: 'fake_name',
  category: 'fake_category',
  creationDate: new Date('2022-01-01'),
  limitDate: new Date('2023-01-01'),
  priority: TaskPriority.medium,
  owner: 'fake_owner',
  status: 'done'
})

const makeAddTaskRepositoryStub = (): AddTaskRepository => {
  class AddTaskReopositoryStub implements AddTaskRepository {
    async add(body: AddTaskModel): Promise<Task> {
      return new Promise(resolve => resolve(makeFakeTask()))
    }
  }

  return new AddTaskReopositoryStub()
}

const makeSut = (): SutType => {
  const addTaskRepositoryStub = makeAddTaskRepositoryStub()
  const sut = new AddTaskController(addTaskRepositoryStub)
  return {
    sut,
    addTaskRepositoryStub
  }
}

describe('AddTask Controller', () => {
  test('Should return 400 if task name not provided', async () => {
    const { sut } = makeSut()

    const data = {
      body: {
        category: 'School',
        creationDate: new Date(),
        limitDate: new Date('01-01-2001'),
        owner: 'myself',
        priority: TaskPriority.high
      }
    }

    const response = await sut.handle(data)

    expect(response.statusCode).toBe(400)
  })

  test('Should return 400 if task owner not provided', async () => {
    const { sut } = makeSut()

    const data = {
      body: {
        name: 'anyone',
        category: 'School',
        creationDate: new Date(),
        limitDate: new Date('01-01-2001'),
        priority: TaskPriority.high,
        visibility: 'public'
      }
    }

    const response = await sut.handle(data)

    expect(response.statusCode).toBe(400)
  })

  test('Should return 400 if task limitDate not provided', async () => {
    const { sut } = makeSut()

    const data = {
      body: {
        name: 'anyone',
        category: 'School',
        creationDate: new Date(),
        owner: 'myself',
        priority: TaskPriority.high,
        visibility: 'public'
      }
    }

    const response = await sut.handle(data)

    expect(response.statusCode).toBe(400)
  })

  test('Should return 400 if task visibility not provided', async () => {
    const { sut } = makeSut()

    const data = {
      body: {
        name: 'anyone',
        category: 'School',
        creationDate: new Date(),
        owner: 'myself',
        priority: TaskPriority.high,
        visibility: 'public'
      }
    }

    const response = await sut.handle(data)

    expect(response.statusCode).toBe(400)
  })
})
