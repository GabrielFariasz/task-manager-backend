import { TaskPriority } from '../../../domain/models/task/task'
import { AddTaskController } from './add-task-controller'

describe('AddTask Controller', () => {
  test('Should return 400 if task name not provided', async () => {
    const sut = new AddTaskController()

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
    const sut = new AddTaskController()

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
    const sut = new AddTaskController()

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
    const sut = new AddTaskController()

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
