import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    taskModalOpen: false as boolean,
    editingTaskId: null as string | null,
  }),
  actions: {
    openForCreate() {
      this.editingTaskId = null
      this.taskModalOpen = true
    },
    openForEdit(taskId: string) {
      this.editingTaskId = taskId
      this.taskModalOpen = true
    },
    closeModal() {
      this.taskModalOpen = false
      this.editingTaskId = null
    },
  },
})
