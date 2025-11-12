<template>
  <main class="min-h-screen bg-surface text-foreground p-4 sm:p-8">
    <section class="max-w-3xl mx-auto space-y-6">
      <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-brand">TaskNote 📝</h1>
          <p class="text-sm text-muted-foreground">
            總共有 {{ taskStore.total }} 筆任務，完成 {{ taskStore.doneCount }} 筆
          </p>
        </div>
        <button
          class="bg-brand text-white text-sm px-4 py-2 rounded-md shadow hover:bg-indigo-600 active:scale-[0.98] transition"
          @click="addTask"
        >
          ➕ 新增任務
        </button>
      </header>

      <TaskList />
    </section>
  </main>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore'
import TaskList from '@/components/tasks/TaskList.vue'

const taskStore = useTaskStore()

const addTask = () => {
  taskStore.addTask({
    title: `任務 ${taskStore.total + 1}`,
    description: '這是測試任務',
    tags: ['week3'],
  })
}
</script>
