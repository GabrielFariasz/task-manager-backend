import { TaskPriority } from '../../../domain/models/task/task'
import { MongoAddTaskRepository } from './mongo-add-task-repository.'

const main = async (): Promise<void> => {
  const mongo = new MongoAddTaskRepository()
  await mongo.add({
    name: 'hello there!',
    category: 'hello there!',
    limitDate: new Date(),
    priority: TaskPriority.high,
    owner: 'hello there!'
  })
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main()
