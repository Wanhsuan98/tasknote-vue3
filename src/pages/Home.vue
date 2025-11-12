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
        <button class="btn btn--primary" @click="ui.openForCreate()">➕ 新增任務</button>
      </header>

      <TaskList />
    </section>

    <!-- Modal -->
    <TaskForm v-if="ui.taskModalOpen" />
  </main>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore'
import { useUiStore } from '@/stores/uiStore'
import TaskList from '@/components/tasks/TaskList.vue'
import TaskForm from '@/components/tasks/TaskForm.vue'

const taskStore = useTaskStore()
const ui = useUiStore()
</script>
