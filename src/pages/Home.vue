<template>
  <section class="mx-auto max-w-3xl py-10 space-y-6">
    <header class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold">TaskNote 📝</h1>
        <p class="text-slate-500 text-sm">總共有 {{ taskStore.total }} 筆，完成 {{ taskStore.doneCount }} 筆</p>
      </div>
      <button
        class="px-4 py-2 rounded bg-brand text-white text-sm"
        @click="addDummy"
      >
        新增測試任務
      </button>
    </header>

    <ul class="space-y-3">
      <li
        v-for="task in taskStore.tasks"
        :key="task.id"
        class="flex items-center justify-between rounded border border-slate-200 px-4 py-3"
      >
        <div>
          <h2 class="font-medium">{{ task.title }}</h2>
          <p v-if="task.description" class="text-xs text-slate-500 mt-1">
            {{ task.description }}
          </p>
          <p class="text-[10px] text-slate-400 mt-1">status: {{ task.status }}</p>
        </div>
        <div class="flex gap-2">
          <button
            class="text-xs px-3 py-1 rounded bg-slate-500"
            @click="taskStore.updateTaskStatus(task.id, task.status === 'done' ? 'todo' : 'done')"
          >
            {{ task.status === 'done' ? '還原' : '完成' }}
          </button>
          <button
            class="text-xs px-3 py-1 rounded bg-red-100 text-red-600"
            @click="taskStore.removeTask(task.id)"
          >
            刪除
          </button>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()

const addDummy = () => {
  taskStore.addTask({
    title: `測試任務 ${taskStore.total + 1}`,
    description: '這是 Week 2 測試用的任務',
    tags: ['demo'],
  })
}
</script>
