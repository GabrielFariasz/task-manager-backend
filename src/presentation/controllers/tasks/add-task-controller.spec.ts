import { AddTaskController } from './add-task-controller'

enum Priority {
  high = '1',
  medium = '2',
  low = '3'
}

describe('AddTask Controller', () => {
  test('Should return 400 if task name not provided', async () => {
    const sut = new AddTaskController()

    const data = {
      body: {
        category: 'School',
        createdDate: new Date(),
        limitDate: new Date('01-01-2001'),
        owner: 'myself',
        priority: Priority.high
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
        createdDate: new Date(),
        limitDate: new Date('01-01-2001'),
        priority: Priority.high
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
        createdDate: new Date(),
        owner: 'myself',
        priority: Priority.high
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
        createdDate: new Date(),
        owner: 'myself',
        priority: Priority.high,
        visibility: 'public'
      }
    }

    const response = await sut.handle(data)

    expect(response.statusCode).toBe(400)
  })
})
