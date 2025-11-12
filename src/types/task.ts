export type TaskStatus = 'todo' | 'doing' | 'done'
export interface Task {
    id: string
    title: string
    description?: string
    tags: string[]
    status: TaskStatus
    dueDate?: string
    createdAt: string
    updatedAt: string
  }
  