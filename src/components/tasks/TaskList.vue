<template>
    <TransitionGroup name="list" tag="ul" class="space-y-3">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle-status="$emit('toggle-status', $event)"
        @remove="$emit('remove', $event)"
        @edit="$emit('edit', $event)"
      />
    </TransitionGroup>
  
    <p v-if="!tasks.length" class="text-center text-slate-400 text-sm py-6">
      沒有符合條件的任務 🗂️
    </p>
  </template>
  
  <script setup lang="ts">
  import TaskItem from './TaskItem.vue'
  import type { Task } from '@/types/task'
  
  defineProps<{ tasks: Task[] }>()
  defineEmits<{
    (e: 'toggle-status', id: string): void
    (e: 'remove', id: string): void
    (e: 'edit', id: string): void
  }>()
  </script>
  
  <style scoped>
  .list-enter-active, .list-leave-active { transition: all 0.25s ease; }
  .list-enter-from { opacity: 0; transform: translateY(8px); }
  .list-leave-to   { opacity: 0; transform: translateY(-8px); }
  </style>
  