import { AddTaskRepository } from '../../../data/protocols/db/add-task-repository'
import { Task } from '../../../domain/models/task/task'
import { AddTaskModel } from '../../../domain/usecases/task/add-task'
import { MongoDbHelper } from '../helper/mongodb-helper'
import { env } from '../../../main/configs/env'

export class MongoAddTaskRepository implements AddTaskRepository {
  async add(body: AddTaskModel): Promise<Task> {
    const mongoHelper = new MongoDbHelper(env.mongoUrl)
    const collection = await mongoHelper.getCollection('task')

    const data = {
      ...body,
      creationDate: new Date(),
      status: 'to do'
    }

    const result = await collection.insertOne(data)
    await mongoHelper.disconnect()
    return {
      id: result.insertedId.toString(),
      ...data
    }
  }
}
