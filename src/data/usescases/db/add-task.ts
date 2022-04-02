import { Task } from '../../../domain/models/task/task'
import { AddTask, AddTaskModel } from '../../../domain/usecases/task/add-task'
import { AddTaskRepository } from '../../protocols/db/add-task-repository'

export class DbAddTask implements AddTask {
  private readonly addAccountRepository: AddTaskRepository
  constructor (addAccountRepository: AddTaskRepository) {
    this.addAccountRepository = addAccountRepository
  }

  async add (body: AddTaskModel): Promise<Task> {
    const newTask = await this.addAccountRepository.add(body)
    return newTask
  }
}
