<template>
  <main class="min-h-screen bg-surface text-foreground p-4 sm:p-8">
    <section class="max-w-3xl mx-auto space-y-5">
      <header class="space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-3xl font-bold text-brand">TaskNote 📝</h1>
            <p class="text-sm text-muted-foreground">
              共 {{ taskStore.total }} 筆，完成 {{ taskStore.doneCount }} 筆
            </p>
          </div>
          <div class="flex items-center gap-2">
            <button class="btn" @click="ui.clearFilters()">清除篩選</button>
            <button class="btn btn--primary" @click="ui.openForCreate()">➕ 新增任務</button>
          </div>
        </div>

        <SearchBar />
        <TagFilter />
      </header>

      <TaskList
        :tasks="filteredTasks"
        @toggle-status="toggleStatus"
        @remove="removeTask"
        @edit="editTask"
      />
    </section>

    <TaskForm v-if="ui.taskModalOpen" />
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import { useUiStore } from '@/stores/uiStore'
import TaskList from '@/components/tasks/TaskList.vue'
import TaskForm from '@/components/tasks/TaskForm.vue'
import SearchBar from '@/components/SearchBar.vue'
import TagFilter from '@/components/TagFilter.vue'

const taskStore = useTaskStore()
const ui = useUiStore()

const filteredTasks = computed(() => {
  const q = ui.searchText.trim().toLowerCase()
  const selected = ui.selectedTags

  return taskStore.tasks.filter((t) => {
    // 文字搜尋：標題、描述、標籤 含任一關鍵字
    const hay = [
      t.title?.toLowerCase() ?? '',
      t.description?.toLowerCase() ?? '',
      ...(t.tags ?? []).map((x) => x.toLowerCase()),
    ].join(' ')
    const textOk = q === '' || hay.includes(q)

    // 標籤篩選
    const tagsOk =
      selected.length === 0 ||
      (t.tags && selected.every((tag) => t.tags!.includes(tag)))

    return textOk && tagsOk
  })
})

function toggleStatus(id: string) {
  const t = taskStore.tasks.find((x) => x.id === id)
  if (!t) return
  const next = t.status === 'todo' ? 'doing' : t.status === 'doing' ? 'done' : 'todo'
  taskStore.updateTaskStatus(id, next)
}
function removeTask(id: string) { taskStore.removeTask(id) }
function editTask(id: string) { ui.openForEdit(id) }
</script>
