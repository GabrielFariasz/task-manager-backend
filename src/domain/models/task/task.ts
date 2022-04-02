export enum TaskPriority{
  high = '1',
  medium = '2',
  low = '3'
}

export interface Task {
  id: string
  name: string
  category: string
  creationDate: Date
  limitDate: Date
  priority: TaskPriority
  owner: string
  status: string
}
