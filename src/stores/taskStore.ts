import { defineStore } from 'pinia'
import type { Task, TaskStatus } from '@/types/task'

const STORAGE_KEY = 'tasknote.tasks'

function loadFromStorage(): Task[] {
  if (typeof window === 'undefined') return []
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as Task[]
  } catch (err) {
    console.warn('failed to parse tasks from localStorage', err)
    return []
  }
}

function saveToStorage(tasks: Task[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: loadFromStorage(),
  }),
  getters: {
    total: (state) => state.tasks.length,
    doneCount: (state) => state.tasks.filter((t) => t.status === 'done').length,
  },
  actions: {
    addTask(payload: { title: string; description?: string; tags?: string[]; dueDate?: string }) {
      const now = new Date().toISOString()
      const task: Task = {
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2),
        title: payload.title,
        description: payload.description ?? '',
        tags: payload.tags ?? [],
        status: 'todo',
        dueDate: payload.dueDate,
        createdAt: now,
        updatedAt: now,
      }
      this.tasks.push(task)
      saveToStorage(this.tasks)
    },
    updateTask(id: string, changes: Partial<Omit<Task, 'id' | 'createdAt'>>) {
      const idx = this.tasks.findIndex((t) => t.id === id)
      if (idx === -1) return
      const updatedTask: Task = {
        ...this.tasks[idx],
        ...changes,
        updatedAt: new Date().toISOString(),
      } as Task
      this.tasks[idx] = updatedTask
      saveToStorage(this.tasks)
    },
    updateTaskStatus(id: string, status: TaskStatus) {
      this.updateTask(id, { status })
    },
    removeTask(id: string) {
      this.tasks = this.tasks.filter((t) => t.id !== id)
      saveToStorage(this.tasks)
    },
    clearDone() {
      this.tasks = this.tasks.filter((t) => t.status !== 'done')
      saveToStorage(this.tasks)
    },
  },
})
