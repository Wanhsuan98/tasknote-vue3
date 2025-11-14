import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    // 任務表單
    taskModalOpen: false as boolean,
    editingTaskId: null as string | null,
    // 搜尋
    searchText: '' as string,
    // 標籤篩選
    selectedTags: [] as string[],
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
    setSearch(text: string) {
        this.searchText = text
    },
    toggleTag(tag: string) {
        const i = this.selectedTags.indexOf(tag)
        if (i === -1) this.selectedTags.push(tag)
        else this.selectedTags.splice(i, 1)
    },
    clearFilters() {
        this.searchText = ''
        this.selectedTags = []
      }
  },
})
