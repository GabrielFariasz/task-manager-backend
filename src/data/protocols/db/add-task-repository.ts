import { Task } from '../../../domain/models/task/task'
import { AddTaskModel } from '../../../domain/usecases/task/add-task'

export interface AddTaskRepository {
  add: (body: AddTaskModel) => Promise<Task>
}
