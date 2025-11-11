export interface Task {
    id: string
    title: string
    description?: string
    tags: string[]
    status: 'todo' | 'doing' | 'done'
    dueDate?: string
    createdAt: string
    updatedAt: string
  }
  