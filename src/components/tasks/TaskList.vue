<template>
    <ul class="space-y-3">
      <TransitionGroup name="list" tag="ul">
        <TaskItem
          v-for="task in taskStore.tasks"
          :key="task.id"
          :task="task"
          @toggle-status="toggleStatus"
          @remove="removeTask"
          @edit="editTask"
        />
      </TransitionGroup>
  
      <p v-if="!taskStore.tasks.length" class="text-center text-slate-400 text-sm py-6">
        尚無任務，請新增 📝
      </p>
    </ul>
  </template>
  
  <script setup lang="ts">
  import { useTaskStore } from '@/stores/taskStore'
  import { useUiStore } from '@/stores/uiStore'
  import TaskItem from './TaskItem.vue'
  
  const taskStore = useTaskStore()
  const ui = useUiStore()
  
  const toggleStatus = (id: string) => {
    const t = taskStore.tasks.find((x) => x.id === id)
    if (!t) return
    const next = t.status === 'todo' ? 'doing' : t.status === 'doing' ? 'done' : 'todo'
    taskStore.updateTaskStatus(id, next)
  }
  const removeTask = (id: string) => taskStore.removeTask(id)
  const editTask = (id: string) => ui.openForEdit(id)
  </script>
  