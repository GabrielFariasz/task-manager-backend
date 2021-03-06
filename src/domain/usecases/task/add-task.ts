import { Task, TaskPriority } from '../../models/task/task'

export interface AddTaskModel {
  name: string
  category: string
  limitDate: Date
  priority: TaskPriority
  owner: string
}

export interface AddTask {
  add: (body: AddTaskModel) => Promise<Task>
}
